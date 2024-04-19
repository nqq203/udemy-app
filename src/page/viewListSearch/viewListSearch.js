import {SearchResultContainer, FilterList,ViewListCourseStyle,
  StyleH4,ListCourseStyle,Divider,CourseRowItem} from "./viewListSearchStyle.js"
import {Grid} from '@mui/material';
import {callApiGetCoursesBySearching} from '../../api/course'
import { useQuery } from 'react-query';
import { useEffect,useState,useRef } from "react";
import { PropagateLoader } from 'react-spinners';

import { useNavigate } from "react-router-dom";
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


export default function ViewListCourse() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState(null)

  const [allCourses, setAllCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [durationList, setDurationList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [currentRating, setCurrentRating] = useState(parseFloat(queryParams.get('rating')) || 0)

  const keyword = queryParams.get('keyword');
  const [pageNumber,setPageNumber] = useState(parseInt(queryParams.get('p')) || 1)

  const {data: fetchCourses, isSuccess, isLoading, isError, refetch, isRefetching } = useQuery(
    "searchByKeyword-page" + pageNumber,
    () => callApiGetCoursesBySearching(keyword,pageNumber,currentRating),
    {
      onSuccess: (data) => {
        if(isLoading){
          setLoading(true)
        }

        console.log(data)
        if(data.code === 200){
          console.log("success fetch")
          setData(data?.metadata)          
        }
        setLoading(false)        
      }, 
      onError: (error) => {
        console.error("Error fetching data", error);
      },

      staleTime: Infinity
    }
  )

  useEffect(() => {
    setAllCourses(data?.results || []);
    setInstructors(data?.instructors || []);
    setDurationList(data?.durationList || []);
    setTotalPages(data?.totalPages || 0);
    setTotal(data?.totalDocs || 0);
    // console.log("data")
  }, [data]);


  const handlePagination = (event,value) => {
    if(pageNumber == value){
      return;
    }
    setLoading(true);
    if(currentRating == 0){
      navigate(`/view-list-courses?keyword=${keyword}&p=${value}`);
    } else{
      navigate(`/view-list-courses?keyword=${keyword}&p=${value}&rating=${currentRating}`);
    }

    setPageNumber(+value);
  }

  // Filter Rating section
  const filterValue = [4.5,4,3.5,3]
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleFilterRatings = (e) => {
    const rating = +e.target.value || 3;
    if(currentRating == rating){
      return;
    }
    setLoading(true)
    // console.log(rating)

    setCurrentRating(rating);
    setPageNumber(1);
    navigate(`/view-list-courses?keyword=${keyword}&p=${1}&rating=${rating}`);
  }

  useEffect(() =>{
    refetch()
  },[currentRating,pageNumber])

  return (
    <ViewListCourseStyle>
      {loading ? (
        <div className="container">
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : (
        total === 0 ? (
          <div className="container">
            <h2>
              Sorry, we couldn't find any results for "{keyword}"
            </h2>
            <h3>Try adjusting your search. Here are some ideas:</h3>
            <ul>
              <li>Make sure all words are spelled correctly</li>
              <li>Try different search terms</li>
              <li>Try more general search terms</li>
            </ul>
          </div>
        ) : (
          <div>
            <h1>{total} results for "{keyword}"</h1>
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
                      >
                        {filterValue.map((value,index) => (
                          <FormControlLabel 
                            key={value} value={value} 
                            control= {<Radio onChange={(e) => handleFilterRatings(e)} />} 
                            label={value + " & up"} 
                            checked={currentRating == value}
                          />
                        ))}
                        
                      </RadioGroup>
                  </Collapse>

                  <Divider margintop="10px"></Divider>
                </List>
              </Grid>

              <Grid item xs={9}>
                <ListCourseStyle>
                  <StyleH4 className="align-right grey-color">
                      {total} results
                  </StyleH4>

                  {allCourses?.map((course, index) => (
                    <CourseRowItem
                        key={index}
                        id = {course._id}
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
                      onChange={handlePagination} page={pageNumber}
                    />
                  </Stack>
                </ListCourseStyle>
              </Grid>
            </Grid>
  
          </div> 
        )
      )}
    </ViewListCourseStyle>
  );
}

