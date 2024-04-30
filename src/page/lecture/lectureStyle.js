import styled from "styled-components";
import { CustomRating } from "../../components/Rating/Rating";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Grid, Rating, TextField, Divider } from "@mui/material";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "react-query";
import { callApiCreateNote, callApiAddNote, callApiDeleteNote } from "../../api/note";
import { callApiCreateReview, callApiUpdateReview } from "../../api/review";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

export const ReviewOverlayStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* cursor: pointer; */
  z-index: 9;
`;

export const OverlayContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 10;
  padding: 30px;
  width: 500px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  .overlay-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .alignRight {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .cursorPointer {
    cursor: pointer;
  }
`;

export const ReviewOverlay = ({
  courseId,
  openOverlay,
  userReview,
  setUserReview,
}) => {
  const userId = localStorage.getItem("_id") || "";
  const [rating, setRating] = useState(userReview?.rating || 5);
  const [comments, setComments] = useState(userReview?.comment || "");
  const [isNewReview, setIsNewReview] = useState(userReview ? false : true);

  const idReview = userReview?._id || "";

  const closeOverlay = () => {
    openOverlay(false);
  };

  useEffect(() => {
    if (userReview) {
      userReview.rating = rating;
      userReview.comment = comments;
    }
  }, [rating, comments]);

  const createReviewMutation = useMutation(callApiCreateReview, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        // console.log("Create Success")
        setUserReview(data.metadata);
        setIsNewReview(false);
        openOverlay(false);
      } else {
        console.log("Error");
      }
    },
    onError: (error) => {
      console.error("Error creating data", error);
    },
  });

  const updateReviewMutation = useMutation(callApiUpdateReview, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        console.log("Update Success");
        // setIsNewReview(false)
        openOverlay(false);
      } else {
        console.log("Error");
      }
    },
    onError: (error) => {
      console.error("Error creating data", error);
    },
  });

  const addReview = () => {
    const review = {
      rating: rating,
      comment: comments,
      userId: userId,
      courseId: courseId,
    };
    createReviewMutation.mutate(review);
  };

  const updateReview = () => {
    const review = {
      _id: idReview,
      rating: rating,
      comment: comments,
      userId: userId,
      courseId: courseId,
    };
    updateReviewMutation.mutate(review);
  };

  return (
    <ReviewOverlayStyle>
      {isNewReview ? (
        <OverlayContainer>
          <div className="alignRight cursorPointer">
            <CloseIcon onClick={closeOverlay}></CloseIcon>
          </div>
          <h2>Why did you leave this rating?</h2>
          <Rating
            name="rating-course"
            size="large"
            value={rating}
            style={{ marginBottom: "40px" }}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />

          <TextField
            id="input-comments"
            label="Comments"
            color="grey"
            fullWidth={true}
            multiline
            rows={4}
            placeholder="Tell us about your own personal experience taking this course. Was this a good match for you?"
            style={{ marginBottom: "30px" }}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
          <div className="alignRight">
            <Button onClick={addReview} fontWeight="700">
              Leave a rating
            </Button>
          </div>
        </OverlayContainer>
      ) : (
        <OverlayContainer>
          <div className="alignRight cursorPointer">
            <CloseIcon onClick={closeOverlay}></CloseIcon>
          </div>
          <h2>Your review</h2>
          <Rating
            name="rating-course"
            size="large"
            value={rating}
            style={{ marginBottom: "40px" }}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />

          <TextField
            id="input-comments"
            label="Comments"
            color="grey"
            fullWidth={true}
            multiline
            rows={4}
            defaultValue={comments}
            style={{ marginBottom: "30px" }}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
          <div className="alignRight">
            <Button onClick={updateReview} fontWeight="700">
              Save and update
            </Button>
          </div>
        </OverlayContainer>
      )}
    </ReviewOverlayStyle>
  );
};

export const HeaderLectureStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .alignRight {
    justify-content: end;
    margin-right: 50px;
  }
`;

export const HeaderLecture = ({ courseName, openOverlay }) => {
  const openReview = (e) => {
    openOverlay(true);
  };

  return (
    <Grid
      container
      style={{
        backgroundColor: "var(--color-gray-400)",
        color: "white",
        BorderBottom: "0.5px solid white",
      }}
    >
      <Grid item xs={10}>
        <HeaderLectureStyle>
          <h3 style={{ fontWeight: 400 }}>{courseName}</h3>
        </HeaderLectureStyle>
      </Grid>
      <Grid item xs={2}>
        <HeaderLectureStyle>
          <Button border="1px solid white" padding="10px" onClick={openReview}>
            Reviews
          </Button>
        </HeaderLectureStyle>
      </Grid>
    </Grid>
  );
};

export const LectureOptionStyle = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  border-bottom: 1px solid var(--color-gray-200);
  margin: 0px 20px;
  margin-bottom: 20px;

  nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding-left: 10px;
  }

  nav ul li {
    width: auto;
    font-weight: 700;
    color: var(--color-gray-250);
    &:hover {
      cursor: pointer;
      color: var(--color-gray-600);
    }
  }

  .isClick {
    color: var(--color-gray-600);
    font-weight: 700;
  }
`;

export const LectureOptionContainerStyle = styled.div`
  margin: 20px 40px;
  min-height: 500px;

  .authorName {
    font-style: italic;
    color: var(--color-orange-500);
  }
`;

export const LectureOptionContainer = ({ content }) => {
  return <LectureOptionContainerStyle>{content}</LectureOptionContainerStyle>;
};

export const OverviewSection = (props) => {
  let course = props.course || undefined;
  let instructor = props.instructor || undefined;

  return course && instructor ? (
    <div>
      <h2>About this course</h2>
      <div>{course?.description}</div>

      <h2>Ratings</h2>
      <div>
        <CustomRating rates={course?.ratings}></CustomRating>
      </div>

      <h2>Instructor</h2>
      <h3 className="authorName">{instructor?.fullName}</h3>
      <ul>
        <li>
          Professional Android app developer with more than 10 years experience.
        </li>
        <li>
          Having a successful apps on playstore with over than +1,000,000
          downloads ( Check them on playstore: )
        </li>
        <li>Masters Degree in computer science</li>
        <li>Teaching in many local schools</li>
        <li>
          Having a big youtube channel helping many people to learn android app
          development and flutter.
        </li>
      </ul>
    </div>
  ) : (
    //Loading
    <></>
  );
};

export const ReviewItemStyle = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  margin-bottom: 15px;

  .review-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .custom-button-react {
    border: 1px solid var(--color-gray-400);
    width: 40px;
    height: 40px;
  }

  .reaction-contain {
    display: flex;
    gap: 7px;
  }
`;

export const ReviewItem = (props) => {
  const username = props.username || "";
  const rating = props.rating || 0;
  const comment = props.comment || "";
  const [btnDownStyle, setBtnDownStyle] = useState({});
  const [btnUpStyle, setBtnUpStyle] = useState({});
  const [content, setContent] = useState("Was this review helpful?");

  const handleClickThumbDownIcon = (e) => {
    if (btnDownStyle.background !== "var(--color-gray-400)") {
      if (btnUpStyle.background === "var(--color-gray-400)") {
        setBtnUpStyle({
          background: "transparent",
          color: "rgba(0, 0, 0, 0.54)",
        });
      }
      setBtnDownStyle({ background: "var(--color-gray-400)", color: "white" });
      setContent("Thank your for your feedbacks");
    } else {
      console.log("reset");
      setBtnDownStyle({
        background: "transparent",
        color: "rgba(0, 0, 0, 0.54)",
      });
      setContent("Was this review helpful?");
    }
  };

  const handleClickThumbUpIcon = (e) => {
    if (btnUpStyle.background !== "var(--color-gray-400)") {
      if (btnDownStyle.background === "var(--color-gray-400)") {
        setBtnDownStyle({
          background: "transparent",
          color: "rgba(0, 0, 0, 0.54)",
        });
      }
      setBtnUpStyle({ background: "var(--color-gray-400)", color: "white" });
      setContent("Thank your for your feedbacks");
    } else {
      console.log("reset");
      setBtnUpStyle({
        background: "transparent",
        color: "rgba(0, 0, 0, 0.54)",
      });
      setContent("Was this review helpful?");
    }
  };

  return (
    <ReviewItemStyle>
      <div>
        <Link to="/">
          <img
            src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
            style={{ width: "50px", marginRight: "15px", marginTop: "5px" }}
            alt="user-profile"
          />
        </Link>
      </div>
      <div className="review-content">
        <h4 style={{ margin: "0px 0px" }}>{username}</h4>
        <Rating name="rating" value={rating} readOnly size="small" />
        <div>{comment}</div>
        <h6 style={{ margin: "2px", fontWeight: "500" }}>{content}</h6>
        <div className="reaction-contain">
          <IconButton
            aria-label="Dislike"
            className="custom-button-react"
            onClick={handleClickThumbDownIcon}
            style={btnDownStyle}
          >
            <ThumbDownOffAltIcon />
          </IconButton>

          <IconButton
            aria-label="Like"
            className="custom-button-react"
            onClick={handleClickThumbUpIcon}
            style={btnUpStyle}
          >
            <ThumbUpOffAltIcon />
          </IconButton>
        </div>
      </div>
    </ReviewItemStyle>
  );
};

export const ReviewSectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;

  .removePaddingText {
    margin: 5px;
  }

  .fontLarge {
    font-size: 70px;
  }

  .flexbox-rating-overal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: fit-content;
    color: var(--color-orange-400);
    margin-bottom: 10px;
  }
`;

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "var(--color-orange-400)",
  },
});

export const ReviewSection = (props) => {
  // const [overalRating, setOveralRating] = useState(5)
  const usersList = props.dataReviews?.users || [];
  const reviewsData = props.dataReviews?.reviews || [];
  const ratings = props.courseRate || 0;

  return (
    <ReviewSectionStyle>
      <h2>Students feedbacks</h2>
      <div className="flexbox-rating-overal">
        <h1 className="removePaddingText fontLarge">{ratings}</h1>
        <StyledRating
          size="large"
          name="overalRating"
          value={ratings}
          readOnly
        />
        <h4 className="removePaddingText">Course Rating</h4>
      </div>
      <h2>Reviews</h2>

      {reviewsData?.map((review, index) => (
        <div key={review._id}>
          <ReviewItem
            key={review._id}
            username={usersList ? usersList[index] : ""}
            rating={review.rating}
            comment={review.comment}
          ></ReviewItem>
          <Divider component="div" sx={{ marginBottom: "10px" }} />
        </div>
      ))}
    </ReviewSectionStyle>
  );
};

export const CourseContentStyle = styled.div`
  border-bottom: 0.5px solid var(--color-gray-200);
  h3 {
    margin-left: 20px;
  }
`;

export const CourseContentContainer = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 96%;
  background-color: var(--color-gray-100);
  position: relative;
  max-height: 1000px;
`;

// Write here
export const NoteSectionStyle = styled.div`
  display: flex;
  padding: 0px 40px;
  flex-direction: column;
`;

export const NoteItemStyle = styled.div`
  & .note-content {
    resize: none;
    width: 100%;
    border: ${({ isEditing }) =>
      isEditing ? "1px solid var(--color-gray-400)" : "none"};
    background-color: ${({ isEditing }) =>
      isEditing ? "var(--color-white)" : "var(--color-gray-100)"};
    pointer-events: ${({ isEditing }) => (isEditing ? "auto" : "none")};
    font-family: var(--font-stack-text);
    font-size: 16px;
    padding: 10px;
  }

  & .note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  & .note-operation {
    display: flex;
  }
`;

export const NoteSection = ({ notes }) => {
  return (
    <NoteSectionStyle>
      <Button
        bgColor={"var(--color-white)"}
        hoverBgColor={"var(--color-gray-200)"}
        color={"var(--color-gray-500)"}
        border={"1px solid var(--color-gray-400)"}
        width={"100%"}
      >
        Add a new note
      </Button>
      <h3>Your notes</h3>
      {notes.map((note, index) => (
        <NoteItem
          key={index}
          time={note.createAt}
          content={note.content}
          id={note._id}
        ></NoteItem>
      ))}
    </NoteSectionStyle>
  );
};

export const NoteItem = ({ time, content, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalContent, setOriginalContent] = useState(content);
  const [currentContent, setCurrentContent] = useState(content);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const createNoteMutation = useMutation(callApiCreateNote, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error creating data", error);
    }
  })

  const updateNoteMutation = useMutation(callApiAddNote, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error updating data", error);
    }
  })

  const deleteNoteMutation = useMutation(callApiDeleteNote, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error deleting data", error);
    }
  })

  const handleSave = () => {
    setIsEditing(false);
    setOriginalContent(currentContent);
    updateNoteMutation.mutate({
      noteId: id,
      newContent: currentContent
    });
  };

  const handleDelete = () => {
    deleteNoteMutation.mutate(id);
  };

  const handleCancel = () => {
    setCurrentContent(originalContent);
    setIsEditing(false);
  };

  return (
    <NoteItemStyle isEditing={isEditing}>
      <div className="note-header">
        <div>{time}</div>
        <div className="note-operation">
          <div
            style={{
              marginRight: "10px",
            }}
          >
            <MdEdit onClick={handleEdit} size={20} />
          </div>

          <div>
            <MdDelete onClick={handleDelete} size={20} />
          </div>
        </div>
      </div>

      <div classname="note-content-section">
        <textarea
          name=""
          className="note-content"
          value={currentContent}
          readOnly={!isEditing}
          onChange={(e) => setCurrentContent(e.target.value)}
        ></textarea>
      </div>
      {isEditing ? (
        <div className="note-editing-operation">
          <Button
            bgColor={"var(--color-gray-150)"}
            color={"var(--color-gray-500)"}
            hoverBgColor={"var(--color-gray-200)"}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      ) : null}
    </NoteItemStyle>
  );
};
