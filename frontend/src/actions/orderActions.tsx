import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
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
  ORDER_LIST_SUCCESS
} from '../constants/orderConstants'
import { Dispatch } from 'redux'
import { client } from '../graphql/service/index'
import {
  GET_ALL_ORDERS,
  GET_MY_ORDERS
} from '../graphql/queries/order/order-query'
import { ME } from '../graphql/mutations/user/user.mutation'

type createOrderProps = {
  orderItems: {
    name: string
    image: string
    price: number
    product: string
    quantity: number
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  itemsPrice: string
  totalPrice: string
}

type getStateProps = () => {
  userLogin: {
    userInfo: {
      login: {
        _id: string
        name: string
        email: string
        isAdmin: boolean
        token: string
      }
    }
  }
}

export type orderProps = {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    isAdmin: boolean
  }

  orderItems: {
    name: string
    image: string
    price: number
    product: string
    quantity: number
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  itemsPrice: string
  totalPrice: string
  isDelivered: boolean
}

export type CreateOrderRequest = {
  type: typeof ORDER_CREATE_REQUEST
}

export type CreateOrderSuccess = {
  type: typeof ORDER_CREATE_SUCCESS
  payload: orderProps
}

export type CreateOrderFail = {
  type: typeof ORDER_CREATE_FAIL
  payload: string
}

export const createOrder =
  (order: createOrderProps) =>
  async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<CreateOrderRequest>({
        type: ORDER_CREATE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.login.token}`
        }
      }

      const { data } = await axios.post(`/api/orders`, order, config)

      dispatch<CreateOrderSuccess>({
        type: ORDER_CREATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<CreateOrderFail>({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type GetOrderDetailsRequest = {
  type: typeof ORDER_DETAILS_REQUEST
}

export type GetOrderDetailsSuccess = {
  type: typeof ORDER_DETAILS_SUCCESS
  payload: orderProps
}

export type GetOrderDetailsFail = {
  type: typeof ORDER_DETAILS_FAIL
  payload: string
}

export type GetOrderSuccessEmptyCart = {
  type: typeof CART_EMPTY
  payload: void
}

export const getOrderDetails =
  (id: string) => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<GetOrderDetailsRequest>({
        type: ORDER_DETAILS_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.login.token}`
        }
      }

      const { data } = await axios.get(`/api/orders/${id}`, config)

      dispatch<GetOrderDetailsSuccess>({
        type: ORDER_DETAILS_SUCCESS,
        payload: data
      })

      dispatch<GetOrderSuccessEmptyCart>({
        type: CART_EMPTY,
        payload: localStorage.setItem('cartItems', JSON.stringify([]))
      })
    } catch (error) {
      dispatch<GetOrderDetailsFail>({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type DeliverOrderRequest = {
  type: typeof ORDER_DELIVER_REQUEST
}

export type DeliverOrderSuccess = {
  type: typeof ORDER_DELIVER_SUCCESS
  payload: orderProps
}

export type DeliverOrderFail = {
  type: typeof ORDER_DELIVER_FAIL
  payload: string
}

export type DeliverOrderReset = {
  type: typeof ORDER_DELIVER_RESET
}

export const deliverOrder =
  (order: orderProps) =>
  async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<DeliverOrderRequest>({
        type: ORDER_DELIVER_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: { Authorization: `Bearer ${userInfo.login.token}` }
      }

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      )

      dispatch<DeliverOrderSuccess>({
        type: ORDER_DELIVER_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<DeliverOrderFail>({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type CancelledOrderRequest = {
  type: typeof ORDER_CANCELLED_REQUEST
}

export type CancelledOrderSuccess = {
  type: typeof ORDER_CANCELLED_SUCCESS
  payload: orderProps
}

export type CancelledOrderFail = {
  type: typeof ORDER_CANCELLED_FAIL
  payload: string
}

export type CancelledOrderReset = {
  type: typeof ORDER_CANCELLED_RESET
}

export const cancelledOrder =
  (order: orderProps) =>
  async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<CancelledOrderRequest>({
        type: ORDER_CANCELLED_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: { Authorization: `Bearer ${userInfo.login.token}` }
      }

      const { data } = await axios.put(
        `/api/orders/${order._id}/cancelled`,
        {},
        config
      )

      dispatch<CancelledOrderSuccess>({
        type: ORDER_CANCELLED_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<CancelledOrderFail>({
        type: ORDER_CANCELLED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type ListMyOrdersRequest = {
  type: typeof ORDER_LIST_MY_REQUEST
}

export type ListMyOrdersSuccess = {
  type: typeof ORDER_LIST_MY_SUCCESS
  payload: orderProps[]
}

export type ListMyOrdersFail = {
  type: typeof ORDER_LIST_MY_FAIL
  payload: string
}

export const listMyOrders =
  () => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<ListMyOrdersRequest>({
        type: ORDER_LIST_MY_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const { data } = await client.query({
        query: GET_MY_ORDERS
      })

      //REST API
      // const config = {
      //   headers: { Authorization: `Bearer ${userInfo.login.token}` }
      // }
      // const { data } = await axios.get(`/api/orders/my-orders`, config)

      dispatch<ListMyOrdersSuccess>({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<ListMyOrdersFail>({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type ListOrdersRequest = {
  type: typeof ORDER_LIST_REQUEST
}

export type ListOrdersSuccess = {
  type: typeof ORDER_LIST_SUCCESS
  payload: orderProps[]
}

export type ListOrdersFail = {
  type: typeof ORDER_LIST_FAIL
  payload: string
}

export const listOrders =
  () => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<ListOrdersRequest>({
        type: ORDER_LIST_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const { data } = await client.query({
        query: GET_ALL_ORDERS
      })

      // REST API
      // const config = {
      //   headers: { Authorization: `Bearer ${userInfo.login.token}` }
      // }
      // const { data } = await axios.get(`/api/orders/all-orders`, config)

      dispatch<ListOrdersSuccess>({
        type: ORDER_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<ListOrdersFail>({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
