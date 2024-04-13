import styled from "styled-components";
import { Button } from "../../../components/Button/Button";
import { Link, Outlet } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect, Fragment } from "react";
import FilterDropdown from "../../../components/FilterDropdown/FilterDropdown";
import moment from "moment";
import { useQuery } from "react-query";
import { 
  callApiGetListCourses,
  callApiGetCourseByName
} from "../../../api/course";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormRequirement from "../../../components/FormRequirement/FormRequirement";
import { Backdrop } from "../../../components/Backdrop/Backdrop";
import { useDispatch } from "react-redux";
import { setClickedCourse } from "../../../redux/coursesSlice";

export default function InstructorCourse() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const instructorId = localStorage.getItem("_id");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isOpenFormRequirement, setIsOpenFormRequirement] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const { data: fetchedCourses, isSuccessFetch, isLoading, isError, refetch } = useQuery(
    "courseList",
    () => callApiGetListCourses(instructorId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error("Error fetching data:", error);
      },
      staleTime: Infinity,
    }
  );

  const handleSearch = async () => {
    try {
      const searchData = await callApiGetCourseByName({ instructorId: instructorId, name: searchInput });
      if (searchInput === "") {
        setFilteredItems(fetchedCourses?.metadata);
      }
      else if (!searchData.isSuccess) {
        setFilteredItems(searchData?.metadata || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setFilteredItems(fetchedCourses?.metadata);
    // console.log(fetchedCourses?.metadata);
  }, [fetchedCourses]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsOpenFormRequirement(false);
      setAccessToken(localStorage.getItem("accessToken"));
    }
    else {
      setIsOpenFormRequirement(true);
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [fetchedCourses]);

  function onCloseFormRequirement() {
    setIsOpenFormRequirement(false);
    navigate("/");
  }
  
  return <InstructorCourseWrapper>
    {isOpenFormRequirement && (
      <>
        <Backdrop onClick={onCloseFormRequirement} />
        <FormRequirement content={"You need to login to access to this functional"} btnContent={"Sign In"} onSubmit={() => navigate("/sign-in")} onClose={onCloseFormRequirement}/>
      </>
    )}
    
    <CourseManagement>
      <div className="course-management-title">Courses</div> 
      <div className="course-management-header">
        <div className="course-management-header_search">
          <input type="text" placeholder="Search your courses" onChange={(e) => setSearchInput(e.target.value)} value={searchInput}/>
          <Button style={{display: "flex", alignItems: "center"}} onClick={handleSearch}><IoSearch /></Button>
        </div>
        <FilterDropdown items={filteredItems} setFilteredItems={setFilteredItems} />
        <Link to="/instructor/create"><Button className="course-management-header_newcourse">New Course</Button></Link>
      </div>
      {isAuthenticated &&
      <div className="course-management-main">
            {filteredItems?.length !== 0 ? filteredItems?.map((item, idx) => (
                <div className="course-management-main_courseview" key={item.id} onClick={() => {
                  dispatch(setClickedCourse(fetchedCourses?.metadata[idx]?._id));
                  navigate("/instructor/create");
                }} style={{cursor: "pointer"}}>
                  <img src="../../../assets/engaging-course.jpg" alt="engaging-course"/>
                  <div className="coures-management-main_courseview_title">
                    <div>{item.name}</div>
                    <div style={{position: "absolute", bottom: "0"}}>{moment(item.createdAt).format("hh:mm - DD/MM/YY")}</div>
                  </div>
                  <div className="course-management-main_courseview_statistic">
                    <div>{item.price}</div>
                    <div style={{position: "absolute", bottom: "0"}}>Sold: {item.amountSold}</div>
                  </div>
                </div>
            )):
            <div style={{display: "flex", justifyContent: "center"}}>Course Not Found</div>}
      </div>}
    </CourseManagement>
    <CourseCreation>
      <div className="course-creation_text">Jump Into Course Creation</div>
      <Link to="/instructor/create">
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
  position: relative;

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