import SectionContent from "../SectionContent/SectionContent";
import { CourseContentWrapper } from "./CourseContentStyle";
/*
  courseContent {
    sections: [Sections]
  }
*/
const CourseContent = ({ sections }) => {
  // input is an array of sections

  const calculateSectionLength = (sections) => {
    let total = sections.reduce(
      (acc, curValue) => {
        return (
          acc +
          curValue.lectures.reduce(
            (acc, curValue) => acc + curValue.duration,
            0
          )
        );
      },
      0
    );
    let hours = Math.floor(total / 60);
    let minutes = total % 60;
    console.log(total)
    return [hours, minutes];
  };

  const calculateNumberOfLectures = (sections) => {
    return sections.reduce(
      (acc, curValue) => acc + curValue.lectures.length,
      0
    );
  };

  let totalLectures = calculateNumberOfLectures(sections);
  let [hours, minutes] = calculateSectionLength(sections);
  console.log(hours, minutes);
  return (
    <CourseContentWrapper>
      <h2 className="course-content-subheader">Course content</h2>
      <div className="course-content-length">
        <span className="course-content-stats">
          {sections.length} sections • {totalLectures} lectures • {hours}h{" "}
          {minutes}m total length
        </span>
        <button className="expand-button">
          <span>Expand all sections</span>
        </button>
      </div>
      {sections.map((section, index) => (
        <SectionContent key={index} section={section} />
      ))}
    </CourseContentWrapper>
  );
};

export default CourseContent;
