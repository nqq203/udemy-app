import styled from "styled-components";
import { useState } from "react";

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
        width: fit-content;
    }

    nav ul li a {
        color: var(--color-gray-300);
        text-decoration: none;
        font-weight: 700;
    }

    nav ul li a:hover {
        color: var(--color-gray-600);
    }

`;

export const LectureOptionContainerStyle = styled.div`
    margin: 20px 40px;
    
    .authorName{
        font-style: italic;
        color: var(--color-orange-500);
    }
`;

export const LectureOptionContainer = () => {
    return(
        <LectureOptionContainerStyle>
            <h2>About this course</h2>
            <div>
            Learn Android App Development in both Java &amp; Kotlin Languages. You'll master Android from ZERO to HERO
            </div>

            <h2>Instructor</h2>
            <h3 className="authorName">Abbass Masri</h3>
            <ul>
                <li>Professional Android app developer with more than 10 years experience.</li>
                <li>Having a successful apps on playstore with over than +1,000,000 downloads  ( Check them on playstore: )</li>
                <li>Masters Degree in computer science</li>
                <li>Teaching in many local schools</li>
                <li>Having a big youtube channel helping many people to learn android app development and flutter.</li>
                </ul>
        </LectureOptionContainerStyle>
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