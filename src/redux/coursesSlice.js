import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseData: {
      instructorId: null,
      name:null,
      description:null,
      price:0,
      publish: false
    },
    courseId: null,
  },
  courseId: null,
  reducers: {
    setCourseData: (state, {payload}) => {
      state.courseData = {...payload };
    },
    setCoursePrice: (state, {payload}) => {
      console.log(payload);
      state.courseData = {...state.courseData, price: payload};
    },
    setClickedCourse: (state, {payload}) => {
      state.courseId = payload;
    },
    setPublishedCourse: (state, {payload}) => {
      state.courseData.publish = payload; 
    }
  },
});

export const { setCoursePrice, setCourseData, setClickedCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
