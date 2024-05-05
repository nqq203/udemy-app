import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MyLearningNavBar from "./myLearningNavbar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Rating } from "@mui/material";
import {
  WishlistItemContainer,
  MyCourseCardItemName,
  MyCourseCardItemDescription,
} from "./myLearningStyle";
import Button from "@mui/material/Button";

import {
  MyLearningHeadingContainer,
  MyLearningContainer,
} from "./myLearningStyle";
import { courses } from "../data/courses";
import { callApiGetWishlist, callApiRemoveWishListItem } from "../../api/user";
import { callApiCreateItemCart } from "../../api/cart";
import Notification from "../../components/Notification/Notification";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";

export default function MyWishList() {
  const [notification, setNotification] = useState({
    message: "",
    visible: false,
    bgColor: "green",
  });
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("_id");
  const { data: userWishlist, isLoading } = useQuery("wishlist", () =>
    callApiGetWishlist(userId), {
      onSuccess: (data) => {
        if (data.success)
          setWishlist(data.metadata)
      }
    }
  );
  if (!isLoading)
    return (
      <MyLearningContainer>
      <Notification
        message={notification.message}
        visible={notification.visible}
        bgColor={notification.bgColor}
        onClose={() =>
          setNotification({ message: "", visible: false, bgColor: "green" })
        }
      />
        <MyLearningHeadingContainer>
          <Typography
            variant="h3"
            fontWeight={800}
            fontFamily={"serif"}
            color="var(--color-white)"
            marginLeft={1}
            marginBottom={2}
          >
            My Learning
          </Typography>
          <MyLearningNavBar />
        </MyLearningHeadingContainer>

        <Stack justifyContent="center" my={8} px={{ xs: 8, sm: 16, md: 20 }}>
          <Grid container sx={{ gap: "10px" }}>
            {console.log(userWishlist)}
            {wishlist?.map((course, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                mb={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <WishlistItem course={course} setWishlist={setWishlist} setNoti={setNotification} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </MyLearningContainer>
    );
}

const WishlistItem = ({ course, setWishlist, setNoti }) => {
  

  const userId = localStorage.getItem("_id");

  const mutationRemoveWishlist = useMutation(
    "removeWishlist",
    ({ userId, courseId }) => callApiRemoveWishListItem(userId, courseId),
    {
      onSuccess: (data) => {
        if (data.success) {
          setNoti({
            message: data.message,
            visible: true,
            bgColor: "green",
          });
        } else {
          setNoti({
            message: data.message,
            visible: true,
            bgColor: "red",
          });
        }
      },
    }
  );

  const mutationAddToCart = useMutation(callApiCreateItemCart, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        setNoti({
          message: data.message,
          visible: true,
          bgColor: "green",
        });
      } else {
        setNoti({
          message: data.message,
          visible: true,
          bgColor: "red",
        });
      }
    },
  });

  const handleRemoveWishlist = () => {
    console.log("deleting: ", course._id);
    mutationRemoveWishlist.mutate({ userId: userId, courseId: course._id });
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== course._id));
  };

  const handleAddToCart = () => {
    mutationRemoveWishlist.mutate({ userId: userId, courseId: course._id });
    mutationAddToCart.mutate(course._id);
    
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== course._id));
  };

  return (
    <WishlistItemContainer>
      
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          sx={{ width: 250, height: 140 }}
          image={course?.imageUrl}
          title={course?.name}
        />
        <CardContent
          sx={{
            height: 120,
            paddingTop: 0,
            paddingBottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "space-between",
            "&:last-child": {
              paddingBottom: 1,
            },
          }}
        >
          <MyCourseCardItemName variant="h6" fontWeight={600}>
            {course?.name}
          </MyCourseCardItemName>
          <MyCourseCardItemDescription>
            {course?.instructorId.fullName}
          </MyCourseCardItemDescription>
          <div className="rating">
            <span
              style={{
                paddingRight: "10px",
              }}
            >
              {course.ratings}
            </span>
            <Rating value={course.ratings} readOnly></Rating>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleRemoveWishlist}>
            Remove
          </Button>
          <Button size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </WishlistItemContainer>
  );
};
