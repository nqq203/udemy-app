import React from "react";
import { useQuery } from "react-query";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { Button } from "../../components/Button/Button";
import { 
    PaymentLoading,
} from "./paymentStyles";

import { changePriceFormat } from "../../utils/changePriceFormat";
import { callApiGetCartCourses } from "../../api/course";
import { CircularProgress } from "@mui/material";

const getCourseDetails = async (courses) => {
    const courseDetails = await callApiGetCartCourses(courses);
    return courseDetails;
}

export default function PaymentPrice({ cartCourses }) {
    const { data, isLoading } = useQuery('courseDetails', () => getCourseDetails(cartCourses));

    const courses = data;
    if(isLoading){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const courseData = courses?.metadata;
    const totalPrice = changePriceFormat(courseData?.reduce((acc, course) => acc + course.price, 0));

    return (
        <>
          <Stack spacing={1}>
              <h2>Summary</h2>

              <Stack flexDirection='row' justifyContent='space-between'>
                  <span>Original Price:</span>
                  <span>{totalPrice}$</span>
              </Stack>
              <Stack flexDirection='row' justifyContent='space-between'>
                  <span>Discounts:</span>
                  <span>-0$</span>
              </Stack>
              <Divider />
              <Stack flexDirection='row' justifyContent='space-between' pb={2}>
                  <span><b>Total:</b></span>
                  <span><b>{totalPrice}$</b></span>
              </Stack>

              <Button 
                  width='100%' 
                  bgColor="var(--color-purple-300)" 
                  hoverBgColor="var(--color-purple-400)" 
                  fontWeight="700"
                  type="submit"
              >
                  Complete Checkout
              </Button>
          </Stack>
        </>
    );
}