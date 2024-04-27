import Rating from "@mui/material/Rating";
import { TitleCardWrapper } from "./CourseDetailStyle";

const TitleCard = ({ course, instructor }) => {
  return (
    <>
      <TitleCardWrapper>
        <div className="inner-container">
          <div className="inner-text-container">
            <div>
              <h1>{course.name}</h1>
            </div>
            <p className="course-description">{course.description}</p>
            <div>
              <span className="ratings">
                <span className="rating-score">{course.ratings}</span>
                <Rating
                  className="rating-icon"
                  size="small"
                  defaultValue={0}
                  value={course.ratings}
                  readOnly
                />
              </span>
            </div>

            <p>Created by {instructor.fullName}</p>
          </div>
        </div>
      </TitleCardWrapper>
    </>
  );
};

export default TitleCard;
