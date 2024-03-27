import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import { MyCourseCardItemDescription, MyCourseCardItemName, MyCourseRating } from './myLearningStyle';

export default function CourseCard({ course }) {
  const [value, setValue] = React.useState(null);

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/images/courses/reactnative.png"
        title={course.name}
      />
      <CardContent sx={{paddingTop: 0}}>
        <MyCourseCardItemName variant="h6" fontWeight={600}>
            {course.name}
        </MyCourseCardItemName>

        <MyCourseCardItemDescription>
            By {course.instructor}
        </MyCourseCardItemDescription>

        <MyCourseRating>
          <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue);}}/>
          <MyCourseCardItemDescription>Leave a rating</MyCourseCardItemDescription>
        </MyCourseRating>
      </CardContent>
    </Card>
  );
}