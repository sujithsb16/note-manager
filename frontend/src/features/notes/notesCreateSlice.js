import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const notesCreateSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    notesCreateReq: (state, action) => {
      state.loading = true;
    },
    notesCreateSuccess: (state, action) => {
      state.loading = false;
      state.note = action.payload;
      state.success = true;
    },
    notesCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default notesCreateSlice.reducer;
export const { notesCreateReq, notesCreateSuccess, notesCreateFail } =
  notesCreateSlice.actions;
