import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function InstructorCourse() {
  const navigate = useNavigate();
  function onNavgigateToCreate() {
    // navigate("/instructor/courses/create");
  }; 

  return <InstructorCourseWrapper>
    <CourseCreation>
      <div className="course-creation_text">Jump Into Course Creation</div>
      <Button bgColor={'var(--color-purple-300)'} fontWeight={700} hoverBgColor={'var(--color-purple-400)'} onClick={onNavgigateToCreate}>Create Your Course</Button>
    </CourseCreation>
    <div className="course-creation_description">Based on your experience, we think these resources will be helpful.</div>
    <CourseGetStarted>
      <div className="course-one-box">
        <img src="../../../assets/engaging-course.jpg" alt="engaging-course"/>
        <div className="course-one-box_content">
          <h4>Create an Engaging Course</h4>
          <div>Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</div>
        </div>
      </div>
      <div className="course-two-box">
        <div className="course-create-video">
          <img src="../../../assets/video-creation.jpg" alt="video-creation"/>
          <div className="video-creation">
            <h4 className="video-creation-title">Get Started with Video</h4>
            <div className="video-creation-description">Quality video lectures can set your course apart. Use our resources to learn the basics.</div>
          </div>
        </div>
        <div className="course-build-audience">
          <img src="../../../assets/build-audience.jpg" alt="build-audience"/>
          <div className="build-audience">
            <h4 className="build-audience-title">Build Your Audience</h4>
            <div className="build-audience-description">Set your course up for success by building your audience.</div>
          </div>
        </div>
      </div>
      <div className="course-one-box" style={{marginTop: "20px"}}>
        <img src="../../../assets/engaging-course.jpg" alt="engaging-course"/>
        <div className="course-one-box_content">
          <h4>Join the New Instructor Challenge!</h4>
          <div>Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!</div>
        </div>
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
  
  .course-one-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 150px;
    border: 1px solid var(--color-gray-200);
    box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);

    img {
      width: 15%;
      height: auto;
      padding: 2vh;
    }

    div {
      width: 80%;

      h4 {
        font-weight: 500;
        font-size: 25px;
      }
      div {
        padding-bottom: 40px;
      }
    }
  }

  .course-two-box {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    img {
      width: 30%;
      padding-bottom: 40px;
      padding: 2vh;
    }

    .course-create-video,
    .course-build-audience {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
      border: 1px solid var(--color-gray-200);
      box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
      padding: 0 20px 0 20px;
      align-items: center;

      h4 {
        padding: 30px 0px 0px 0;
      }

      div {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding-bottom: 40px;                              
      }
    }
  }
`