import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants'
import { Dispatch } from 'redux'
import { client } from '../graphql/service/index'
import { LOGIN, REGISTER } from '../graphql/mutations/user/user.mutation'
import { User } from '../types/user.type'

export type LoginRequest = {
  type: typeof USER_LOGIN_REQUEST
  payload: { email: string; password: string }
}

export type LoginSuccess = {
  type: typeof USER_LOGIN_SUCCESS
  payload: User
}

export type LoginFail = {
  type: typeof USER_LOGIN_FAIL
  payload: string | null
}

export const loginRequest = (
  email: string,
  password: string,
): LoginRequest => ({
  type: USER_LOGIN_REQUEST,
  payload: { email, password },
})

export const loginSuccess = (data: User): LoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
})

export const loginFail = (error: string): LoginFail => ({
  type: USER_LOGIN_FAIL,
  payload: error,
})

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest(email, password))

      const { data } = await client.mutate({
        mutation: LOGIN,
        variables: { input: { email, password } },
        context: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      })

      dispatch(loginSuccess(data))

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch(
        loginFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        ),
      )
    }
  }

export type Logout = {
  type: typeof USER_LOGOUT
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch<Logout>({ type: USER_LOGOUT })
}

export type RegisterRequest = {
  type: typeof USER_REGISTER_REQUEST
  payload?: { name: string; email: string; password: string }
}

export type RegisterSuccess = {
  type: typeof USER_REGISTER_SUCCESS
  payload: User
}

export type RegisterFail = {
  type: typeof USER_REGISTER_FAIL
  payload: string | null
}

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch<RegisterRequest>({
        type: USER_REGISTER_REQUEST,
      })

      const { data } = await client.mutate({
        mutation: REGISTER,
        variables: { input: { name, email, password } },
        context: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      })

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
