import {
  notesListReq,
  notesListSuccess,
  notesListFail,
} from "../features/notes/notesListSlice";
import {
  notesCreateReq,
  notesCreateSuccess,
  notesCreateFail,
} from "../features/notes/notesCreateSlice";
import {
  notesUpdateReq,
  notesUpdateSuccess,
  notesUpdateFail,
} from "../features/notes/notesUpdateSlice";
import {
  notesDeleteReq,
  notesDeleteSuccess,
  notesDeleteFail,
} from "../features/notes/notesDeleteSlice";

import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch(notesListReq());

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/notes`, config);
    console.log(data);

    dispatch(notesListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(notesListFail(message));
  }
};

export const createNoteAction = (title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(notesCreateReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/notes/create`,
      { title, content, category },
      config
    );

    dispatch(notesCreateSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(notesCreateFail(message));
  }
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(notesDeleteReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config);

    dispatch(notesDeleteSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(notesDeleteFail(message));
  }
};

export const updateNoteAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(notesUpdateReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/notes/${id}`,
      { title, content, category },
      config
    );

    dispatch(notesUpdateSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(notesUpdateFail(message));
  }
};
