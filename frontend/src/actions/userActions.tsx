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

export type Login = {
  type: typeof USER_LOGIN_REQUEST | typeof USER_LOGIN_SUCCESS | typeof USER_LOGIN_FAIL;
  payload: { email: string, password: string };
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<Login>({
      type: USER_LOGIN_REQUEST,
      payload: { email, password },
    })

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

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export type Logout = {
  type: typeof USER_LOGOUT;
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch<Logout>({ type: USER_LOGOUT })
}

export type Register = {
  type: typeof USER_REGISTER_REQUEST | typeof USER_REGISTER_SUCCESS | typeof USER_REGISTER_FAIL;
  payload?: { name: string, email: string, password: string };
};

export const register = (name: string, email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<Register>({
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

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

