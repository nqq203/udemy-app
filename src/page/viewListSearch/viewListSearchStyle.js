import styled from "styled-components"
import {Card, Box, CardContent,Typography,CardMedia, Rating} from '@mui/material';
import {Chip} from "../../components/Chip/Chip.js"
import {CustomRating} from "../../components/Rating/Rating.js"

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
`;

export const CourseItem = ({k, title,author, rating,price,image, isBestSeller} ) => {
    const key = k
    const titleCourse = title || "None"
    const authorCourse = author || "None"
    const ratingCourse = rating || "0"
    const priceCourse = price || "0"
    const imgCourse = image || "/imgs/courses/web.jpg"
    const chipLabel = isBestSeller

    return(
        <Card sx={{ width: 240 ,height:400, boxShadow:"none",objectFit:"cover"}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={imgCourse}
            />
            <CardContent sx={{padding: 0, mt: 2}}>
                <StyleH4>
                    {/* The Complete 2024 Web Development Bootcamp */}
                    {titleCourse}
                </StyleH4>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {authorCourse}
                </Typography>

                <CustomRating rates={ratingCourse} />

                <StyleH4>
                    <u>đ</u>{priceCourse}
                </StyleH4>

                {chipLabel && <Chip>Bestseller</Chip>}
            </CardContent>
        </Card>
    )
}