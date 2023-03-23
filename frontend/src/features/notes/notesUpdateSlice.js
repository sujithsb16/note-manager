import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const notesUpdateSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    notesUpdateReq: (state, action) => {
      state.loading = true;
    },
    notesUpdateSuccess: (state, action) => {
      state.loading = false;
      state.note = action.payload;
      state.success = true;
    },
    notesUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export default notesUpdateSlice.reducer;
export const { notesUpdateReq, notesUpdateSuccess, notesUpdateFail } =
  notesUpdateSlice.actions;
