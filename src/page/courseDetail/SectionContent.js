import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import { SectionContentWrapper } from "./CourseDetailStyle";

import { useQuery } from "react-query";

const SectionContent = ({
  section,
  lectures,
  isAllOpened
}) => {
  // input is a section

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened((prev) => !prev);
  }, [isAllOpened]);

  const handleOpenSection = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  console.log(lectures)
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
      {isOpened && (
        <div className="itemContainer">
          <ul>
            {lectures.map((lecture, index) => (
              <li key={index}>
                <div className="item">
                  <MdOndemandVideo className="videoIcon" />
                  {lecture.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionContentWrapper>
  );
};

export default SectionContent;
