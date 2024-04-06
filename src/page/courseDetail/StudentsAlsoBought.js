import CourseComparison from "./CourseComparison";

const StudentAlsoBought = ({ courses }) => {
  return (
    <div>
      <h2>Students Also Bought</h2>
      <div>
        <CourseComparison course={courses[0]}></CourseComparison>
        <CourseComparison course={courses[0]}></CourseComparison>
        <CourseComparison course={courses[0]}></CourseComparison>
        <CourseComparison course={courses[0]}></CourseComparison>
        <CourseComparison course={courses[0]}></CourseComparison>
      </div>
    </div>
  );
};

export default StudentAlsoBought;
