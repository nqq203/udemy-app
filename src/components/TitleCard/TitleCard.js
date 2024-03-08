import Rating from "@mui/material/Rating";
import { TitleCardWrapper } from "./TitleCardStyle";

const TitleCard = ({
  courseName,
  description,
  ratings,
  author,
  language = "English",
}) => {
  return (
    <>
      <TitleCardWrapper className="">
        <div>
          <h1 className="py-1">{courseName}</h1>
          <h4 className="pb-1" style={
            {
              fontWeight: "normal",
            }
          }>{description} abc</h4>
          <div className="rating pb-1">
            <span
              style={{
                color: "rgb(246, 156, 8)",
              }}
            >
              {ratings} <Rating size="small" defaultValue={ratings} readOnly />
            </span>
          </div>

          <p>Created by {author}</p>
          <p>{language}</p>
        </div>
      </TitleCardWrapper>
    </>
  );
};

export default TitleCard;
