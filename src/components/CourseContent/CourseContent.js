import ModuleContent from "../ModuleContent/ModuleContent";

const CourseContent = ({ courseContent }) => {
  return (
    <>
      {Object.entries(courseContent).map(([moduleName, listOfItems], index) => (
        <ModuleContent moduleName={moduleName} listOfItems={listOfItems} />
      ))}
    </>
  );
};

export default CourseContent;
