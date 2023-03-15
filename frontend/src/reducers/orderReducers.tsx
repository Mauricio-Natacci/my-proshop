import {
  CreateOrderRequest,
  CreateOrderSuccess,
  CreateOrderFail,
  GetOrderDetailsRequest,
  GetOrderDetailsSuccess,
  GetOrderDetailsFail,
  GetOrderSuccessEmptyCart,
  DeliverOrderRequest,
  DeliverOrderSuccess,
  DeliverOrderFail,
  DeliverOrderReset,
  CancelledOrderRequest,
  CancelledOrderSuccess,
  CancelledOrderFail,
  CancelledOrderReset,
  ListMyOrdersRequest,
  ListMyOrdersSuccess,
  ListMyOrdersFail,
  ListOrdersRequest,
  ListOrdersSuccess,
  ListOrdersFail,
} from '../actions/orderActions'
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
import { Order } from '../types/order.type'

type Action =
  | CreateOrderRequest
  | CreateOrderSuccess
  | CreateOrderFail
  | GetOrderDetailsRequest
  | GetOrderDetailsSuccess
  | GetOrderDetailsFail
  | GetOrderSuccessEmptyCart
  | DeliverOrderRequest
  | DeliverOrderSuccess
  | DeliverOrderFail
  | DeliverOrderReset
  | CancelledOrderRequest
  | CancelledOrderSuccess
  | CancelledOrderFail
  | CancelledOrderReset
  | ListMyOrdersRequest
  | ListMyOrdersSuccess
  | ListMyOrdersFail
  | ListOrdersRequest
  | ListOrdersSuccess
  | ListOrdersFail

type State = {
  loading: boolean
  success: boolean
  error: string | null
  order: {
    _id: string
    buyer: {
      _id: string
      name: string
      email: string
      isAdmin: boolean
    }
    orderItems: any[]
    shippingAddress: {
      address: string
      city: string
      postalCode: string
      country: string
    }
  }
  orders: Order[]
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
  order: {
    _id: '',
    buyer: {
      _id: '',
      name: '',
      email: '',
      isAdmin: false,
    },
    orderItems: [],
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  },
  orders: [],
}

export const orderCreateReducer = (
  state = initialState,
  action: Action,
): State => {
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
      return state
  }
}

export const orderDetailsReducer = (
  state = initialState,
  action: Action,
): State => {
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

export const orderDeliverReducer = (
  state = initialState,
  action: Action,
): State => {
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
      return { ...state, success: false, loading: false }
    default:
      return state
  }
}

export const orderCancelledReducer = (
  state = initialState,
  action: Action,
): State => {
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
      return { ...state, success: false, loading: false }
    default:
      return state
  }
}

export const orderListMyReducer = (
  state = initialState,
  action: Action,
): State => {
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

export const orderListReducer = (
  state = initialState,
  action: Action,
): State => {
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
      return state
  }
}
