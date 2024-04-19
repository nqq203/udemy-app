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
        sx={{ width: 250, height: 140 }}
        image={course.imageUrl}
        title={course.name}
      />
      <CardContent sx={{
        height: 160,
        paddingTop: 0, 
        paddingBottom: 0,
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignItems: 'space-between',
        "&:last-child": {
          paddingBottom: 1
        }
      }}>
        <div>
          <MyCourseCardItemName variant="h6" fontWeight={600}>
              {course.name}
          </MyCourseCardItemName>

          <MyCourseCardItemDescription>
              By {instructor ? instructor.metadata?.fullName : ""}
          </MyCourseCardItemDescription>
        </div>

        <MyCourseRating>
          <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue);}}/>
          <MyCourseCardItemDescription>Leave a rating</MyCourseCardItemDescription>
        </MyCourseRating>
      </CardContent>
    </Card>
  );
}