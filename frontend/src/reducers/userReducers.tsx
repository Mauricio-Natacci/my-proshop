import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "../constants/userConstants"
import { Login, Logout, Register, UserInfo } from "../actions/userActions"


type Action = {
  type: any
  payload: any
}

type StateProps = {
  loading: boolean
  userInfo: UserInfo | null
  error: string | null
}

const initialState: StateProps = {
  loading: false,
  userInfo: null,
  error: null
}

export const userLoginReducer = (state = initialState, action: Action): StateProps => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_LOGOUT:
      return { ...state, userInfo: null }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}