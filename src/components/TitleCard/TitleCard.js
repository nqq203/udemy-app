import Rating from "@mui/material/Rating";
import { TitleCardWrapper } from "./TitleCardStyle";

const TitleCard = ({ course }) => {
  return (
    <>
      <TitleCardWrapper>
        <div className="inner-container">
          <div className="inner-text-container">
            <div><h1>{course.name}</h1></div>
            <p className="course-description">{course.description}</p>
            <div>
              <span>
                {course.ratings}{" "}
                <Rating size="small" defaultValue={0} value={course.ratings} readOnly />
              </span>
            </div>

            <p>Created by {""}</p>
          </div>
        </div>
      </TitleCardWrapper>
    </>
  );
};

export default TitleCard;
