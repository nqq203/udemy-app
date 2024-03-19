import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";

export default function InstructorCreateCourse() {
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: "Course landing page",
      isActive: false,
    },
    {
      id: 2,
      title: "Curriculum",
      isActive: false,
    }
  ]);
  const [publishItems, setPublishItems] = useState([
    {
      id: 1,
      title: "Level",
      isActive: false,
    },
    {
      id: 2,
      title: "Pricing",
      isActive: false,
    }
  ]);

  function onClickPublishItem() {
    setPublishItems(
      {
        ...publishItems,
        isActive: true,
      }
    )
    setContentItems(
      {
        id: 1,
        title: "Level",
        isActive: false,
      },
      {
        id: 2,
        title: "Pricing",
        isActive: false,
      }
    )
  }

  return (
    <InstructorCreateCourseWrapper>
      <CreateCourseOptionBar>
        <CreateContent>
          <h4>Create your content</h4>
          {contentItems.map((item) => {
            return <div key={item.id} className="create-bar-item" >
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </CreateContent>
        <PublishCourse>
          <h4>Publish your course</h4>
          {publishItems.map((item) => {
            return <div key={item.id} className="create-bar-item">
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </PublishCourse>
        <Button width={"100%"} bgColor={"var(--color-purple-300)"} fontWeight={"700"}> Submit </Button>

      </CreateCourseOptionBar>
      <CreateCourseMain>
        <h1>Create Course</h1>
      </CreateCourseMain>
    </InstructorCreateCourseWrapper>
  );
}

const InstructorCreateCourseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 15vw;
  h4 {
    margin: 0;
  }

  .create-bar-item {
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }

  h4 {
    font-size: 20px;
  }

  margin-bottom: 13%;
`

const CreateCourseOptionBar = styled.div`
  width: 20%;
  margin-top: 30px;
`

const CreateCourseMain = styled.div`
  width: 80%;
`

const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
`

const PublishCourse = styled.div`
  margin-top: 30px;
`