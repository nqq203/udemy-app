import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Rating from "@mui/material/Rating";
import { useState } from "react";

export default function ReviewCard({ review, reviewer }) {
  const [btnDownStyle, setBtnDownStyle] = useState(<ThumbDownOffAltIcon id="down-empty"></ThumbDownOffAltIcon>);
  const [btnUpStyle, setBtnUpStyle] = useState(<ThumbUpOffAltIcon id="up-empty"></ThumbUpOffAltIcon>);

  const handleClickThumbDownIcon = (e) => {
    console.log(btnDownStyle.props.id)
    if (btnDownStyle.props.id !== "down-fill") {
      if (btnUpStyle.props.id === "up-fill") {
        setBtnUpStyle(<ThumbUpOffAltIcon id="down-empty"></ThumbUpOffAltIcon>);
      }
      setBtnDownStyle(<ThumbDownAltIcon id="down-fill"></ThumbDownAltIcon>);
    } else {
      setBtnDownStyle(<ThumbDownOffAltIcon id="down-empty"></ThumbDownOffAltIcon>);
    }
  };

  const handleClickThumbUpIcon = (e) => {
    if (btnUpStyle.props.id !== "up-fill") {
      if (btnDownStyle.props.id === "down-fill") {
        setBtnDownStyle(<ThumbDownOffAltIcon id="up-empty"></ThumbDownOffAltIcon>);
      }
      setBtnUpStyle(<ThumbUpAltIcon id="up-fill"></ThumbUpAltIcon>);
    } else {
      setBtnUpStyle(<ThumbUpOffAltIcon id="up-empty"></ThumbUpOffAltIcon>);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 320,
        maxHeight: 270,
        border: 0,
        borderTop: 1,
        boxShadow: 0,
        borderColor: "var(--color-gray-250)",
        borderRadius: 0,
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "var(--color-gray-300)" }}>{reviewer[0]}</Avatar>}
        title={
          <span
            style={{
              fontWeight: "bold",
              fontFamily: `var(--font-stack-heading)`,
              fontSize: '15px'
            }}
          >
            {reviewer}
          </span>
        }
        subheader={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Rating
              size="small"
              value={review.rating}
              readOnly
              className="rating"
            ></Rating>
          </div>
        }
      ></CardHeader>
      <CardContent sx={{padding:"8px 16px"}}>{review.comment}</CardContent>

        <CardActions disableSpacing sx={{padding:'0px 16px'}}>
          <h5 style={{fontWeight:400}}>Helpful? </h5>
          <IconButton
            aria-label="Dislike"
            onClick={handleClickThumbDownIcon}
          >
            {btnDownStyle}
          </IconButton>

          <IconButton
            aria-label="Like"
            onClick={handleClickThumbUpIcon}
          >
            {btnUpStyle}
          </IconButton>
        </CardActions>

    </Card>
  );
}
