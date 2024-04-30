import {HomePageWrapper,Herobanner,QuoteCard,SliderContainer, StyleH2,UserWelcome,CatogoriesList} from "./homepageStyle"
import {callApiGetCoursesPagination} from "../../api/course"
import { useQuery } from "react-query";
import { useState,useEffect } from "react";
import { PropagateLoader } from 'react-spinners';
import { useAuth } from "../../context/AuthContext";
import { Divider } from "@mui/material";



export default function HomePage(){
  const [loading,setLoading] = useState(true)
  const [courses,setCourses] = useState([])
  const [instructors,setInstructors] = useState([])
  const { isAuthenticated } = useAuth()
  const [username, setUsername] = useState(null);

  const {refetch } = useQuery(
    "fetch10Courses",
    () => callApiGetCoursesPagination(1,10),
    {
      onSuccess: (data) => {
        console.log(data)
        setCourses(data?.metadata?.results)
        setInstructors(data?.metadata?.instructors)
        setLoading(false)
      }, 
      onError: (error) => {
        console.error("Error fetching data", error);
      },

      staleTime: Infinity,
    }
  )

  useEffect(() => {
    if(isAuthenticated) {
      setUsername(localStorage.getItem("fullname"))
    }
    refetch()
  }, [isAuthenticated,refetch])  

  return(
    <HomePageWrapper>
      <Divider component="div"/>
      <CatogoriesList></CatogoriesList>
      <Herobanner>
        <QuoteCard title="Did you forget something?">
        </QuoteCard>
      </Herobanner>

      {username == null ? (
        <></>
      ) : (
        <UserWelcome username={username}></UserWelcome>
      )}
      

      <StyleH2>Recommended for you</StyleH2>
      
      {loading ? (
        <div className="container">
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : (
        <SliderContainer courses={courses} instructors={instructors}>
        </SliderContainer>
      )}

    </HomePageWrapper>
  );
}