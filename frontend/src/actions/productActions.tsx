import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET
} from '../constants/productConstants'
import { Dispatch } from 'redux'
import { client } from '../graphql/service/index'
import { GET_ALL_PRODUCTS } from '../graphql/queries/product-query'

type Product = {
  _id: string
  name: string
  image: string
  description: string
  price: number
}

export type ProductListRequest = { type: typeof PRODUCT_LIST_REQUEST }
export type ProductListSuccess = {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: Product[]
}
export type ProductListFail = {
  type: typeof PRODUCT_LIST_FAIL
  payload: string
}

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch<ProductListRequest>({ type: PRODUCT_LIST_REQUEST })

    const { data } = await client.query({
      query: GET_ALL_PRODUCTS
    })

    // REST API
    // const { data } = await axios.get('/api/products')

    dispatch<ProductListSuccess>({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch<ProductListFail>({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export type ProductDetailsRequest = { type: typeof PRODUCT_DETAILS_REQUEST }
export type ProductDetailsSuccess = {
  type: typeof PRODUCT_DETAILS_SUCCESS
  payload: Product
}
export type ProductDetailsFail = {
  type: typeof PRODUCT_DETAILS_FAIL
  payload: string
}

export const listProductDetails =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      dispatch<ProductDetailsRequest>({ type: PRODUCT_DETAILS_REQUEST })

      const { data } = await axios.get(`/api/products/${id}`)

      dispatch<ProductDetailsSuccess>({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<ProductDetailsFail>({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

type TypeUserInfo = { token: string }
type getStateProps = () => { userLogin: { userInfo: TypeUserInfo } }

export type ProductDeleteRequest = { type: typeof PRODUCT_DELETE_REQUEST }
export type ProductDeleteSuccess = { type: typeof PRODUCT_DELETE_SUCCESS }
export type ProductDeleteFail = {
  type: typeof PRODUCT_DELETE_FAIL
  payload: string
}

export const deleteProduct =
  (id: string) => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<ProductDeleteRequest>({
        type: PRODUCT_DELETE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }

      await axios.delete(`/api/products/${id}`, config)

      dispatch<ProductDeleteSuccess>({
        type: PRODUCT_DELETE_SUCCESS
      })
    } catch (error) {
      dispatch<ProductDeleteFail>({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type ProductCreateRequest = { type: typeof PRODUCT_CREATE_REQUEST }
export type ProductCreateSuccess = {
  type: typeof PRODUCT_CREATE_SUCCESS
  payload: Product
}
export type ProductCreateFail = {
  type: typeof PRODUCT_CREATE_FAIL
  payload: string
}
export type ProductCreateReset = { type: typeof PRODUCT_CREATE_RESET }

export const createProduct =
  () => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<ProductCreateRequest>({
        type: PRODUCT_CREATE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }

      const { data } = await axios.post(`/api/products`, {}, config)

      dispatch<ProductCreateSuccess>({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<ProductCreateFail>({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export type ProductUpdateRequest = { type: typeof PRODUCT_UPDATE_REQUEST }
export type ProductUpdateSuccess = {
  type: typeof PRODUCT_UPDATE_SUCCESS
  payload: Product
}
export type ProductUpdateFail = {
  type: typeof PRODUCT_UPDATE_FAIL
  payload: string
}
export type ProductUpdateReset = { type: typeof PRODUCT_UPDATE_RESET }

export const updateProduct =
  (product: Product) => async (dispatch: Dispatch, getState: getStateProps) => {
    try {
      dispatch<ProductUpdateRequest>({
        type: PRODUCT_UPDATE_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        'Content-Type': 'application/json',
        headers: { Authorization: `Bearer ${userInfo.token}` }
      }

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      )

      dispatch<ProductUpdateSuccess>({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch<ProductUpdateFail>({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
