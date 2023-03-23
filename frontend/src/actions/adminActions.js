import {
  usersListReq,
  usersListSuccess,
  usersListFail,
} from "../features/admin/usersListSlice";

import {
  userDeleteReq,
  userDeleteSuccess,
  userDeleteFail,
} from "../features/admin/userDeleteSlice";

import {
  usersUpdateReq,
  usersUpdateSuccess,
  usersUpdateFail,
} from "../features/admin/usersUpdateSlice";

import {
  userBlockReq,
  userBlockSuccess,
  userBlockFail,
} from "../features/admin/userBlockSlice";

import axios from "axios";

export const listusers = () => async (dispatch, getState) => {
  try {
    dispatch(usersListReq());

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin`, config);
    console.log(data);

    dispatch(usersListSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(usersListFail(message));
  }
};

export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/admin/${id}`, config);

    dispatch(userDeleteSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userDeleteFail(message));
  }
};

export const updateUserAction = (user) => async (dispatch, getState) => {
  try {
    dispatch(usersUpdateReq());

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
      `/api/admin/${user.id}`,
      user,
      config
    );

    dispatch(usersUpdateSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(usersUpdateFail(message));
  }
};

export const blockUserAction = (id, status) => async (dispatch, getState) => {
  try {
    dispatch(userBlockReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const sendStatus = {
      blocked: status,
    };

    const { data } = await axios.patch(
      `/api/admin/${id}`,
      sendStatus,
      config
    );

    dispatch(userBlockSuccess(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userBlockFail(message));
  }
};
