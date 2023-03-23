import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const usersUpdateSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    usersUpdateReq: (state, action) => {
      console.log(true);
      state.loading = true;
    },
    usersUpdateSuccess: (state, action) => {
      console.log(false);
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    usersUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default usersUpdateSlice.reducer;
export const {
  usersUpdateReq,
  usersUpdateSuccess,
  usersUpdateFail,
} = usersUpdateSlice.actions;
