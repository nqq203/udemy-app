import { createSlice } from '@reduxjs/toolkit';

const instructorPageSlice = createSlice({
  name: 'instructorPage',
  initialState: {
    page: null,
  },
  reducers: {
    setInstructorPage: (state, {payload}) => {
      state.signUp = payload;
    },
  },
});

export const { setInstructorPage } = instructorPageSlice.actions;
export default instructorPageSlice.reducer;