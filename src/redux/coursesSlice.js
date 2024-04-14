import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courseData: {
      instructorId: null,
      name:null,
      description:null,
      price:0
    },
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
    }
  },
});

export const { setCoursePrice, setCourseData, setClickedCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
