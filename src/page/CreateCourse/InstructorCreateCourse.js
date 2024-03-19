import { useState } from "react";
import styled from "styled-components";

export default function InstructorCreateCourse() {
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: "Level",
    },
    {
      id: 2,
      title: "Curriculum",
    }
  ]);
  const [publishItems, setPublishItems] = useState([
    {
      id: 1,
      title: "Course landing page",
    },
    {
      id: 2,
      title: "Pricing",
    }
  ]);
  return (
    <InstructorCreateCourseWrapper>
      <CreateCourseOptionBar>
        <CreateContent>
          <h4>Create your content</h4>
          {contentItems.map((item) => {
            return <div key={item.id} style={{display: "flex", flexDirection: "row"}}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </CreateContent>
        <PublishCourse>
          <h4>Publish your course</h4>
          {publishItems.map((item) => {
            return <div key={item.id} style={{display: "flex", flexDirection: "row"}}>
              <div className="icon"></div>
              <div>{item.title}</div>
            </div>
          })}
        </PublishCourse>

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
  
  h4 {
    margin: 0;
  }
`

const CreateCourseOptionBar = styled.div`
  width: 20%;
`

const CreateCourseMain = styled.div`
  width: 80%;
  
`

const CreateContent = styled.div`
  display: flex;
  flex-direction: column;
`

const PublishCourse = styled.div`

`