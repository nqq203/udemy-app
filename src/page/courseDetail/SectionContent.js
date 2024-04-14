import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOndemandVideo } from "react-icons/md";
import {
  SectionContentWrapper,
} from "./CourseDetailStyle";

import { useQuery } from "react-query";

const SectionContent = ({ section, setDuration, setTotalLectures, isAllOpened }) => {
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

  useEffect(() => {
    if (isLecturesSuccess) {
      if (Array.isArray(lecturesData?.metadata)) {
        setDuration(lecturesData?.metadata);
        setTotalLectures(lecturesData?.metadata.length);
      } else {
        console.error('lecturesData.metadata is not an array:', lecturesData?.metadata);
      }
    }
  }, [lecturesData]);

  useEffect(() => {
    if (isLecturesSuccess) {
      setIsOpened(prev => !prev);
    }
  }, [isAllOpened]);

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
            {lecturesData?.metadata?.map((lecture, index) => (
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
