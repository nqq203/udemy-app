import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signUp: false,
    message: '',
  },
  reducers: {
    setSignUpState: (state, {payload}) => {
      state.signUp = payload;
    },
    setMessage: (state, {payload}) => {
      state.message = payload;
    }
  },
});

export const { setSignUpState, setMessage } = authSlice.actions;
export default authSlice.reducer;