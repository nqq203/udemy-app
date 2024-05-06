import styled from "styled-components";
// import {Button} from "../../components/Button/Button";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoursePrice } from "../../../redux/coursesSlice";
import Notification from "../../../components/Notification/Notification";
import { callApiUpdateCourse } from "../../../api/course";
import { useMutation } from "react-query";

// const listPriceTier = ["USD", "VND", "EUR"];
// const listUSD = ["19.99", "22.99", "24.99", "27.99", "29.99", "34.99", "39.99"];
const listVND = ["9", "19", "29", "39", "49", "59", "69", "79", "89", "99", "109", "119", "129", "139", "149", "159", "169", "179"];
// const listEUR = ["19.99", "22.99", "24.99", "29.99", "34.99", "39.99", "44.99"];

export default function InstructorPricing({ isPublished, setIsPublished}) {
  const globalPrice = useSelector(state => state.courses.courseData.price);
  const globalCourseData = useSelector(state => state.courses.courseData);
  const courseType = useSelector(state => state.courseManagement.type);
  const dispatch = useDispatch();
  // const [currency, setCurrency] = useState(listPriceTier[0]);
  const [tier, setTier] = useState(listVND);
  const [price, setPrice] = useState(globalPrice);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });

  useEffect(() => {
    if (isPublished === true) {
      setNotification({
        message: 'Published course successfully',
        visible: true,
        bgColor: 'green'
      });
      setIsPublished(false);
    }
  }, [isPublished]);

  const updateCourseMutation = useMutation(
    (courseData) => callApiUpdateCourse(courseData),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  )

  useEffect(() => {
    if (courseType === 'create') 
      setPrice(null);
    if (globalPrice)
      setPrice("$" + globalPrice);
  }, [globalPrice, courseType]);

  async function onSavePrice() {
    const newPrice = Number(price?.split("$")[1]);
    dispatch(setCoursePrice(newPrice));
    console.log(newPrice);
    const newData = {
      ...globalCourseData,
      price: newPrice
    }
    updateCourseMutation.mutate(newData);
    setNotification({
      message: 'Price updated successfully',
      visible: true,
      bgColor: 'green'
    });
  }

  return (
    <InstructorPricingWrapper>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({message: '', visible: false, bgColor: 'green'})}/>
      <div className="pricing-page-header">
        <h3 style={{ fontSize: "25px" }}>Pricing</h3>
      </div>
      <div className="pricing-page-content">
        <CourseContent>
          <h3>Set a price for your course</h3>
          <p>Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free.</p>
        </CourseContent>
        <CourseContent style={{display: "flex", flexDirection:"row", gap: "100px"}}>
          <CourseContent>
            <h3>Currency</h3>
            {/* <select onChange={(e) => setCurrency(e.target.value)}>
              {listPriceTier?.map((item) => {
                return (
                  <option key={item}>{item}</option>
                );
              })}
            </select> */}
            <select>
              <option key="">USD</option>
            </select>
          </CourseContent>
          <CourseContent>
            <h3>Price Tier</h3>
            <select 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}>
              <option>Free</option>
              {tier?.map((item) => {
                return (
                  // <option key={item}> {currency === listPriceTier[0] ? '$' : (currency === listPriceTier[1] ? 'đ' : '€')}{item}</option>
                  <option key={item}>${item}</option>
                );
              })}
            </select>
          </CourseContent>
        </CourseContent>
        <Button style={{marginTop: "20px", backgroundColor: "var(--color-purple-300)", fontFamily: "var(--font-stack-text)", color: "var(--color-white)", width: "10%", fontWeight: "600"}}
          onClick={onSavePrice}>Save</Button>
      </div>
    </InstructorPricingWrapper>
  );
}

const InstructorPricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-stack-text);
  
  h3 {
    font-family: var(--font-stack-heading-serif);
    font-size: 20px;
    padding: 0;
    margin: 10px 0px;
  }

  .pricing-page-header {
    border-bottom: 1px solid var(--color-gray-200);
    padding: 30px 5vw; 
  }

  .pricing-page-content {
    padding: 15px 5vw; 
  }
`

const CourseContent = styled.div`
  margin-top: 10px;

  p {
    font-size: 16px;
    margin: 5px 0px;
  }

  input[type=text] {
    width: 100%;
    padding: 15px 20px;
    font-size: 15px;
  }

  select {
    width: 200px;
    min-width: 100%;
    padding: 15px 20px;
    -webkit-appearance: none;
    -moz-appearance: none; 
    appearance: none; 

    &:hover {
      background-color: var(--color-gray-150);
    }
  }

  select:focus {
    outline: none;
  }
`