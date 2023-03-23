import axios from "axios";
import {
  userLoginFail,
  userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../features/users/userLoginSlice";

import {
  userRegisterReq,
  userRegisterSuccess,
  userRegisterFail,
} from "../features/users/userRegisterSlice";
import {
  userUpdateReq,
  userUpdateSuccess,
  userUpdateFail,
} from "../features/users/userUpdateSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginReq());

    const { data } = await axios.post(
      `/api/users/login`,
      {
        email,
        password,
      },
      config
    );
    
    console.log(data)

    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userRegisterReq());

    const { data } = await axios.post(
      `/api/users/`,
      {
        name,
        email,
        password,
        pic,
      },
      config
    );
    // console.log(data);
    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userRegisterFail(errorIs));
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateReq());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/users/profile`, user, config);

    dispatch(userUpdateSuccess(data));

    dispatch(userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userUpdateFail(errorIs));
  }
};
