import {HeaderLecture,LectureOptionStyle,CourseContentStyle,
  CourseContentContainer,LectureOptionContainer,
  OverviewSection,ReviewSection,ReviewOverlay,NoteSection, NoteItem,
  SectionContainer} from "./lectureStyle"
import { useState,useEffect } from "react";

import { Grid,Box } from "@mui/material";
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
  
  
  const {refetch } = useQuery(
    "courseInfo",
    async() => {
      const dataCourse = await callApiGetCourseById(courseID);
      const dataReviews = await callApiGetReviews(courseID);
      const userReview = await callApiGetReviewByUserAndCourseId(courseID,userId)
      return {dataCourse,dataReviews,userReview}
    },
    {
      onSuccess: (data) => {
        // console.log("OnSuc")
        // console.log(data)
        
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
          setPermission(true)
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
    // console.log("reload")
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
    setLectureOptionClick("Overview")
    refetch();  
  },[])

  useEffect(() => {
    if(!isAuthenticated){
      setLoading(false)
    }
  },[isAuthenticated])

  const handleLectureOptionClick = (option) => {
    setLectureOptionClick(option);
    if(option === "Overview"){
      setOptionContent(<OverviewSection course={course} instructor={instructor}></OverviewSection>)
    } else if(option === "Reviews"){
      setOptionContent(<ReviewSection dataReviews={dataReviews} courseRate={course?.ratings}></ReviewSection>)
    } else if(option === "Notes"){
      // pass data to this
      const notes = [{
        section: "Section 1",
        lecture: "Lecture 1",
        content: "This is a note",
        createAt: ' 2021-10-10 10:10:10'
      }, {
        section: "Section 2",
        lecture: "Lecture 2",
        content: "This is another note",
        createAt: ' 2021-10-10 10:10:10'
      }]
      setOptionContent(<NoteSection notes={notes}></NoteSection>)
    }
  }

  const isSelectedLecture = (index,sectionName) => {
    if(selectedIndex === index && selectedSection === sectionName)
      return true;
    return false
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
                  <li className={lectureOptionClick === "Notes" ? "isClick" : "" } onClick={() => handleLectureOptionClick("Notes")}>Notes</li>
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
                        bgcolor: 'white',
                    }}
                >
                  <SectionContainer 
                    key={index} 
                    section={section} 
                    lectures={lectures[index]}
                    isSelectedLecture={isSelectedLecture}
                    setSelectedVideoId={setSelectedVideoId}
                    setSelectedIndex={setSelectedIndex}
                    setSelectedSection={setSelectedSection} />
                </Box>
              ))}
            </CourseContentContainer>
          </Grid>
        </Grid>      
      )}
    </>
  )
}