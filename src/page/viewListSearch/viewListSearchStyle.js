import styled from "styled-components"
import {Chip} from "../../components/Chip/Chip.js"
import {CustomRating} from "../../components/Rating/Rating.js"
import { useState,useEffect } from "react";

import {Typography,CardMedia,Grid} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {callApiGetCoursesBySearching} from '../../api/course'
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from 'react-spinners';




export const StyleH1 = styled.h1`
    margin-left: 16px;
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

    &.align-right{
        text-align: end;
    }

    &.grey-color{
        color: var(--color-gray-300);
    }
`;

export const CourseRowItemStyle = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Divider = styled.div`
    width: auto;
    background-color: var(--color-gray-150);
    height: 1px;
    margin-top: ${({margintop}) => margintop ? margintop : '10px'};
`;

export const ContentCourseStyle = styled.div`
    display: flex; 
    flex-direction: column;
`;

export const CourseRowItem = (props) => {
    // const key = k
    const navigate = useNavigate();
    const titleCourse = props.title || "None"
    const authorCourse = props.author || "None"
    const ratingCourse = props.rating || "0"
    const priceCourse = props.price || "0"
    const imgCourse = props.image || "/imgs/courses/web.jpg"

    const hasChip = props.chipLabel
    const description = props.desc || "None"
    const totalHour = props.duration || 0

    const formattedPrice = priceCourse.toLocaleString(navigator.language, { minimumFractionDigits: 0 })

    const handleCourseClick = () => {
      navigate(`/course-detail/${props.id}`);
    }

    return(
      <CourseRowItemStyle onClick={handleCourseClick}>
          <Grid container spacing={2}>
              <Grid item xs={3.5}>
                  <img 
                    src={imgCourse}
                    width={"100%"}
                    height={140}
                    alt="Error happened"
                  ></img>
              </Grid>

              <Grid item xs={7.2}>
                  <ContentCourseStyle>
                          <StyleH4>
                              {/* The Complete 2024 Web Development Bootcamp */}
                              {titleCourse}
                          </StyleH4>

                          <div style={{ marginBottom: "5px",fontWeight: 300,color: "var(--color-gray-600)"}}>
                              {description}
                          </div>

                          <Typography variant="body2" color="text.secondary" marginBottom={"2px"}>
                              {authorCourse}
                          </Typography>

                          <CustomRating rates={ratingCourse} />

                          <Typography variant="body2" color="text.secondary" margin={"2px 0px"} fontSize={"12px"}>
                              {totalHour} total hours
                          </Typography>

                          {hasChip && <Chip>Bestseller</Chip>}
                  </ContentCourseStyle>
              </Grid>
              
              <Grid item xs={1.3} style={{ paddingLeft: "0px"}}>
                  <StyleH4 className="align-right">
                      ${formattedPrice}
                  </StyleH4>
              </Grid>
          </Grid>

          <Divider margintop="20px"></Divider>
      </CourseRowItemStyle>
        
    )
}

export const ListCourseStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ViewListCourseStyle = styled.div`
  margin: 30px;

  .container{
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
  }
`;


    
