import { Button } from "../../../components/Button/Button";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { generateUuid } from "../../../utils/Utils";
import Notification from "../../../components/Notification/Notification";
import { callApiCreateSection } from "../../../api/section";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { setSectionsData } from "../../../redux/sectionsSlice";

export default function FormNewSection({ sections, setSections, setIsOpenCreateNewSection }) {
  const dispatch = useDispatch();
  const globalCourse = useSelector(state => state.courses.courseData);
  const [sectionTitle, setSectionTitle] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'green'
  });

  const createSectionMutation = useMutation(
    (courseData) => callApiCreateSection(courseData),
    {
      onSuccess: (data) => {
        console.log(data);
        setSections([...sections, data?.metadata]);
        dispatch(setSectionsData([...sections, data?.metadata]));
      }
    }
  )

  const onSubmitAddSection = () => {
    if (sectionTitle === "" || sectionTitle === null) {
      setNotification({
        message: 'Please enter a title',
        visible: true,
        bgColor: 'red'
      })
      return;
    }
    if (sections !== null) {
      createSectionMutation.mutate({
        courseId: globalCourse._id,
        name: sectionTitle,
        _id: null
      });
    }
    setSectionTitle(null);
    setIsOpenCreateNewSection(false);
  }



  return (
    <FormNewSectionWrapper>
      <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({message: '', visible: false, bgColor: 'green'})}/>
      <FormNewSectionContent>
        <div className="new-section">
          New Section:
        </div>
        <div className="new-section-input">
          <input type="text" placeholder="Enter a title" onChange={(e) => setSectionTitle(e.target.value)} />
        </div>
      </FormNewSectionContent>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 30px", padding: "5px 10px", gap: "30px" }}>
        <Button 
          style={{ color: "var(--color-gray-500)", fontWeight: "700" }} 
          bgColor="var(--color-white)" 
          hoverBgColor="var(--color-white)"
          onClick={() => setIsOpenCreateNewSection(false)}>Cancel</Button>
        <Button 
          style={{ fontWeight: "700" }}
          onClick={onSubmitAddSection}>Add Section</Button>
      </div>
    </FormNewSectionWrapper>
  );
}

const FormNewSectionWrapper = styled.div`
  margin-top: 20px;
  border: 1px solid var(--color-gray-400);
  background-color: var(--color-gray-100);
`

const FormNewSectionContent = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  font-family: var(--font-stack-heading);
  gap: 20px;
  padding: 10px 1vw;
  align-items: center;

  .new-section {
    font-weight: bold;
    width: 100px;
  }

  .new-section-input {
    width: calc(100% - 100px);
  }

  input[type=text] {
    padding: 10px 15px;
    width: calc(100% - 100px);
    font-size: 15px;
  }

  input:focus {
    outline: none;
  }
`