import * as React from 'react';
import { useQuery } from 'react-query';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';

import { 
  MyCourseCardItemDescription, 
  MyCourseCardItemName, 
  CourseCardLoading
} from './myLearningStyle';
import { callApiGetUserById } from '../../api/user';
import { Link } from 'react-router-dom';

const getInstructor = async (userId) => {
  const instructor = await callApiGetUserById(userId);
  return instructor;
}

export default function CourseCard({ course }) {
  const { data, isLoading } = useQuery("instructor", () => getInstructor(course?.instructorId));
  const id = course?._id || ""
  
  const instructor = data;
  if(isLoading){
    return (
        <CourseCardLoading>
            <CircularProgress color="inherit" />
        </CourseCardLoading>
    );
  }
  
  return (
    <Link to={`/view-lecture?courseId=${id}`} style={{textDecoration: 'none'}}>
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          sx={{ width: 250, height: 140 }}
          image={course?.imageUrl}
          title={course?.name}
        />
        <CardContent sx={{
          height: 120,
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
                {course?.name}
            </MyCourseCardItemName>

          <MyCourseCardItemDescription>
              By {instructor ? instructor?.metadata?.fullName : ""}
          </MyCourseCardItemDescription>
        </div>
        </CardContent>
      </Card>
    </Link>
  );
}