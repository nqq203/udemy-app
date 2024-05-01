import styled from "styled-components";
import { useState,useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/AuthContext";
import { callApiGetListCourses } from "../../../api/course";

import { Select,InputLabel,MenuItem,FormControl } from "@mui/material";
import { ReviewsCourseContainer } from "./InstructorReviewStyle";

export default function InstructorReviews() {
    const { isAuthenticated } = useAuth();
    const [courseItems, setCourseItems] = useState([]);
    const [currentCourse,setCurrentCourse] = useState({id:null,name:"None"})
    
    const userId = localStorage.getItem("_id")

    const {coursesData,refetch} = useQuery(
        "courses",
        () => callApiGetListCourses(userId),
        {
            onSuccess: (data) => {
                // console.log("Success")
                // console.log(data)
                setCourseItems(data?.metadata)
            },
            onError: (error) => {
              console.error("Error fetching data:", error);
            },
            staleTime: Infinity,
        }
    );


    useEffect(() => {
        if (isAuthenticated) {
          refetch();
        }
    }, []);

    useEffect(() => {
        setCourseItems(coursesData?.metadata)
    },[coursesData])


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleCourseClick = (event) => {
        if(event.currentTarget.id === ""){
            setCurrentCourse({id: null, name: event.currentTarget.dataset.value})
        } else{
            setCurrentCourse({id: event.currentTarget.id, name: event.currentTarget.dataset.value})
        }
    }
      
    return(
        <InstructorReviewsContainer>
            <div className="container-row">
                <h1 style={{fontFamily:"serif",m: 0}}>Reviews</h1>
                
                <FormControl variant="standard" size="small" 
                    className="form-controll-custom">
                    <InputLabel id="demo-simple-select-standard-label">Your courses</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="course-select"
                        value={currentCourse?.name}
                        onChange={handleSubmit}
                        disableUnderline
                    >
                        <MenuItem id="" value="None" onClick={handleCourseClick}>
                            None
                        </MenuItem>

                        {courseItems?.map((course,index) => (
                            <MenuItem key={index} id={course._id} value={course.name} 
                                onClick={handleCourseClick}>{course.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <ReviewsCourseContainer course={currentCourse}></ReviewsCourseContainer>
        </InstructorReviewsContainer>
    )
}

const InstructorReviewsContainer = styled.div`
    display: flex;
    margin: 50px 100px;
    flex-direction: column;
    
    .container-row{
        display: flex;
        gap: 20px;
        flex-direction: row;
        align-items: center;
    }

    .gap-10{
        gap: 10px;
    }

    .container-column{
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
    }

    .space-between{
        justify-content: space-between;
    }

    .result-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
    }

    .form-controll-custom{
        margin: 0px 10px;
        min-width: 120px;
        width:-webkit-fill-available;
    }
`;