import Modal from "@mui/material/Modal";
import ReviewCard from "./ReviewCard";
import { Button } from "../../components/Button/Button";
import { ReviewsWrapper } from "./CourseDetailStyle";
import { useState,useEffect } from "react";

export default function ReviewSection({ reviewData }) {
  const usersList = reviewData?.metadata?.users || [];
  const reviewsData = reviewData?.metadata?.reviews;
  const pageSize = 4;

  const [numberOfReviews,setNumberOfReviews] = useState(pageSize);
  const [reviewsPagination, setReviewsPagination] = useState(reviewsData?.slice(0,numberOfReviews))
  const [hasMoreReviews,setHasMoreReviews] = useState(reviewsData?.length <= 4 ? false : true)

  useEffect(()=>{
    setReviewsPagination(reviewsData?.slice(0,numberOfReviews))
},[numberOfReviews,reviewsData])

const handleLoadMore = () => {
    if(numberOfReviews <= reviewsData?.length){
        setNumberOfReviews(numberOfReviews + pageSize)
    } 
    if(numberOfReviews + pageSize > reviewsData?.length){
        setHasMoreReviews(false)
    }
}
  return (
    <div>
      <h2>Reviews</h2>
      <ReviewsWrapper>
        {reviewsPagination?.map((review, index) => {
          return (
            <ReviewCard
              review={review}
              reviewer={usersList[index]}
            />
          );
        })}
        
        {reviewsData?.length === 0 ? (
          <span>No reviews found</span>
        ) : null}
      </ReviewsWrapper>
      {hasMoreReviews? (
        <Button
          bgColor={"var(--color-white)"}
          fontWeight={"700"}
          color={"black"}
          border={"1px solid var(--color-gray-500)"}
          fontSize={"16px"}
          width={"100%"}
          fontFamily={"var(--font-stack-heading)"}
          hoverBgColor={"var(--color-gray-200)"}
          onClick={handleLoadMore}
          margin={"40px 0px"}
        >Show more reviews</Button>) : null
      }
    </div>
  );
}
