
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MyLearningNavBar from "./myLearningNavbar";
import CourseCard from "./courseCard";
import { MyLearningHeadingContainer, MyLearningContainer } from "./myLearningStyle";
import { courses } from "../data/courses";
import { useEffect, useState } from 'react';

export default function MyCourses() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3030/order/order-by-user")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);

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