import TitleCard from "../../components/TitleCard/TitleCard";
import ContentListCard from "../../components/ContentListCard/ContentListCard";
import SideBarCard from "../../components/SideBarCard/SideBarCard";
import CourseContent from "../../components/CourseContent/CourseContent";
import { ProductDetailWrapper } from "./ProductDetailStyle";
import StudentAlsoBought from "../../components/StudentsAlsoBought/StudentsAlsoBought";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
const whatYoullLearn = [
  "Extensive, informative and interesting video lecture",
  "Lab Exercises",
  "All Powerpoint Demonstrations Used in Course",
  "All Powerpoint Demonstrations Used in Course",
  "All Powerpoint Demonstrations Used in Course",
];

const sections = [
  {
    name: "Introduction to the course",
    lectures: [
      {
        title: "Introduction to the course",
        duration: 60,
      },
      {
        title: "Introduction to the course",
        duration: 60,
      },
      {
        title: "Introduction to the course",
        duration: 10,
      },
      {
        title: "Introduction to the course",
        duration: 10,
      },
    ],
  },
  {
    name: "Introduction to the course 2",

    lectures: [
      {
        title: "Introduction to the course 2",
        duration: 10,
      },
      {
        title: "Introduction to the course 2",
        duration: 10,
      },
      {
        title: "Introduction to the course 2",
        duration: 10,
      },
    ],
  },
  {
    name: "Introduction to the course 3",
    lectures: [
      {
        title: "Introduction to the course 3",
        duration: 10,
      },
      {
        title: "Introduction to the course 3",
        duration: 10,
      },
      {
        title: "Introduction to the course 3",
        duration: 10,
      },
    ],
  },
];

const courses = [
  {
    name: "Course 1",
    description: "This is a course description",
    instructor: "Instructor 1",
    ratings: 4,
    price: 100
  },
  {
    name: "Course 2",
    description: "This is a course description 2",
    instructor: "Instructor 2",
    ratings: 5,
    price: 200
  }
]

const ProductDetail = () => {
  return (
    <ProductDetailWrapper>
      <div style={{ position: "relative" }}>
        {/* Title Card */}
        <TitleCard title="Example course" ratings={4} />

        {/* Sticky Sidebar */}
        <SideBarCard />
      </div>

      <div className="product-detail-body">
        <div className="product-detail-main-content">
          {/* What you'll learn */}
          <ContentListCard
            title={"What you'll learn"}
            listOfContent={whatYoullLearn}
          />

          {/* Course content */}
          <CourseContent sections={sections} />
          <StudentAlsoBought courses={courses}></StudentAlsoBought>
          <ReviewCard />
          <ReviewCard />
        </div>
      </div>
    </ProductDetailWrapper>
  );
};

export default ProductDetail;
