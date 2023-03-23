import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notes: [],
  error: null,
};

const notesListSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    notesListReq: (state, action) => {
      state.loading = true;
    },
    notesListSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    notesListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default notesListSlice.reducer;
export const {
  notesListReq,
  notesListSuccess,
  notesListFail,
} = notesListSlice.actions;
