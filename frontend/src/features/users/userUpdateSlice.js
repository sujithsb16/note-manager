import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userUpdateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdateReq: (state, action) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    userUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default userUpdateSlice.reducer;
export const {
  userUpdateReq,
  userUpdateSuccess,
  userUpdateFail,
} = userUpdateSlice.actions;
