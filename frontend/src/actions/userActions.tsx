import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'
import { Dispatch } from 'redux';

export type LoginRequest = {
  type: typeof USER_LOGIN_REQUEST
  payload: { email: string, password: string }
};

export type LoginSuccess = {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserInfo;
};

export type LoginFail = {
  type: typeof USER_LOGIN_FAIL;
  payload: string | null;
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export const loginRequest = (email: string, password: string): LoginRequest => ({
  type: USER_LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (data: UserInfo): LoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = (error: string): LoginFail => ({
  type: USER_LOGIN_FAIL,
  payload: error,
});

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {

    dispatch(loginRequest(email, password))

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch(loginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data));


  } catch (error) {
    dispatch(loginFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ))
  }
}

export type Logout = {
  type: typeof USER_LOGOUT;
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch<Logout>({ type: USER_LOGOUT })
}

export type RegisterRequest = {
  type: typeof USER_REGISTER_REQUEST;
  payload?: { name: string, email: string, password: string };
};

export type RegisterSuccess = {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserInfo;
};

export type RegisterFail = {
  type: typeof USER_REGISTER_FAIL;
  payload: string | null;
};


export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<RegisterRequest>({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch<RegisterSuccess>({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch<RegisterFail>({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

