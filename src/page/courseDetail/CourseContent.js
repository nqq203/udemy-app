import SectionContent from "./SectionContent";
import { CourseContentWrapper } from "./CourseDetailStyle";
import { calculateDuration } from "../../utils/calculateDuration";
import { useState } from "react";
/*
  courseContent {
    sections: [Sections]
  }
*/
const CourseContent = ({ sections }) => {
  const [duration, setDuration] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const handleCalcDuration = (lectures) => {
    let totalDuration = 0;
    console.log(lectures);
    lectures.forEach(lecture => {
      totalDuration += lecture.duration;
    });
    setDuration(prev => prev + totalDuration);
  }

  const handleCalcLectures = (length) => {
    setTotalLectures(prev => prev + length);
  }

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
      {sections.map((section, index) => (
        <SectionContent key={index} section={section} setDuration={handleCalcDuration} setTotalLectures={handleCalcLectures} isAllOpened={expanded} />
      ))}
    </CourseContentWrapper>
  );
};

export default CourseContent;
