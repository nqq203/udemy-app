import { createSlice } from "@reduxjs/toolkit";

const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    files: [],
    fullSection: [],
  },
  reducers: {
    setSectionsData: (state, {payload}) => {
      console.log(payload);
      state.sections = [...payload];
    },
    setFilesData: (state, {payload}) => {
      state.files = [...payload];
    },
    setSectionsIncludeLectures: (state, {payload}) => {
      state.fullSection = [...payload];
    }
  },
});

export const { setSectionsData, setFilesData, setSectionsIncludeLectures } = sectionsSlice.actions;

export default sectionsSlice.reducer;