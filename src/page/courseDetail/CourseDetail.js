import TitleCard from "./TitleCard";
import PurchaseSection from "./PurchaseSection";
import CourseContent from "./CourseContent";
import { CourseDetailWrapper } from "./CourseDetailStyle";
import StudentAlsoBought from "./StudentsAlsoBought";
import ReviewCard from "./ReviewCard";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const CourseDetail = ({ courseId }) => {
  // React query for fetching course details
  const courseid = "660666f9b3f1e1cc048f2b57";

  const {
    isSuccess: isCourseSuccess,
    isError: isCourseError,
    data: courseData,
    error: courseError,
  } = useQuery({
    queryKey: "course",
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8080/courses/660666f9b3f1e1cc048f2b57"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData;
    },
  });

  // fetching course's sections
  const {
    isSuccess: isSectionsSuccess,
    isError: isSectionsError,
    data: sectionsData,
    error: sectionsError,
  } = useQuery({
    queryKey: "sections",
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:8080/sections/660666f9b3f1e1cc048f2b57"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData;
    },
  });

  // fetching related course

  if (isCourseSuccess && isSectionsSuccess) {
    return (
      <CourseDetailWrapper>
        <div style={{ position: "relative" }}>
          {/* Title Card */}
          <TitleCard course={courseData.metadata} />

          {/* Sticky Sidebar */}
          <PurchaseSection
            thumbnailImage={courseData.metadata.imageUrl}
            price={courseData.metadata.price}
          />
        </div>

        <div className="product-detail-body">
          <div className="product-detail-main-content">
            {/* Course content */}
            <CourseContent sections={sectionsData.metadata} />
            {/* <StudentAlsoBought courses={courses}></StudentAlsoBought> */}
            {/* Reviews */}
          </div>
        </div>
      </CourseDetailWrapper>
    );
  }
};

export default CourseDetail;
