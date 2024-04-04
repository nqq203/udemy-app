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

export const CourseRowItem = ({k,title,author, rating,price,image, chipLabel,desc,hours} ) => {
    // const key = k
    const titleCourse = title || "None"
    const authorCourse = author || "None"
    const ratingCourse = rating || "0"
    const priceCourse = price || 0
    const imgCourse = image || "/imgs/courses/web.jpg"
    const hasChip = chipLabel
    const description = desc || "None"
    const totalHour = hours || 0

    const formattedPrice = priceCourse.toLocaleString(navigator.language, { minimumFractionDigits: 0 })

    return(
      <CourseRowItemStyle>
          <Grid container spacing={2}>
              <Grid item xs={3.5}>
                  <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={imgCourse}
                  />
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
                      <u>đ</u>{formattedPrice}
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

export const SearchResultContainer = ({courses}) => {
    const allCourse = courses || []
    const total = allCourse.length

    const [listCourses,setListCourses] = useState([])
    const [totalPage,setTotalPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
      // call API to get courses
      callAPIGetCourse()
    })

    function callAPIGetCourse() {

    }

    function handleChange(event,value){
      console.log(value)
      setCurrentPage(value)
    }

    return(
      <ListCourseStyle>
          <StyleH4 className="align-right grey-color">
              {total} results
          </StyleH4>
          {allCourse.map((course, index) => (
              <CourseRowItem
                  key={index}
                  {...course}
              />
              
          ))}

          <Stack spacing={2} marginLeft={"20px"}>
              <Pagination count={10} variant="outlined" color="primary" size="large"
                   onChange={handleChange} page={currentPage}
                  />
          </Stack>

      </ListCourseStyle>
    )
}

export const ViewListCourseStyle = styled.div`
  margin: 30px;
`;

export const FilterList = () => {
  const filterValue = ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"]

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Rating" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            sx={{paddingLeft:"16px"}}
            
          >
            {filterValue.map(value => (
              
              <FormControlLabel value={value} control={<Radio />} label={value}  />
            ))}
            
          </RadioGroup>
      </Collapse>

      <Divider margintop="10px"></Divider>
    </List>
  );
}


    
