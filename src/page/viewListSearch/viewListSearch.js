import {SearchResultContainer, FilterList,ViewListCourseStyle} from "./viewListSearchStyle.js"
import {Grid} from '@mui/material';


export default function ViewListCourse() {
  const courses = [
    {
      title: 'The Complete 2024 Web Development Bootcamp',
      author: 'Dr. Angela Yue',
      rating: 3.5,
      price: 1599000,
      image: '/imgs/courses/web.jpg',
      chipLabel: true,
      desc: 'Master web development with the latest technologies and frameworks. This comprehensive bootcamp covers everything from HTML and CSS to advanced JavaScript and backend development.',
      hours: 80
    },
    {
      title: 'Data Science and Machine Learning Masterclass',
      author: 'Prof. Michael Smith',
      rating: 4.2,
      price: 1899000,
      image: '/imgs/courses/react.png',
      chipLabel: false,
      desc: 'Become proficient in data science and machine learning. Learn how to analyze data, build predictive models, and deploy machine learning algorithms in real-world scenarios.',
      hours: 100
    },
    {
      title: 'iOS App Development: From Beginner to Expert',
      author: 'Emily Chen',
      rating: 4.6,
      price: 1799000,
      image: '/imgs/courses/kotlin.png',
      chipLabel: true,
      desc: 'Learn iOS app development from scratch. This course covers Swift programming language, UIKit framework, CoreData, and advanced iOS features.',
      hours: 90
    }
    // Add more courses here...
  ];
  

    return (
      <ViewListCourseStyle>
          <h1>
            10,000 results for “web”
          </h1>
          <Grid container spacing={2}>
                    
            <Grid item xs={3}>
                <h3>Filter</h3>
                <FilterList></FilterList>

            </Grid>
            <Grid item xs={9}>
                <SearchResultContainer courses={courses}></SearchResultContainer>
            </Grid>
        </Grid>
      </ViewListCourseStyle>

    )
}

