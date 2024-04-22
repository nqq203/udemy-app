import {HeaderLecture,LectureOptionStyle,CourseContentStyle,
  CourseContentContainer,LectureOptionContainer,
  OverviewSection,ReviewSection,ReviewOverlay} from "./lectureStyle"
import { useState,useEffect } from "react";

import { Grid,Box,ListItemButton,ListItemText,Divider } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useQuery } from "react-query";
import { callApiGetCourseById } from "../../api/course";
import { callApiGetReviews,callApiGetReviewByUserAndCourseId } from "../../api/review";

import ReactPlayer from 'react-player';

import 'cloudinary-video-player/cld-video-player.min.css';
import { useAuth } from "../../context/AuthContext";

import { PropagateLoader } from 'react-spinners';

export default function Lecture(){
  const [dataCourse,setDataCourse] = useState(null)
  const [dataReviews,setDataReviews] = useState(null)
  const [loading,setLoading] = useState(true)

  // Course content
  const [errNoti,setErrNoti] = useState("")
  const [course,setCourse] = useState(null)
  const [instructor,setInstructor] = useState(null)
  const [sections,setSections] = useState([])
  const [lectures,setLectures] = useState([])
  const [permission,setPermission] = useState(false)
  const { isAuthenticated } = useAuth()

  // Lecture Options UI
  const [lectureOptionClick, setLectureOptionClick] = useState("Overview");
  const [optionContent,setOptionContent] = useState(<div></div>)

  // Course UI
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState("");
  const [videoId, setSelectedVideoId] = useState("");

  // Reviews
  const [reviewOverlay,setReviewOverlay] = useState(false)
  const [userReview,setUserReview] = useState(null)

  const queryParams = new URLSearchParams(window.location.search);
  const courseID = queryParams.get('courseId') || "";
  const userId = localStorage.getItem("_id") || "";

  // console.log(courseID);
  

  const {data: courseInfo, isSuccess, isLoading, isError,refetch } = useQuery(
    "courseInfo",
    async() => {
      const dataCourse = await callApiGetCourseById(courseID);
      const dataReviews = await callApiGetReviews(courseID);
      const userReview = await callApiGetReviewByUserAndCourseId(courseID,userId)
      return {dataCourse,dataReviews,userReview}
    },
    {
      onSuccess: (data) => {
        console.log("OnSuc")
        console.log(data)
        if(data.dataCourse?.code === 200){
          setDataCourse(data.dataCourse)
          if(data.dataReviews?.code === 200){
            setDataReviews(data.dataReviews)
          }
          if(data.userReview?.code === 200){
            setUserReview(data.userReview)
          }
          setPermission(true);
        } else {
          setPermission(false)
          setErrNoti("You don't have the permission to access this course")
          if(data.dataCourse?.code === 404){
            setErrNoti("Course not found")
          }
        }

        setLoading(false)
      },
      onError: (error) => {
        console.error("Error fetching data", error);
      },

      staleTime: Infinity,
    }
  )    

  useEffect(() => {
    console.log("reload")
    if(permission){
      setCourse(dataCourse?.metadata?.course)
      setInstructor(dataCourse?.metadata?.instructor)
      setSections(dataCourse?.metadata?.sections || [])
      setLectures(dataCourse?.metadata?.lectures || [])
      setOptionContent(<OverviewSection course={dataCourse?.metadata?.course} 
        instructor={dataCourse?.metadata?.instructor}>  </OverviewSection>)

      setSelectedSection(dataCourse?.metadata?.sections[0])
      setSelectedVideoId(dataCourse?.metadata?.lectures[0][0]?.url)
      
      // Reviews
      setDataReviews(dataReviews?.metadata)
      setUserReview(userReview?.metadata?.review)
      // console.log("hi\n" + userReview)
    }
  },[dataCourse])

  useEffect(() =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    refetch();
  },[])

  
  const handleListItemClick = (event, index, sectionName,idVideo) => {
    setSelectedIndex(index);
    setSelectedSection(sectionName);
    setSelectedVideoId(idVideo);
  };

  const handleLectureOptionClick = (option) => {
    setLectureOptionClick(option);
    if(option === "Overview"){
      setOptionContent(<OverviewSection course={course} instructor={instructor}></OverviewSection>)
    } else if(option === "Reviews"){
      setOptionContent(<ReviewSection dataReviews={dataReviews} courseRate={course?.ratings}></ReviewSection>)
    }
  }

  return (
    <>
      {loading? (
          <PropagateLoader color="var(--color-blue-300)"
            style={{ position:"relative",left:"50%",top:"200px",transform:"translateX(-50%)"}}
           />
      ) : null}
      {!isAuthenticated || !permission ? (
        <Box
          height={300}
          width="auto"
          my={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={4}
          p={2}
        >
          {!isAuthenticated ? (
            <h2>
              Please sign in/sign up and register courses to learn
            </h2>
          ) : (
            <h2>
              {errNoti}
            </h2>
          )}
          
        </Box>
      ): (
        <Grid container>
          {reviewOverlay ? (
            <ReviewOverlay courseId={courseID} openOverlay={setReviewOverlay}
              userReview={userReview} setUserReview={setUserReview}>
              
            </ReviewOverlay>
          ) : null
          }
          <HeaderLecture courseName ={course?.name} openOverlay={setReviewOverlay}>

          </HeaderLecture>

          <Grid item xs={8}>
            <div >           
              <ReactPlayer
                // Disable download button
                config={{ file: { attributes: { controlsList: 'nodownload' } } }}

                url={`${videoId}`}
                controls
                width="100%"
                height="100%"
                playing={true}
              />
            </div>

            <LectureOptionStyle>
              <nav>
                <ul>
                  <li className={lectureOptionClick === "Overview" ? "isClick" : "" } onClick={() => handleLectureOptionClick("Overview")}>Overview</li>
                  <li className={lectureOptionClick === "Reviews" ? "isClick" : "" } onClick={() => handleLectureOptionClick("Reviews")}>Reviews</li>
                </ul>
              </nav>
            </LectureOptionStyle>

            <LectureOptionContainer content={optionContent}></LectureOptionContainer>
          </Grid>

          <Grid item xs={4}>
            <CourseContentStyle>
              <h3>Course content</h3>
            </CourseContentStyle>

            <CourseContentContainer>
              {sections?.map((section, index) => (
                <Box
                    key={index}
                    sx={{
                        bgcolor: open ? 'white' : null,
                    }}
                >
                  <ListItemButton
                      alignItems="flex-start"
                      onClick={() => {setOpen(!open); setSelectedSection(section.name); setSelectedIndex(-1); }}
                      sx={{
                          px: 3,
                          pt: 2,
                          pb: 2,
                          backgroundColor: "var(--color-gray-100)",
                      }}
                  >
                    <ListItemText
                      primary= {section.name}
                      primaryTypographyProps={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      lineHeight: '20px',
                      mb: '2px',
                      }}
                      secondary= {`${lectures[index]?.length} lectures`}
                      secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: '16px',
                      color: "var(--color-gray-300)",
                      }}
                      sx={{ my: 0}}
                    />
                    <KeyboardArrowDown
                      sx={{
                        mr: -1,
                        opacity: 1,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                      }}
                    />
                  </ListItemButton>

                  {open && selectedSection === section.name &&
                    lectures[index]?.map((item,index) => (
                      <ListItemButton
                      key={index}
                      sx={{ py: 0.5, minHeight: 32,mb:1,backgroundColor:"white" }}
                      selected={selectedIndex === index && selectedSection === section.name}
                      onClick={(event) => handleListItemClick(event, index,section.name,item.url)}
                      >
                        <div style={{margin:"10px", color:"var(--color-grey-100)"}}>
                            <PlayCircleFilledIcon/>
                        </div>

                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', }}
                          secondary= {`${Math.round(parseInt(item.duration)/60)} min`}
                          secondaryTypographyProps={{
                          noWrap: true,
                          fontSize: 12,
                          lineHeight: '16px',
                          color: "var(--color-gray-300)",
                          }}
                        />
                      </ListItemButton>
                  ))}
                  <Divider />
                </Box>
              ))}
            </CourseContentContainer>
          </Grid>
        </Grid>      
      )}
    </>
  )
}