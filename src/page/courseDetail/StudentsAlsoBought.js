import CourseComparison from "./CourseComparison";


const StudentAlsoBought = ({ courses }) => {
  return (
    <div>
      <h2>Students Also Bought</h2>
      <div>
        {courses.map((course, index) => (
          <CourseComparison key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentAlsoBought;
