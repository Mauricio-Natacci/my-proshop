import { ShippingAddress } from './order.type'

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
    cartItems: CartItem[]
    shippingAddress: ShippingAddress
    totalPrice: string
  }
}

export type UpdateItemQuantityCart = {
  productId: string
  value: number
}

export type CartItem = {
  quantity: number
  name: string
  price: number
  image: string
  productId: string
}
