import { createSlice } from '@reduxjs/toolkit';

const instructorPageSlice = createSlice({
  name: 'instructorPage',
  initialState: {
    page: 1,
  },
  reducers: {
    setInstructorPage: (state, {payload}) => {
      state.page = payload;
    },
  },
});

export const { setInstructorPage } = instructorPageSlice.actions;
export default instructorPageSlice.reducer;