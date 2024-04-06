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

export const CourseRowItem = (props ) => {
    // const key = k
    const titleCourse = props.title || "None"
    const authorCourse = props.author || "None"
    const ratingCourse = props.rating || "0"
    const priceCourse = props.price || "0"
    const imgCourse = props.image || "/imgs/courses/web.jpg"

    const hasChip = props.chipLabel
    const description = props.desc || "None"
    const totalHour = props.duration || 0

    const formattedPrice = priceCourse.toLocaleString(navigator.language, { minimumFractionDigits: 0 })

    return(
      <CourseRowItemStyle>
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

// bug: Not have instructors
export const SearchResultContainer = (props) => {
  // const [totalPage,setTotalPage] = useState(1)
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const [loading,setLoading] = useState(false)


  const refetch = props?.refetch
  const keyword = props?.keyword
  const [data,setData] = useState(props?.data)
  const [refetching,setRefetching] = useState(props?.isRefetching);
  const [currentPage, setCurrentPage] = useState(parseInt(data.page));
  const [currentRating, setCurrentRating] = useState(queryParams.get('rating') || 0)

  const [allCourses, setAllCourses] = useState(data.results || []);
  const [instructors, setInstructors] = useState(data.instructors || []);
  const [durationList, setDurationList] = useState(data.durationList || []);
  const [totalPages, setTotalPages] = useState(data.totalPages || 0);
  const [total, setTotal] = useState(data.totalDocs || 0);

  useEffect(() => {
    setData(props?.data);
    setCurrentPage(parseInt(data.page))
    setAllCourses(data.results || []);
    setInstructors(data.instructors || []);
    setDurationList(data.durationList || []);
    setTotalPages(data.totalPages || 0);
    setTotal(data.totalDocs || 0);
    setLoading(false)
    console.log("data")
  }, [props]);


  // const currentRating = queryParams.get('rating') || 0;

  const handlePagination = (event,value) => {
    const queryParams = new URLSearchParams(window.location.search);
    const rating = queryParams.get('rating') || 0;
    if(rating == 0){
      navigate(`/view-list-courses?keyword=${keyword}&p=${value}`);
    } else{
      navigate(`/view-list-courses?keyword=${keyword}&p=${value}&rating=${rating}`);
    }

    refetch();
    setCurrentPage(value)
    // window.location.reload();
  }

  // Filter Rating section
  const filterValue = [4.5,4,3.5,3]
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleFilterRatings = async (e) => {
    setLoading(true)
    e.stopPropagation()
    const rating = e.target.value || 3;
    navigate(`/view-list-courses?keyword=${keyword}&p=${1}&rating=${rating}`);
    console.log("IsRefetching filter" )
    console.log(refetching)
    refetch()
    setCurrentRating(rating);
    console.log("IsRefetching 2")
    console.log(refetching)

    // window.location.reload();
  }

  return(
    <Grid container spacing={2}>
    
      <Grid item xs={3}>
        <h3>Filter</h3>
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
                onClick={(e)=> e.preventDefault()}
              >
                {filterValue.map((value,index) => (
                  <FormControlLabel 
                    key={value} value={value} 
                    control={<Radio />} label={value + " & up"} 
                    onClick={(e) => handleFilterRatings(e)} 
                      checked={currentRating == value}
                    />
                ))}
                
              </RadioGroup>
          </Collapse>

          <Divider margintop="10px"></Divider>
        </List>
      </Grid>

      <Grid item xs={9}>
      {/* {loading ? (
        <div>
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : ( */}
        <ListCourseStyle>
          <StyleH4 className="align-right grey-color">
              {total} results
          </StyleH4>

          {allCourses?.map((course, index) => (
            <CourseRowItem
                key={index}
                id = {"Course_" + index}
                title={course.name}
                author={instructors[index]}
                rating={course.ratings}
                price={course.price}
                image={course.imageUrl}
                chipLabel={false}
                desc={course.description}
                duration={Math.ceil(durationList[index]/3600)}
            />
          ))}

          <Stack spacing={2} marginLeft={"20px"}>
            <Pagination count={totalPages} variant="outlined" color="primary" size="large"
              onChange={handlePagination} page={currentPage}
            />
          </Stack>
        </ListCourseStyle>
      {/* )} */}
      </Grid>
    </Grid>
    
    
  )
}

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

export const FilterList = () => {
  const filterValue = ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"]

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleFilterRatings = (e) => {
    console.log(e.target.value);

  }

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
            {filterValue.map((value,index) => (
              <FormControlLabel 
                key={index} value={value} 
                control={<Radio />} label={value} 
                onClick={handleFilterRatings} />
            ))}
            
          </RadioGroup>
      </Collapse>

      <Divider margintop="10px"></Divider>
    </List>
  );
}


    
