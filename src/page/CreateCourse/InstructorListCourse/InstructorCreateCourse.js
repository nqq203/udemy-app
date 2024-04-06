import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import InstructorCourseLandingPage from "../InstructorCourseCreation/InstructorCourseLandingPage";
import InstructorCurriculum from "../InstructorCourseCreation/InstructorCurriculum";
import InstructorPricing from "../InstructorCourseCreation/IntructorPricing";

export default function InstructorCreateCourse() {
  const [activeItem, setActiveItem] = useState(1);
  const contentItems = [
    {
      id: 1,
      title: "Curriculum",

    }
  ];
  const publishItems = [
    {
      id: 2,
      title: "Course landing page",
    },
    {
      id: 3,
      title: "Pricing",
    }
  ];

  const getItemClassname = (id) => id === activeItem ? "is-active create-bar-item" : "create-bar-item";

  function onClickItem(id) {
    setActiveItem(id);
  }

  function renderActiveComponent() {
    switch (activeItem) {
      case 1:
        return <InstructorCurriculum />;
      case 2:
        return <InstructorCourseLandingPage />;
      // case 3:
      //   return <InstructorLevel />;
      case 3:
        return <InstructorPricing />;
      default:
        return <InstructorCourseLandingPage />;
    }
  }

  return (
    <InstructorCreateCourseWrapper>
      <CreateCourseOptionBar>
        <CreateContent>
          <h4>Create your content</h4>
          {contentItems.map((item) => {
            return <div key={item.id} className={getItemClassname(item.id)} onClick={() => onClickItem(item.id)}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </CreateContent>
        <PublishCourse>
          <h4>Publish your course</h4>
          {publishItems.map((item) => {
            return <div key={item.id} className={getItemClassname(item.id)} onClick={() => onClickItem(item.id)}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </PublishCourse>
        <CustomButton width={"100%"} bgColor={"var(--color-purple-300)"} fontWeight={"700"} hoverBgColor={"var(--color-purple-400)"}> Submit </CustomButton>

      </CreateCourseOptionBar>
      <CreateCourseMain>
        {renderActiveComponent()}
      </CreateCourseMain>
    </InstructorCreateCourseWrapper>
  );
}

const InstructorCreateCourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 8vw;
  font-family: var(--font-text-text);

  h4 {
    margin: 0;
    font-family: var(--font-stack-heading);
  }

  .create-bar-item {
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    border-left: 10px solid var(--color-white);
    margin: 10px 0;
    cursor: pointer;
  }

  h4 {
    font-family: var(--font-stack-heading);
    font-size: 20px;
  }

  margin-bottom: 13%;

  .is-active {
    border-left: 10px solid var(--color-purple-300);
  }
`

const CreateCourseOptionBar = styled.div`
  width: 210px;
  margin-top: 30px;
`

const CreateCourseMain = styled.div`
  width: calc(100% - 210px);
  box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
  margin-left: 20px;
`

const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
`

const PublishCourse = styled.div`
  margin-top: 30px;
`

const CustomButton = styled(Button)`
  margin-top: 10px;
`