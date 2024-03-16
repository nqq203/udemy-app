import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import MyLearningNavBar from "./myLearningNavbar";
import CourseCard from "./courseCard";
import { MyLearningHeadingContainer, MyLearningContainer } from "./myLearningStyle";
import { courses } from "../data/courses";

export default function MyArchived() {
    return (
      <MyLearningContainer>
        <MyLearningHeadingContainer>
            <h1>My Learning</h1>
            <MyLearningNavBar />
        </MyLearningHeadingContainer>

        <Stack justifyContent='center'>
          <Grid container my={8} px={24}>
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} mb={4} sx={{display: 'flex', justifyContent: 'center'}}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        
      </MyLearningContainer>
    )
}