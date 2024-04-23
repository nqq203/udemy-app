import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Rating from "@mui/material/Rating";

export default function ReviewCard({ review, reviewer }) {
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
      <CardContent>{review.comment}</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* TODO: add the action */}
          <ThumbDownOffAltIcon />
        </IconButton>
        <IconButton>
          {/* TODO: add the action */}
          <ThumbUpOffAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
