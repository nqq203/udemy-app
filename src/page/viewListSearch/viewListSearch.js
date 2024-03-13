import {CourseItem} from "./viewListSearchStyle.js"



export default function ViewListCourse() {
    const courses = [
        {
          title: 'The Complete 2024 Web Development Bootcamp',
          author: 'Dr. Angela Yue',
          rating: 3.5,
          price: 1599000,
          image: '/imgs/courses/web.jpg',
          chipLabel: true,
        },
        {
          title: 'The Complete 2024 Mobile Development Bootcamp',
          author: 'Dr. John Doe',
          rating: 4.2,
          price: 1899000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 Data Science Bootcamp',
          author: 'Dr. Jane Smith',
          rating: 4.5,
          price: 2199000,
          image: '/imgs/courses/kotlin.png',
          chipLabel: true,
        },
        {
          title: 'The Complete 2024 UI/UX Design Bootcamp',
          author: 'Dr. Bob Johnson',
          rating: 4.7,
          price: 1999000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 UI/UX Design Bootcamp',
          author: 'Dr. Bob Johnson',
          rating: 4.7,
          price: 2999000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 Mobile Development Bootcamp',
          author: 'Dr. John Doe',
          rating: 4.2,
          price: 1899000,
          image: '/imgs/courses/kotlin.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 Mobile Development Bootcamp',
          author: 'Dr. John Doe',
          rating: 4.2,
          price: 1899000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 Data Science Bootcamp',
          author: 'Dr. Jane Smith',
          rating: 4.5,
          price: 2199000,
          image: '/imgs/courses/kotlin.png',
          chipLabel: true,
        },
        {
          title: 'The Complete 2024 Mobile Development Bootcamp',
          author: 'Dr. John Doe',
          rating: 4.2,
          price: 1899000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
        {
          title: 'The Complete 2024 Data Science Bootcamp',
          author: 'Dr. Jane Smith',
          rating: 4.5,
          price: 2199000,
          image: '/imgs/courses/kotlin.png',
          chipLabel: true,
        },
        {
          title: 'The Complete 2024 Mobile Development Bootcamp',
          author: 'Dr. John Doe',
          rating: 4.2,
          price: 1899000,
          image: '/imgs/courses/react.png',
          chipLabel: false,
        },
      ];

    return (
        <CourseItem {...courses[0]}></CourseItem>
    )

}