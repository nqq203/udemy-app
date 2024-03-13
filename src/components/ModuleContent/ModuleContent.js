import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";

import { ModuleContentWrapper, StyledArrowIcon } from "./ModuleContentStyle";

const ModuleContent = ({ moduleName, listOfItems }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenModule = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  return (
    <ModuleContentWrapper>
      <h1 className="moduleName" onClick={handleOpenModule}>
        {isOpened ? <IoIosArrowUp className="arrowIcon" /> : <IoIosArrowDown className="arrowIcon" />}
        {moduleName}
      </h1>
      {isOpened && (
        <div className="itemContainer">
        <ul>
          {listOfItems.map((item, index) => (
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
    </ModuleContentWrapper>
  );
};

export default ModuleContent;
