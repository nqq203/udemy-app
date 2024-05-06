import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button } from "../../../components/Button/Button";
import { useEffect,useState,useRef } from "react";
import { Select,InputLabel,MenuItem,FormControl,Rating,Divider,Box,Stack,Pagination } from "@mui/material";
import { PropagateLoader   } from "react-spinners";
import { useQuery } from "react-query";
import { CSVLink } from "react-csv";
import { callApiGetReviews,callApiGetReviewsPagination } from "../../../api/review";

export const ReviewItemStyle = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    margin-bottom: 15px;

    .review-content{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .custom-button-react{
        border: 1px solid var(--color-gray-400);
        width: 40px;
        height: 40px;
    }

    .reaction-contain{
        display: flex;
        gap: 7px;
    }
`;

export const ReviewItem = (props) => {
    const username = props.username || "";
    const rating = props.rating || 0;
    const comment = props.comment || "";
    const date = props.date || "";
    let dateStr = ""
    if(date !== ""){
        // dateStr = new Date(date).toDateString()
        const parsedDate = new Date(date);
        const day = parsedDate.getDate().toString().padStart(2, "0");
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
        const year = parsedDate.getFullYear();
        const hours = parsedDate.getHours().toString().padStart(2, "0");
        const minutes = parsedDate.getMinutes().toString().padStart(2, "0");
        dateStr = `${day}/${month}/${year}, ${hours}:${minutes}`;
    }
    return (
        <ReviewItemStyle>
            <div>
                <Link to="/">
                <img
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    style={{ width: "50px",marginRight:"15px",marginTop:"5px" }}
                    alt="user-profile"
                />
                </Link>
            </div>
            <div className="review-content">
                <h4 style={{margin:"0px 0px"}}>{username}</h4>
                <Box
                    sx={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating name="rating" value={rating} readOnly size="small"  />
                    <Box sx={{ ml: 2,color:"var(--color-gray-300)",fontSize:"14px" }}>{dateStr}</Box>
                </Box>
                <div>
                    {comment}
                </div>
                
            </div>
        </ReviewItemStyle>
    )
}

export const ReviewsCourseStyle = styled.div`
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
`;

export const ReviewsCSV = (props) => {
    const courseId = props.course.id || "";
    const courseName = props.course.name || "";
    const [dataReport,setDataReport] = useState([])
    
    const {refetch} = useQuery(
        "fetch-all-reviews",
        () => {
            if(courseId != ""){
                return callApiGetReviews(courseId)
            }
            return null
        },
        {
            onSuccess: (data) => {
                console.log("Fetch all reviews");
                console.log(data);
                if(data != null){
                    let reviewsReport = []
                    reviewsReport = data?.metadata?.reviews?.map((review, index) => ({
                        "Username" : data?.metadata?.users ? data?.metadata?.users[index] : "",
                        "Rating" : review.rating,
                        "Comment": review.comment,
                        "Time": review.createdAt,
                    }));
                    setDataReport(reviewsReport)
                } else{
                    setDataReport([])
                }
            },
            onError: (error) => {
                console.error("Error fetching data:", error);
            },
            staleTime: Infinity,
        }
    );

    useEffect(() => {
        refetch()
    },[courseId])

    const formatReviews = () => {
        return [
            { label: "Username", key: "Username" },
            { label: "Rating", key: "Rating" },
            { label: "Comment", key: "Comment" },
            { label: "Time", key: "Time" },
        ]
    }

    const createCsvFileName = () => `Reviews Report ${courseName}.csv`;
  
    return (
        <CSVLink
            data={dataReport}
            headers={formatReviews()}
            filename={createCsvFileName()}
            target="_blank"
            style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
        >
            <Button bgColor="white" color="black" fontWeight="700" height="50px"
                border="1px solid black" padding="5px 10px" hoverBgColor="var(--color-gray-200)"
            >
                Export to CSV
            </Button>
        </CSVLink>
    );
};

export const ReviewsCourseContainer = (props) => {
    const currentCourse = props.course || null
    // currentCourse.id = "661f3da7f99f882605188c82"
    const [loading,setLoading] = useState(true)
    const [rating,setRating] = useState("All")
    const [sortField,setSortField] = useState("Newest first")
    const [reviewsList, setReviewsList] = useState([])
    const [usersList,setUsersList] = useState([])
    const [sortType,setSortType] = useState(-1)
    const [pageNumber,setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [isCourseChange,setIsCourseChange] = useState(false)
    const [totalDocs,setTotalDocs] = useState(0)

    const ratings = ["All","1 star","2 stars","3 stars","4 stars","5 stars"];
    const sortings = ["Newest first", "Oldest first"]

    const {reviewsData,isLoading, refetch} = useQuery(
        "reviews",
        () => callApiGetReviewsPagination(currentCourse.id,ratings.indexOf(rating),pageNumber,sortType),
        {
            onSuccess: (data) => {
                console.log("Fetch reviews")
                console.log(data)
                setReviewsList(data?.metadata?.results)
                setUsersList(data?.metadata?.users)
                setTotalPages(data?.metadata?.totalPages || 0)
                setTotalDocs(data?.metadata?.totalDocs)
                setLoading(false)
            },
            onError: (error) => {
              console.error("Error fetching data:", error);
            },
            staleTime: Infinity,
        }
    )
    
    useEffect(() => {
        setRating("All")
        setSortField("Newest first")
        setSortType(-1)
        setIsCourseChange(true)
    },[currentCourse])

    useEffect(() =>{
        if(sortField === "Newest first"){
            setSortType(-1)
        } else if(sortField === "Oldest first"){
            setSortType(1)
        }
        setPageNumber(1);
    },[sortField])

    useEffect(() => {
        setLoading(true);
        refetch()
        setIsCourseChange(false)
    },[rating,sortType,isCourseChange,pageNumber])

    const handleRatingClick = (event) => {
        const id = event.currentTarget.id
        setRating(ratings[id])
        setPageNumber(1);
    }

    const handleSortClick = (event) => {
        const id = event.currentTarget.id
        setSortField(sortings[id])        
    }

    const handlePagination = (event,value) => {
        if(pageNumber === +value){
            return;
        }
        setPageNumber(+value);
    }

    return(
        <ReviewsCourseStyle>
            <div className="container-row space-between">
                <div className="container-row">
                    <div className="container-row gap-10">
                        <h4>Rating</h4>
                        <FormControl variant="standard" size="small" 
                            sx={{m:1, minWidth:50, marginTop:"15px"}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="rating-select"
                                value={rating}
                                sx={{height:"50px", width:"fit-content"}}
                                disableUnderline
                            >

                                {ratings.map((rating,index) => (
                                    <MenuItem key={index} id={index} value={rating} onClick={handleRatingClick}>{rating}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="container-row gap-10">
                        <h4>Sort by</h4>
                        <FormControl variant="standard" size="small" 
                            sx={{m:1, minWidth:80, marginTop:"15px"}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="sort-select"
                                value={sortField}
                                sx={{height:"50px", width:"fit-content"}}
                                disableUnderline
                            >
                                {sortings.map((sort,index) => (
                                    <MenuItem key={index} id={index} value={sort} onClick={handleSortClick}>{sort}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {loading? (<></>) : (
                    <ReviewsCSV course={currentCourse}></ReviewsCSV>
                )}
            </div>

            {loading ? (
                <PropagateLoader   color="var(--color-blue-300)"
                    style={{ position:"relative",left:"50%",top:"100px",transform:"translateX(-50%)"}}
                />
            ) : (
                totalDocs === 0 ? (
            <div className="result-container">
                    <h4>
                        No reviews found
                    </h4>
                    </div>
                ) : (

            <div className="result-container">
                
                <h4>
                    {totalDocs} reviews found
                </h4>

                {reviewsList?.map((review,index) => (
                    <div key={review._id}>
                        <ReviewItem 
                            key={review._id}
                            username={usersList ? usersList[index] : ""}
                            rating={review.rating}
                            comment={review.comment}
                            date={review.createdAt}
                        ></ReviewItem>
                        <Divider component="div" sx={{marginBottom:"10px"}} />
                    </div>
                    
                ))}

                <Stack spacing={2} marginLeft={"20px"}>
                    <Pagination count={totalPages} variant="outlined" color="primary" size="large"
                        onChange={handlePagination} page={pageNumber}
                    />
                </Stack>
            </div>
            )
          )}
        </ReviewsCourseStyle>
    )
}

