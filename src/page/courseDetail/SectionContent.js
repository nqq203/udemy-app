import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import {
  SectionContentWrapper,
} from "./CourseDetailStyle";

import { useQuery } from "react-query";

const SectionContent = ({ section }) => {
  // input is a section
  const [isOpened, setIsOpened] = useState(false);
  const { data: lecturesData, isSuccess: isLecturesSuccess } = useQuery({
    queryKey: ["lectures", section],
    queryFn: async () => {
      const sectionId = section._id.toString();
      console.log(sectionId);
      const response = await fetch(
        `http://localhost:8080/lectures/` + sectionId
      );
      const dataReceived = await response.json();
      return dataReceived;
    },
  });

  const handleOpenSection = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <SectionContentWrapper>
      <div>
        {/* Module's name */}
        <h3 className="section-name" onClick={handleOpenSection}>
          {isOpened ? (
            <IoIosArrowUp className="arrowIcon" />
          ) : (
            <IoIosArrowDown className="arrowIcon" />
          )}
          {section.name}
        </h3>

        {/* Module's length */}
      </div>
      {isOpened && isLecturesSuccess && (
        <div className="itemContainer">
          <ul>
            {lecturesData.metadata.map((lecture, index) => (
              <li key={index}>
                <div className="item">
                  <MdOndemandVideo className="videoIcon" />
                  {lecture.title}
                </div>
              </li>
            ))}
            {console.log(lecturesData.metadata)}
          </ul>
        </div>
      )}
    </SectionContentWrapper>
  );
};

export default SectionContent;
