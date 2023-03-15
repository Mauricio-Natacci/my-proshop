import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_EMPTY,
} from '../constants/cartConstants'
import { Dispatch } from 'redux'
import { GET_PRODUCT } from '../graphql/queries/order/product-query'
import { client } from '../graphql/service'

export type CartItem = {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export type SaveShippingAddressProps = {
  address: string
  city: string
  postalCode: string
  country: string
}

type getStateProps = () => {
  cart: { cartItems: CartItem[] }
  shippingAddress: SaveShippingAddressProps
}

export type AddToCartAction = {
  type: typeof CART_ADD_ITEM
  payload: CartItem
}

export const addToCart =
  (id: string, quantity: number) =>
  async (dispatch: Dispatch, getState: getStateProps) => {
    const { data } = await client.query({
      query: GET_PRODUCT,
      variables: { id: { _id: id } },
    })

    // const { data } = await axios.get(`/api/products/${id}`)

    dispatch<AddToCartAction>({
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

export type RemoveFromCartAction = {
  type: typeof CART_REMOVE_ITEM
  payload: string
}

export const removeFromCart =
  (id: string) => (dispatch: Dispatch, getState: getStateProps) => {
    dispatch<RemoveFromCartAction>({
      type: CART_REMOVE_ITEM,
      payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export type SaveShippingAddressAction = {
  type: typeof CART_SAVE_SHIPPING_ADDRESS
  payload: SaveShippingAddressProps
}

export const saveShippingAddress =
  (data: SaveShippingAddressProps) => (dispatch: Dispatch) => {
    dispatch<SaveShippingAddressAction>({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }

export type EmptyCart = {
  type: typeof CART_EMPTY
}
