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
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants'
import { Dispatch } from 'redux'
import { client } from '../graphql/service/index'
import {
  GET_ALL_ORDERS,
  GET_MY_ORDERS,
  GET_ORDER,
} from '../graphql/queries/order/order-query'
import {
  CANCEL_ORDER,
  CREATE_ORDER,
  DELIVER_ORDER,
} from '../graphql/mutations/order/order.mutation'
import { ShippingAddress } from '../../../backend/graphql/types/shippingAddress.type'
import { CartItem } from '../types/cart.type'
import { Order } from '../types/order.type'

export type CreateOrderRequest = {
  type: typeof ORDER_CREATE_REQUEST
}

export type CreateOrderSuccess = {
  type: typeof ORDER_CREATE_SUCCESS
  payload: Order
}

export type CreateOrderFail = {
  type: typeof ORDER_CREATE_FAIL
  payload: string
}

export const createOrder =
  (items: CartItem, shippingAddress: ShippingAddress) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch<CreateOrderRequest>({
        type: ORDER_CREATE_REQUEST,
      })

      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input: { items, shippingAddress } },
      })

      dispatch<CreateOrderSuccess>({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch<CreateOrderFail>({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export type GetOrderDetailsRequest = {
  type: typeof ORDER_DETAILS_REQUEST
}

export type GetOrderDetailsSuccess = {
  type: typeof ORDER_DETAILS_SUCCESS
  payload: Order
}

export type GetOrderDetailsFail = {
  type: typeof ORDER_DETAILS_FAIL
  payload: string
}

export type GetOrderSuccessEmptyCart = {
  type: typeof CART_EMPTY
  payload: void
}

export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<GetOrderDetailsRequest>({
      type: ORDER_DETAILS_REQUEST,
    })

    const { data } = await client.query({
      query: GET_ORDER,
      variables: { input: { _id: id } },
    })

    dispatch<GetOrderDetailsSuccess>({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })

    dispatch<GetOrderSuccessEmptyCart>({
      type: CART_EMPTY,
      payload: localStorage.setItem('cartItems', JSON.stringify([])),
    })
  } catch (error) {
    dispatch<GetOrderDetailsFail>({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export type DeliverOrderRequest = {
  type: typeof ORDER_DELIVER_REQUEST
}

export type DeliverOrderSuccess = {
  type: typeof ORDER_DELIVER_SUCCESS
  payload: Order
}

export type DeliverOrderFail = {
  type: typeof ORDER_DELIVER_FAIL
  payload: string
}

export type DeliverOrderReset = {
  type: typeof ORDER_DELIVER_RESET
}

export const deliverOrder = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<DeliverOrderRequest>({
      type: ORDER_DELIVER_REQUEST,
    })

    const { data } = await client.mutate({
      mutation: DELIVER_ORDER,
      variables: { input: { _id: _id } },
    })

    dispatch<DeliverOrderSuccess>({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch<DeliverOrderFail>({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export type CancelledOrderRequest = {
  type: typeof ORDER_CANCELLED_REQUEST
}

export type CancelledOrderSuccess = {
  type: typeof ORDER_CANCELLED_SUCCESS
  payload: Order
}

export type CancelledOrderFail = {
  type: typeof ORDER_CANCELLED_FAIL
  payload: string
}

export type CancelledOrderReset = {
  type: typeof ORDER_CANCELLED_RESET
}

export const cancelledOrder = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch<CancelledOrderRequest>({
      type: ORDER_CANCELLED_REQUEST,
    })

    const { data } = await client.mutate({
      mutation: CANCEL_ORDER,
      variables: { input: { _id: _id } },
    })

    dispatch<CancelledOrderSuccess>({
      type: ORDER_CANCELLED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch<CancelledOrderFail>({
      type: ORDER_CANCELLED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export type ListMyOrdersRequest = {
  type: typeof ORDER_LIST_MY_REQUEST
}

export type ListMyOrdersSuccess = {
  type: typeof ORDER_LIST_MY_SUCCESS
  payload: Order[]
}

export type ListMyOrdersFail = {
  type: typeof ORDER_LIST_MY_FAIL
  payload: string
}

export const listMyOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch<ListMyOrdersRequest>({
      type: ORDER_LIST_MY_REQUEST,
    })

    const { data } = await client.query({
      query: GET_MY_ORDERS,
    })

    dispatch<ListMyOrdersSuccess>({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch<ListMyOrdersFail>({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export type ListOrdersRequest = {
  type: typeof ORDER_LIST_REQUEST
}

export type ListOrdersSuccess = {
  type: typeof ORDER_LIST_SUCCESS
  payload: Order[]
}

export type ListOrdersFail = {
  type: typeof ORDER_LIST_FAIL
  payload: string
}

export const listOrders = () => async (dispatch: Dispatch) => {
  try {
    dispatch<ListOrdersRequest>({
      type: ORDER_LIST_REQUEST,
    })

    const { data } = await client.query({
      query: GET_ALL_ORDERS,
    })

    dispatch<ListOrdersSuccess>({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch<ListOrdersFail>({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
