import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

type State = {
  loading: boolean
  success: boolean
  error: string | null
  product: any
  products: any
}

type Actions = {
  type: string
  payload: any
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
  product: {},
  products: [],
}

export const productListReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return { ...state }
    default:
      return state
  }
}

export const productUpdateReducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { ...state, product: {} }
    default:
      return state
  }
}