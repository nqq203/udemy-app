import Rating from "@mui/material/Rating";
import { TitleCardWrapper } from "./TitleCardStyle";

const TitleCard = ({ title, description, ratings, instructor }) => {
  return (
    <>
      <TitleCardWrapper>
        <div className="inner-container">
          <div className="inner-text-container">
            <div><h1>{title}</h1></div>
            <h4>{description}</h4>
            <div>
              <span>
                {ratings}{" "}
                <Rating size="small" defaultValue={0} value={ratings} readOnly />
              </span>
            </div>

            <p>Created by {instructor}</p>
          </div>
        </div>
      </TitleCardWrapper>
    </>
  );
};

export default TitleCard;
