import styled from "styled-components";

import {Card, Box, CardContent,Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useRef } from "react";

import {Button} from "../../components/Button/Button.js"
import {Chip} from "../../components/Chip/Chip.js"
import {CustomRating} from "../../components/Rating/Rating.js"
import { useNavigate } from "react-router-dom";


export const StyleH1 = styled.h1`
    margin-left: 25px;
    font-weight: 700;
`;

export const StyleH2 = styled.h2`
    margin-left: 25px;
    font-weight: 700;
`;

export const StyleH4 = styled.h4`
    margin: 0px;
    font-weight: 700;
    margin-bottom: 3px;
    font-size: 17px;
    height: 3rem;

    &.wrap{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-height: 1.5rem; 
        max-height: 3rem;       
    }
`;

export const HomePageWrapper = styled.div`
    height: 100%;
    width: auto;
    background-color: white;
    margin-bottom: 20px;

    .margin-left{
        margin-left: 20px;
    }

    .container{
        height: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }
`

export const Herobanner = styled.div`
    height: 400px;
    width: auto;
    display: flex;
    align-items: center;
    background-image: url('/imgs/herobanner.png');
    padding-bottom: 20px;
`

export const QuoteCard = () => {
    return (
        <Box maxWidth='500px' sx={{ marginLeft: '80px' }} >
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h3" component='div' fontWeight={800} fontFamily={"serif"}>
                        Did you forget something?
                    </Typography>
                    <Typography variant="body2" color="GrayText" marginBottom="20px">
                        Get what you left in your cart for less during this limited-time “don’t leave learning behind” sale.
                    </Typography>

                    <Link to={`/shopping-cart`}>
                        <Button background-color="var(--color-black)" color="var(--color-white)" width="fit-content">
                            Go to Cart
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Box>
    )
}

export const CatogoryStyle = styled.div`
    display: flex;
    width: auto;
    align-items: center;
    justify-content: center;
    background-color: var(--color-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .08);

    ul{
        list-style: none;
        display: flex;
        gap: 10px;
        padding-left: 90px;

    }

    .long-item {
        width: 155px;
    }

    ul li {
        width: 90px;
        text-align: center;
    }

    ul li a {
        color: var(--color-gray-500);
        text-decoration: none;
        font-family: var(--font-stack-text);
        font-weight: 500;
        font-size: 15px;
    }

    ul li a:hover {
        color: var(--color-blue-300);
    }
`;

export const CatogoriesList = () => {

    // Navigate to page search
    // /view-list-courses?keyword=${keyword}&p=${1}&rating=${rating}
    // /view-list-courses?category=${Development}&p=${1}&rating=${rating}
    return(
        <CatogoryStyle>
            <ul>
                <li><Link to="/view-list-courses?category=Development&p=1">Development</Link></li>
                <li><Link to="/view-list-courses?category=Business&p=1">Business</Link></li>
                <li><Link to="/view-list-courses?category=Design&p=1">Design</Link></li>
                <li><Link to="/view-list-courses?category=Finance&p=1">Finance</Link></li>
                <li className='long-item'>
                    <Link to="/view-list-courses?category=Personal+Development&p=1">Personal Development</Link>
                </li>
                <li><Link to="/view-list-courses?category=Marketing&p=1">Marketing</Link></li>
                <li className='long-item'>
                    <Link to="/view-list-courses?category=Office+Productivity&p=1">Office Productivity</Link>
                </li>
            </ul>
        </CatogoryStyle>
    )
}

export const UserWelcomeStyle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px;

    .text-button{
        background-color: transparent;
        font-weight: 800;
        text-decoration: underline;
        color: var(--color-blue-300);
        text-underline-position: under;
    }
`;

export const UserWelcome = ({username}) => {
    return(
        <UserWelcomeStyle>
            <Typography variant="h4" component='div' fontWeight={800} fontFamily={"serif"}>Let's start learning, {username}</Typography>

            <Link to={`/my-courses/learning`}>
                <Button className="text-button">
                    My learning
                </Button>
            </Link>
        </UserWelcomeStyle>
    )
}


export const CourseItem = (props ) => {
    const id = props.id
    const titleCourse = props.title || "None"
    const authorCourse = props.author || "None"
    const ratingCourse = props.rating || "0"
    const priceCourse = props.price || "0"
    const imgCourse = props.image || "/imgs/courses/web.jpg"
    const chipLabel = props.chipLabel || false
    const navigate = useNavigate()

    const formattedPrice = priceCourse.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    
    const handleCourseClick = () =>{
        // console.log("Click course");
        navigate(`/course-detail/${id}`);
    }

    return(
        <Card 
            sx={{ 
                width: 240 ,height:"auto", 
                boxShadow:"none",objectFit:"cover", 
                cursor: "pointer", 
                "&:hover": {
                    boxShadow: "2px 4px 30px rgba(0, 0, 0, 0.05)", 
                },
            }} 
            onClick={handleCourseClick}>
            <img 
                src={imgCourse}
                width={"100%"}
                height={140}
                alt="Error happened"

            ></img>


            <CardContent sx={{pr: 1,pl: 1, mt: 0}}>
                <StyleH4 className="wrap">
                    {titleCourse}
                </StyleH4>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {authorCourse}
                </Typography>

                <CustomRating rates={ratingCourse} />

                <StyleH4>
                    ${formattedPrice}
                </StyleH4>

                {chipLabel && <Chip>Bestseller</Chip>}
            </CardContent>
        </Card>
    )
}

export const ListCourseStyle = styled.div`
    position: relative;
    scroll-snap-type: x mandatory;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 18px;
    list-style: none;
    scrollbar-width: none;
    overflow-x: auto;
`;

export const SliderWrapperStyle = styled.div`
    position: relative;

    .floating-button{
        position: absolute;
        width: 50px;
        height: 50px;
        top: 30%;
        color: #fff;
        background-color: var(--color-gray-500);
        font-size: 2.2rem;
        border: 1px solid var(--color-gray-250);
        outline: none;
        cursor: pointer;
        border-radius: 50%;
        transform: translateY(-100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3;

        &:hover{
            background-color: var(--color-gray-400);
        }
    }

    .position-right{
        right: -20px;
    }

    .position-left{
        left: -20px;
        display: none;
    }
`;

export const SliderContainerStyle = styled.div`
    /* Max numbers of courses: 10 */
    max-width: 3000px;
    width: 96%;
    transform: translateX(2%);
`;


export const SliderContainer = (props) => {
    const allCourse = props?.courses || []
    const instructors = props?.instructors || []
    const listCourse = useRef(null)
    const courseScroll = 260
    // const nextBtn = useRef(null);

    // useEffect(() => {
    //     if(allCourse.length < 6){
    //         console.log(allCourse.length)
    //         console.log(nextBtn.current)
    
    //         nextBtn?.current?.style.display = "none"
    //     }
    // },[listCourse])
     
    function slideAction(event){
        const id = event.target.id
        let direction = 0;

        if(id === "prev-slide"){
            direction = -1
        } else if(id === "next-slide"){
            direction = 1
        }

        if(direction !== 0){
            const scrollAmount = courseScroll*direction;
            listCourse.current.scrollBy({left:scrollAmount, behavior: "smooth"})
        }
        // handleSlideButtons()
    }

    function handleSlideButtons(){
        const width = 144
        const listCourses = listCourse.current;
        const maxScrollLeft = (allCourse?.length - 1) * width; //1303

        const slideButtons = [
            document.getElementById('prev-slide'),
            document.getElementById('next-slide')
          ];

        slideButtons[0].style.display = listCourses.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = listCourses.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }


    return(
        <SliderContainerStyle>
            <SliderWrapperStyle>
                <div className="floating-button position-left" id="prev-slide" onClick={slideAction}>
                    <ArrowBackIosNewIcon id="prev-slide" onClick={slideAction}></ArrowBackIosNewIcon>
                </div>
                <div className="floating-button position-right" id="next-slide" onClick={slideAction}>
                    <ArrowForwardIosRoundedIcon id="next-slide" onClick={slideAction}></ArrowForwardIosRoundedIcon>
                </div>

                <ListCourseStyle ref={listCourse} onScroll={handleSlideButtons}>
                    {allCourse?.map((course, index) => (
                        <CourseItem
                            key={index}
                            id = {course._id}
                            title={course.name}
                            author={instructors[index]}
                            rating={course.ratings}
                            price={course.price}
                            image={course.imageUrl}
                            chipLabel={false}
                        />
                    ))}
                </ListCourseStyle>

            </SliderWrapperStyle>
        </SliderContainerStyle>
    )
}