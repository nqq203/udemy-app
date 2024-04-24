import Modal from "@mui/material/Modal";
import ReviewCard from "./ReviewCard";
import { Button } from "../../components/Button/Button";
import { ReviewsWrapper } from "./CourseDetailStyle";
export default function ReviewSection({ reviewData }) {
  return (
    <div>
      <h2>Reviews</h2>
      <ReviewsWrapper>
        {reviewData.metadata.reviews.slice(0, 4).map((review, index) => {
          return (
            <ReviewCard
              review={review}
              reviewer={reviewData.metadata.users[index]}
            />
          );
        })}
      </ReviewsWrapper>
      <Button
        bgColor={"var(--color-white)"}
        fontWeight={"700"}
        color={"black"}
        border={"1px solid var(--color-gray-500)"}
        fontSize={"16px"}
        width={"100%"}
        fontFamily={"var(--font-stack-heading)"}
        hoverBgColor={"var(--color-gray-200)"}
      >Show more reviews</Button>
    </div>
  );
}
