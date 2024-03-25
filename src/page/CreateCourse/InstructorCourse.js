import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Link, Outlet } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import moment from "moment";

export default function InstructorCourse() {
  const initialData = [{
    id: 1, 
    title: "Basic C++ for Beginners",
    price: "$29.99",
    amountSold: 300,
    published: moment("12/02/2023").format("DD/MM/YYYY")
  }, {
    id: 2, 
    title: "Basic Python for Beginners",
    price: "$39.99",
    amountSold: 123,
    published: moment("12/01/2023").format("DD/MM/YYYY")
  }, {
    id: 3, 
    title: "Advanced Java, Java Spring",
    price: "$49.99",
    amountSold: 30,
    published: moment("11/10/2022").format("DD/MM/YYYY")
  }, {
    id: 4, 
    title: "Design with AI",
    price: "$59.99",
    amountSold: 12,
    published: moment("23/12/2023").format("DD/MM/YYYY")
  }, {
    id: 5, 
    title: "Training Model in Machine Learning",
    price: "$69.99",
    amountSold: 100,
    published: moment("01/01/2023").format("DD/MM/YYYY")
  }, {
    id: 6, 
    title: "Machine Learning for Beginners",
    price: "$79.99",
    amountSold: 100,
    published: moment("12/05/2023").format("DD/MM/YYYY")
  }, {
    id: 7, 
    title: "XYADSYASDGFASDF",
    price: "$89.99",
    amountSold: 100,
    published: moment("12/02/2023").format("DD/MM/YYYY")
  }, {
    id: 8, 
    title: "IIIOOOZXCVZXC",
    price: "$99.99",
    amountSold: 100,
    published: moment("12/02/2021").format("DD/MM/YYYY")
  }];
  const [filteredItems, setFilteredItems] = useState(initialData);

  return <InstructorCourseWrapper>
    <CourseManagement>
      <div className="course-management-title">Courses</div>
      <div className="course-management-header">
        <div className="course-management-header_search">
          <input type="text" placeholder="Search your courses"/>
          <Button style={{display: "flex", alignItems: "center"}}><IoSearch /></Button>
        </div>
        <FilterDropdown items={initialData} setFilteredItems={setFilteredItems} />
        <Button className="course-management-header_newcourse">New Course</Button>
      </div>
      <div className="course-management-main">
            {filteredItems.map(item => (
                <div className="course-management-main_courseview" key={item.id}>
                  <img src="../../../assets/engaging-course.jpg" alt="engaging-course"/>
                  <div className="coures-management-main_courseview_title">
                    <div>{item.title}</div>
                    <div style={{position: "absolute", bottom: "0"}}>Public</div>
                  </div>
                  <div className="course-management-main_courseview_statistic">
                    <div>{item.price}</div>
                    <div style={{position: "absolute", bottom: "0"}}>Sold: {item.amountSold}</div>
                  </div>
                </div>
            ))}
      </div>
    </CourseManagement>
    <CourseCreation>
      <div className="course-creation_text">Jump Into Course Creation</div>
      <Link to="/instructor/courses/create">
        <Button bgColor={'var(--color-purple-300)'} fontWeight={700} hoverBgColor={'var(--color-purple-400)'}>Create Your Course</Button>
      </Link>
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
    <Outlet />
  </InstructorCourseWrapper>
}

const InstructorCourseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-stack-text);

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
        font-family: var(--font-stack-heading-serif);
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
        font-family: var(--font-stack-heading-serif);
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

const CourseManagement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 100px;
  font-family: var(--font-stack-text);

  .course-management-title {
    font-weight: bold;
    font-size: 30px;
    font-family: var(--font-stack-heading-serif);
    margin-bottom: 20px;
  }

  .course-management-header {
    display: flex;
    flex-direction: row;
    // align-items: center;
    gap: 20px;
    border: 1px solid var(--color-gray-200);
    box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
    padding: 20px 20px 20px 20px;
    margin-bottom: 20px;
    position: relative;

    .course-management-header_newcourse {
      position: absolute;
      right: 20px;
      width: auto;
      padding: 12px 15px;
      background-color: var(--color-purple-300);
      font-weight: bold;

      &:hover {
        background-color: var(--color-purple-400);
      }
    }

    .course-management-header_search {
      display: flex;
      flex-direction: row;
      height: 40px;

      input[type=text] {
        font-size: 15px;
        padding-left: 10px;
      }
    }
  }

  .course-management-main {
    display: flex;
    flex-direction: column;
    
    img {
      width: 120px;
    }

    .course-management-main_courseview {
      display: flex;
      gap: 20px;
      border: 1px solid var(--color-gray-200);
      box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
      padding: 20px 20px 20px 20px;
      margin-bottom: 20px;
      position: relative;

      .coures-management-main_courseview_title {
        font-family: var(--font-stack-heading-serif);
        position: relative;
        font-weight: 700;
        width: 300px;
      }

      .course-management-main_courseview_statistic {
        display: flex;
        flex-direction: row;
        width: calc(100% - 420px);
        font-family: var(--font-stack-heading);
        position: relative;
        font-weight: 700;
        justify-content: flex-end;
      }
    }
  } 
`