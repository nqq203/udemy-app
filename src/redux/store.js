import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './coursesSlice';
import sectionsSlice from './sectionsSlice';
import lecturesSlice from './lecturesSlice';
import courseManagementSlice from './courseManagementSlice';
import authSlice from './authSlice';
import instructorPageSlice from './instructorPageSlice';

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    sections: sectionsSlice,
    lectures: lecturesSlice,
    courseManagement: courseManagementSlice,
    auth: authSlice,
    instructorPage: instructorPageSlice
  },
});