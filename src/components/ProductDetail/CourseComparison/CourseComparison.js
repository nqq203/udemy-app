import { CourseComparisonWrapper } from "./CourseComparisonStyle";
import { FaStar } from "react-icons/fa";

const CourseComparison = ({ course }) => {
  return (
    <CourseComparisonWrapper>
      <div className="course-comparison-container">
        <div className="course-comparison-image-container">
          {/* image here */}
          <img src="" alt="course image" />
        </div>
        <div className="course-comparison-main-content">
          <a href="" className="course-comparison-title">
            {course.name}
          </a>
          <div className="course-comparison-course-info">
            {/* total hours code here */}
            total hours
          </div>
        </div>
        <div className="course-comparison-content">
          <div className="ratings">
            {course.ratings} <FaStar style={
                {
                    color: "RGB(180, 105, 14)",
                    
                }
                
            }/>
          </div>
          <span className="price">{course.price}$</span>
        </div>
        <a href="" className="course-comparison-card-link"></a>
      </div>
    </CourseComparisonWrapper>
  );
};

export default CourseComparison;
