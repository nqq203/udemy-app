import * as React from 'react';
import { useQuery } from 'react-query';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

import { 
  MyCourseCardItemDescription, 
  MyCourseCardItemName, 
  MyCourseRating,
  CourseCardLoading
} from './myLearningStyle';
import { callApiGetUserById } from '../../api/user';

const getInstructor = async (userId) => {
  const instructor = await callApiGetUserById(userId);
  return instructor;
}

export default function CourseCard({ course }) {
  const { data, isLoading } = useQuery("instructor", () => getInstructor(course.instructorId));
  const [value, setValue] = React.useState(null);
  
  const instructor = data;
  if(isLoading){
    return (
        <CourseCardLoading>
            <CircularProgress color="inherit" />
        </CourseCardLoading>
    );
  }
  
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
            By {instructor ? instructor.metadata.fullName : ""}
        </MyCourseCardItemDescription>

        <MyCourseRating>
          <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue);}}/>
          <MyCourseCardItemDescription>Leave a rating</MyCourseCardItemDescription>
        </MyCourseRating>
      </CardContent>
    </Card>
  );
}