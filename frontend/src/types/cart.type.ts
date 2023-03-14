import { shippingAddress } from './order.type'
import { ProductItem } from './product.type'

export type CartScreenProps = {
  match: {
    params: {
      id: string
    }
  }
  location: {
    search: string
  }
  history: {
    push: (url: string) => void
  }
}

export type ShippingScreenProps = {
  history: {
    push(url: string): void
  }
}

export type StateCart = {
  cart: {
    cartItems: cartItem[]
    shippingAddress: shippingAddress
    itemsPrice: string
    totalPrice: string
  }
}

export type UpdateItemQuantityCart = {
  productId: string
  value: number
}

type cartItem = {
  quantity: number
  price: number
  productId: ProductItem
}
