export type StateCart = {
  cart: {
    cartItems: any
    shippingAddress: any
    itemsPrice: string
    totalPrice: string
  }
}

export type UpdateItemQuantityCart = {
  productId: string
  value: number
}

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
