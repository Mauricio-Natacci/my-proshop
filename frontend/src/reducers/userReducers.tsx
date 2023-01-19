import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants"

type ActionProps = {
    type: string
    payload: any
}

export const userLoginReducer = (state = {}, action: ActionProps) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }