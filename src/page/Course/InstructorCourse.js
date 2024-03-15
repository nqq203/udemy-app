import styled from "styled-components";
import { Button } from "../../components/Button/Button";

export default function InstructorCourse() {
  return <InstructorCourseWrapper>
    <CourseCreation>
      <div className="course-creation_text">Jump Into Course Creation</div>
      <Button bgColor={'var(--color-purple-300)'} fontWeight={700} hoverBgColor={'var(--color-purple-400)'}>Create Your Course</Button>
    </CourseCreation>
    <div className="course-creation_description">Based on your experience, we think these resources will be helpful.</div>
    <CourseGetStarted>
      <div className="course-getstarted_engage">
        <img src="../../../assets/engaging-course.jpg"/>
        <div className="course-engagement">
          <h4 className="course-engagement-title">Create an Engaging Course</h4>
          <div className="course-engagement-description">Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</div>
        </div>
      </div>
      <div className="course-creation-and-audience">
        <div className="course-create-video">
          <img src="../../../assets/video-creation.jpg"/>
          <div className="video-creation">
            <h4 className="video-creation-title">Get Started with Video</h4>
            <div className="video-creation-description">Quality video lectures can set your course apart. Use our resources to learn the basics.</div>
          </div>
        </div>
        <div className="course-build-audience">
          <img src="../../../assets/build-audience.jpg"/>
          <div className="build-audience">
            <h4 className="build-audience-title">Build Your Audience</h4>
            <div className="build-audience-description">Set your course up for success by building your audience.</div>
          </div>
        </div>
      </div>
      <div className="course-newcomer">
        <h4 className="course-newcomer-title"></h4>
        <div className="course-newcomer-description">Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</div>
      </div>
    </CourseGetStarted>
  </InstructorCourseWrapper>
}

const InstructorCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .course-creation_description {
    display: flex;
    justify-content: center;
    font-weight: 600;
    margin: 60px 0;
  }
`

const CourseCreation = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin: 50px 100px;
  margin-bottom: 0;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
  display: flex;
  justify-content: space-between;
  
  .course-creation_text {
    position: relative;
    left: 50px;
    margin: 65px 0px;
    text-align: center;
    font-weight: 600;
  }
  button {
    position: relative;
    right: 50px;
    margin: 50px 0px;
    width: 300px;
  }
`

const CourseGetStarted = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 100px;
  
  .course-getstarted_engage {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 150px;
    border: 1px solid var(--color-gray-200);
    box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);

    img {
      width: 200px;
      height: auto;
      padding-bottom: 40px;
    }

    div {
      width: 610px;

      h4 {
        font-weight: 500;
        font-size: 25px;
      }
      div {
        padding-bottom: 40px;
        font-weight: 500;
      }
    }
  }

  .course-creation-and-audience {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    img {
      width: 200px;
      padding-bottom: 40px;
    }

    .course-create-video,
    .course-build-audience {
      display: flex;
      flex-direction: row;
      width: 50%;
      justify-content: space-around;
      border: 1px solid var(--color-gray-200);
      box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
      padding: 0 20px 0 20px;
      align-items: center;

      h4 {
        padding: 30px 0px 0px 0;
      }

      div {
        width: 400px;
        display: flex;
        flex-direction: column;
        padding-bottom: 40px;
      }
    }
  }
`