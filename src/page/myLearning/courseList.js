import { useQuery } from 'react-query';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import MyLearningNavBar from "./myLearningNavbar";
import CourseCard from "./courseCard";
import { MyLearningHeadingContainer, MyLearningContainer, MyCourseLoading } from "./myLearningStyle";
import { callApiGetUserCourses } from '../../api/course';

const getCourseDetails = async (courses) => {
  const courseDetails = await callApiGetUserCourses(courses);
  return courseDetails;
}

export default function CourseList(orders) {
  const { data, isLoading} = useQuery('courseDetails', () => getCourseDetails(orders));

  const courses = data;
  if(isLoading){
      return (
          <MyCourseLoading>
              <CircularProgress color="inherit" />
          </MyCourseLoading>
      );
  }
  const courseData = courses.metadata;

  return (
    <MyLearningContainer>
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

      <Stack justifyContent='center'>
        <Grid container my={8} px={24}>
          {courseData.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} mb={4} sx={{display: 'flex', justifyContent: 'center'}}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </MyLearningContainer>
  )
}