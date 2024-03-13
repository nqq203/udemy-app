import icon from "./icon.png";
import { ContentListCardWrapper } from "./ContentListCardStyle";
const ContentListCard = ({ title, listOfContent }) => {
  return (
    <ContentListCardWrapper>
      <h1>{title}</h1>
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
    </ContentListCardWrapper>
  );
};

export default ContentListCard;
