import { createSlice } from "@reduxjs/toolkit";

const lecturesSlice = createSlice({
  name: "lectures",
  initialState: {
    lectures: []
  },
  reducers: {
    setLecturesData: (state, {payload}) => {
      state.lectures = [...payload];
    }
  },
});

export const { setLecturesData } = lecturesSlice.actions;

export default lecturesSlice.reducer;