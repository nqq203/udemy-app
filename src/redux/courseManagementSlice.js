import { createSlice } from '@reduxjs/toolkit';

const courseManagementSlice = createSlice({
  name: 'courseManagement',
  initialState: {
    type: 'create',
  },
  reducers: {
    setCourseType: (state, {payload}) => {
      state.type = payload;
    }
  },
});

export const { setCourseType } = courseManagementSlice.actions;
export default courseManagementSlice.reducer;