import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "../constants/userConstants"

type UserInfo = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
}

type ActionProps = {
  type: string
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

export const userLoginReducer = (state = initialState, action: ActionProps): StateProps => {
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