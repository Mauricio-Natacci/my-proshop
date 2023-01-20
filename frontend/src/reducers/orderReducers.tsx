import {
  ORDER_CANCELLED_FAIL,
  ORDER_CANCELLED_REQUEST,
  ORDER_CANCELLED_RESET,
  ORDER_CANCELLED_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'

type Action = {
  type: string
  payload: any
}

type State = {
  loading: boolean
  success: boolean
  error: string | null
  order: any
  orders: any
}

const initialStateOrderCreate: State = {
  loading: false,
  success: false,
  error: null,
  order: {},
  orders: [],
}

export const orderCreateReducer = (state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}


export const orderDetailsReducer = (
  state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDeliverReducer = (state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return { ...state }
    default:
      return state
  }
}

export const orderCancelledReducer = (state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_CANCELLED_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_CANCELLED_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case ORDER_CANCELLED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ORDER_CANCELLED_RESET:
      return { ...state }
    default:
      return state
  }
}

export const orderListMyReducer = (state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderListReducer = (state = initialStateOrderCreate, action: Action): State => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return { ...state }
  }
}