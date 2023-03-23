import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const userDeleteSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    userDeleteReq: (state, action) => {
      state.loading = true;
    },
    userDeleteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    userDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default userDeleteSlice.reducer;
export const {
  userDeleteReq,
  userDeleteSuccess,
  userDeleteFail,
} = userDeleteSlice.actions;
