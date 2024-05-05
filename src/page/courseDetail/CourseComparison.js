import { CourseComparisonWrapper } from "./CourseDetailStyle";
import { FaStar } from "react-icons/fa";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { useNavigate } from "react-router-dom";

const CourseComparison = ({ course }) => {
  return (
    <CourseComparisonWrapper>
      <div className="course-comparison-container">
        <div className="course-comparison-image-container">
          {/* image here */}
          <img
            src={course.imageUrl}
            alt=""
            className="course-comparison-image"
          />
        </div>
        <div className="course-comparison-main-content">
          <a href="" className="course-comparison-title">
            {course.name}
          </a>
        </div>
        <div className="course-comparison-content">
          <div className="ratings">
            <span className="rating-score-container">{course.ratings}</span>

            <FaStar
              style={{
                color: "RGB(180, 105, 14)",
              }}
            />
          </div>
          <span className="price">${changePriceFormat(course.price)}</span>
        </div>
        <a className="course-comparison-card-link"></a>
      </div>
    </CourseComparisonWrapper>
  );
};

export default CourseComparison;
