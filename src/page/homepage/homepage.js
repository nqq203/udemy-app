import {HomePageWrapper,Herobanner,QuoteCard,SliderContainer, StyleH2,UserWelcome,CatogoriesList} from "./homepageStyle"
import {callApiGetCoursesPagination} from "../../api/course"
import { useQuery } from "react-query";
import { useState,useEffect } from "react";
import { PropagateLoader } from 'react-spinners';



export default function HomePage(){
  const [loading,setLoading] = useState(true)
  const [courses,setCourses] = useState([])
  const [instructors,setInstructors] = useState([])
  
  const {data: fetchCourses, isSuccess, isLoading, isError } = useQuery(
    "fetch10Courses",
    () => callApiGetCoursesPagination(1,10),
    {
      onSuccess: (data) => {
        // console.log(data)
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

  // localStorage.getItem('fullname')
  var username = null

  return(
    <HomePageWrapper>
      <CatogoriesList></CatogoriesList>
      <Herobanner>
        <QuoteCard title="Did you forget something?">
        </QuoteCard>
      </Herobanner>

      {username == null ? (
        <></>
      ) : (
        <UserWelcome username="Nguyễn Thị Mỹ Diệu"></UserWelcome>
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