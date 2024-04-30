import React from "react";
import { useQuery } from "react-query";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { 
    PaymentSummaryContainer, 
    PaymentLoading,
    PaymentImage
} from "./paymentStyles";

import { changePriceFormat } from "../../utils/changePriceFormat";
import { callApiGetCartCourses } from "../../api/course";
import { CircularProgress } from "@mui/material";

const getCourseDetails = async (courses) => {
    const courseDetails = await callApiGetCartCourses(courses);
    return courseDetails;
}

export default function PaymentOrder({ cartCourses }) {
    const { data, isLoading } = useQuery('courseDetails', () => getCourseDetails(cartCourses));

    const courses = data;
    if(isLoading || courses === undefined){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const courseData = courses?.metadata;
    return (
        <>
          {courseData?.map((course, index) => {
              const formatPrice = changePriceFormat(course.price);
              return(
                  <PaymentSummaryContainer key={index}>
                      <Stack flexDirection='row' justifyContent="center" alignItems="center">
                          <PaymentImage src={course.imageUrl} alt="test"></PaymentImage>
                          <Typography variant="subtitle1" marginLeft={2} fontWeight={700}>
                              {course.name}
                          </Typography> 
                      </Stack>
                      <Typography variant="subtitle1">
                          {formatPrice}$
                      </Typography>
                  </PaymentSummaryContainer>
              );
          })}
        </>
    );
}