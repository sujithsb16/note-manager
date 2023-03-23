import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const notesDeleteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    notesDeleteReq: (state, action) => {
      state.loading = true;
    },
    notesDeleteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    notesDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default notesDeleteSlice.reducer;
export const { notesDeleteReq, notesDeleteSuccess, notesDeleteFail } =
  notesDeleteSlice.actions;
