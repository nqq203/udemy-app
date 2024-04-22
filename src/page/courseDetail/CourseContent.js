import SectionContent from "./SectionContent";
import { CourseContentWrapper } from "./CourseDetailStyle";
import { calculateDuration } from "../../utils/calculateDuration";
import { useState, useEffect } from "react";
import Lecture from "../lecture/lecture";
/*
  courseContent {
    sections: [Sections]
  }
*/
const CourseContent = ({ sections, lectures }) => {
  console.log(lectures)
  const [duration, setDuration] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const flatLectures = lectures.flat();

    const totalDuration = flatLectures.reduce((total, lecture) => total + Number(lecture.duration), 0);
    const totalLecturesCount = flatLectures.length;

    setDuration(totalDuration);
    setTotalLectures(totalLecturesCount);
  }, [lectures]);
  // const flatLectures = lectures.flat();

  // const totalDuration = flatLectures.reduce((acc, lecture) => {
  //   return acc + lecture.duration;
  // })

  // const totalLecturesCount = flatLectures.length;
  
  const handleExpandAll = () => {
    setExpanded(prev => !prev);
  }
  
  

  const [hours, minutes] = calculateDuration(duration);
  return (
    <CourseContentWrapper>
      <h2 className="course-content-subheader">Course content</h2>
      <div className="course-content-length">
        <span className="course-content-stats">
          {sections.length} sections • {totalLectures} lectures • {hours}h{" "}
          {minutes}m total length
        </span>
        <button className="expand-button" onClick={handleExpandAll}>
          <span>Expand all sections</span>
        </button>
      </div>
      {sections.map((section, index) => {
        return (<SectionContent key={index} section={section} lectures={lectures[index]}  isAllOpened={expanded} />)
      })}
    </CourseContentWrapper>
  );
};

export default CourseContent;
