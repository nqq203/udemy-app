import icon from "./icon.png";
import { ContentListCardWrapper } from "./ContentListCardStyle";
const ContentListCard = ({ title, listOfContent }) => {
  return (
    <ContentListCardWrapper>
      <h2>{title}</h2>
      <div className="course-content-list">
      <ul>
        {listOfContent.map((content, index) => {
          return (
            <li key={index}>
              <div><img src={icon}></img></div>
              <div>{content}</div>
            </li>
          );
        })}
      </ul>
      </div>
      
    </ContentListCardWrapper>
  );
};

export default ContentListCard;
