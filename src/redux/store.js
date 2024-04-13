import { configureStore } from '@reduxjs/toolkit';
import coursesSlice from './coursesSlice';
import sectionsSlice from './sectionsSlice';
import lecturesSlice from './lecturesSlice';

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    sections: sectionsSlice,
    lectures: lecturesSlice,
  },
});
