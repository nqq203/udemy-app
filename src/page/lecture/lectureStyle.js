import styled from "styled-components";
import {CustomRating} from "../../components/Rating/Rating"
import { useDebugValue, useEffect } from "react";

export const HeaderLectureStyle = styled.div`
  height: 50px;
  width: 100vw;
  background-color: var(--color-gray-400);
  color: white;
  border-bottom: 0.5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderLecture = ({courseName}) => {
    return(
        <HeaderLectureStyle>
            <h3 style={{fontWeight:400}}>{courseName}</h3>
        </HeaderLectureStyle>
    )
}

export const LectureOptionStyle = styled.div`
    display: flex;
    width: auto;
    align-items: center;
    border-bottom: 1px solid var(--color-gray-200);
    margin: 0px 20px;
    margin-bottom: 20px;
    
    nav ul{
        list-style: none;
        display: flex;
        gap: 20px;
        padding-left: 10px;
    }

    nav ul li {
        width: auto;
        font-weight: 700;
        color: var(--color-gray-250);
        &:hover{
            cursor: pointer;
            color: var(--color-gray-600);
        }
    }

    .isClick{
        color: var(--color-gray-600);
        font-weight: 700;
    }
`;

export const LectureOptionContainerStyle = styled.div`
    margin: 20px 40px;
    
    .authorName{
        font-style: italic;
        color: var(--color-orange-500);
    }

`;

export const LectureOptionContainer = ({content}) => {
    return(
        <LectureOptionContainerStyle>
            {content}
        </LectureOptionContainerStyle>
    )
}

export const OverviewSection = (props) => {
    var course = props.course || undefined
    var instructor = props.instructor || undefined

    return(
        (course && instructor) ? (
            <div>
                <h2>About this course</h2>
                <div>
                    {course?.description}
                </div>

                <h2>Ratings</h2>
                <div>
                    <CustomRating rates={course?.ratings}></CustomRating>
                </div>

                <h2>Instructor</h2>
                <h3 className="authorName">{instructor?.fullName}</h3>
                <ul>
                    <li>Professional Android app developer with more than 10 years experience.</li>
                    <li>Having a successful apps on playstore with over than +1,000,000 downloads  ( Check them on playstore: )</li>
                    <li>Masters Degree in computer science</li>
                    <li>Teaching in many local schools</li>
                    <li>Having a big youtube channel helping many people to learn android app development and flutter.</li>
                </ul>
            </div>
        ) : (
            //Loading
            <></>
        )
        
    )
}

export const ReviewSection = () => {
    return(
        <h2>Reviews of the course</h2>
    )
}


export const CourseContentStyle = styled.div`
    border-bottom: 0.5px solid var(--color-gray-200);
    h3 {
        margin-left: 20px;
    }
`;

export const CourseContentContainer = styled.div`
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
    background-color: var(--color-gray-100);
    position: relative;
`;