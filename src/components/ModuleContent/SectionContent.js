import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";

import { SectionContentWrapper, StyledArrowIcon } from "./SectionContentStyle";

const SectionContent = ({ section }) => { // input is a section
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenModule = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <SectionContentWrapper>
      <div>
      {/* Module's name */}
        <h3 className="module-name" onClick={handleOpenModule}>
          {isOpened ? (
            <IoIosArrowUp className="arrowIcon" />
          ) : (
            <IoIosArrowDown className="arrowIcon" />
          )}
          {module.name}
        </h3>

{/* Module's length */}

      </div>

      {isOpened && (
        <div className="itemContainer">
          <ul>
            {section.lectures.map((item, index) => (
              <li key={index}>
                <div className="item">
                  <MdOndemandVideo className="videoIcon" />
                  {item}
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
