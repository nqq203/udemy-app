import TitleCard from "./TitleCard";
import PurchaseSection from "./PurchaseSection";
import CourseContent from "./CourseContent";
import { CourseDetailWrapper } from "./CourseDetailStyle";
import StudentAlsoBought from "./StudentsAlsoBought";
import ReviewCard from "./ReviewCard";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { callApiGetReviews } from "../../api/review";
import ReviewSection from "./ReviewSection";
const CourseDetail = () => {
  // React query for fetching course details
  const { courseId } = useParams();
  const [courseLoading, setCourseLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const {
    isSuccess: isCourseSuccess,
    isError: isCourseError,
    data: courseData,
    error: courseError,
    isLoading: isCourseLoading,
  } = useQuery({
    queryKey: "courseDetail",
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/courses/${courseId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData;
    },
    onSuccess: (data) => {
      setCourseLoading(false);
    },
  });

  // React query for fetching reviews
  const {
    isSuccess: isReviewSuccess,
    isError: isReviewError,
    data: reviewData,
    error: reviewError,
  } = useQuery({
    queryKey: "reviews",
    queryFn: () => callApiGetReviews(courseId),
    onSuccess: (data) => {
      setReviewLoading(false);
    },
  });

  // fetching related course
  // const {
  //   isSuccess: isRelatedCoursesSuccess,
  //   isError: isRelatedCoursesError,
  //   data: relatedCoursesData,
  //   error: relatedCoursesError,
  // } = useQuery({
  //   queryKey: "relatedCourses",
  //   queryFn: async () => {
  //     const response = await fetch(
  //       `http://localhost:8080/courses/${courseId}/related`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const jsonData = await response.json();
  //     return jsonData;
  //   },
  // });

  if (isCourseError) {
    console.log("Error fetching course data" + courseError);
  }

  return (
    <CourseDetailWrapper>
      {/* Sticky Sidebar */}

      {courseLoading || reviewLoading ? (
        <div className="container">
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : (
        <div>
          <div className="purchase-position-container">
            <PurchaseSection
              thumbnailImage={courseData.metadata.course.imageUrl}
              price={courseData.metadata.course.price}
            />
          </div>

          <div style={{ position: "relative" }}>
            {/* Title Card */}
            <TitleCard
              course={courseData.metadata.course}
              instructor={courseData.metadata.instructor}
            />
          </div>
          <div className="product-detail-body">
            <div className="product-detail-main-content">
              {/* Course content */}
              <div className="course-content-container">
                <CourseContent
                  sections={courseData.metadata.sections}
                  lectures={courseData.metadata.lectures}
                />
              </div>

              {/* <StudentAlsoBought
            // courses={relatedCoursesData.metadata}
          ></StudentAlsoBought> */}
              {/* Reviews */}

              <ReviewSection reviewData={reviewData}></ReviewSection>
            </div>
          </div>
        </div>
      )}
    </CourseDetailWrapper>
  );
};
export default CourseDetail;
