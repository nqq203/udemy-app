import TitleCard from "./TitleCard";
import PurchaseSection from "./PurchaseSection";
import CourseContent from "./CourseContent";
import { CourseDetailWrapper } from "./CourseDetailStyle";
import StudentAlsoBought from "./StudentsAlsoBought";
import ReviewCard from "./ReviewCard";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";

const CourseDetail = () => {
  // React query for fetching course details
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  console.log(courseId);
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
      setLoading(false);
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
      {loading ? (
        <div className="container">
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : (
        <div>
          <div style={{ position: "relative" }}>
            {/* Title Card */}
            <TitleCard course={courseData.metadata.course.name} />

            {/* Sticky Sidebar */}
            <PurchaseSection
              thumbnailImage={courseData.metadata.course.imageUrl}
              price={courseData.metadata.course.price}
            />
          </div>
          <div className="product-detail-body">
            <div className="product-detail-main-content">
              {/* Course content */}
              <div className="course-content-container">
                <CourseContent sections={courseData.metadata.sections} />
              </div>

              {/* <StudentAlsoBought
            // courses={relatedCoursesData.metadata}
          ></StudentAlsoBought> */}
              {/* Reviews */}
            </div>
          </div>
        </div>
      )}
    </CourseDetailWrapper>
  );
};
export default CourseDetail;
