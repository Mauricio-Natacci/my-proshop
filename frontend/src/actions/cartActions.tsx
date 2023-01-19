import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'
import { Dispatch } from 'redux';


type CartItem = {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

type saveShippingAddressProps = {
  address: string
  city: string
  postalCode: string
  country: string
}

type getStateProps = () => { cart: { cartItems: CartItem[] } }

export const addToCart = (id: string, quantity: number) => async (dispatch: Dispatch, getState: getStateProps) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      quantity,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id: number) => (dispatch: Dispatch, getState: getStateProps) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data: saveShippingAddressProps) => (dispatch: Dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
