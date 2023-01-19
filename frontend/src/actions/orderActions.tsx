import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
import {
  ORDER_CANCELLED_FAIL,
  ORDER_CANCELLED_REQUEST,
  ORDER_CANCELLED_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
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
import { Dispatch } from 'redux';


type createOrderProps = {
  orderItems: {
    name: string
    image: string
    price: number
    product: string
    qty: number
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  itemsPrice: any
  totalPrice: string
}

type getStateProps = () => {
  userLogin: {
    userInfo: {
      token: string
    }
  }
}

type orderProps = {
  _id: number
}


export const createOrder = (order: createOrderProps) => async (dispatch: Dispatch, getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id: number) => async (dispatch: Dispatch, getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })

    dispatch({ type: CART_EMPTY, payload: localStorage.removeItem('cartItem') })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deliverOrder = (order: orderProps) => async (dispatch: Dispatch, getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cancelledOrder = (order: orderProps) => async (dispatch: Dispatch , getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_CANCELLED_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/cancelled`,
      {},
      config
    )

    dispatch({
      type: ORDER_CANCELLED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CANCELLED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrders = () => async (dispatch: Dispatch, getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders = () => async (dispatch: Dispatch, getState: getStateProps) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }

    const { data } = await axios.get(`/api/orders/allorders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
