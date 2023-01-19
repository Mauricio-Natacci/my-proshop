import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

type ActionProps = {
  type: string
  payload: any
}

type xProps = {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}


export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action: ActionProps
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem: any = state.cartItems.find(
        (x: xProps) => x.productId === item.productId
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: xProps) =>
            x.productId === existItem.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: xProps) => x.productId !== action.payload
        ),
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_EMPTY:
      return { cartItems: [] }
    default:
      return state
  }
}
