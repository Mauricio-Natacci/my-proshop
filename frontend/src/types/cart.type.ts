export type stateCart = {
  cart: {
    cartItems: {
      productId: string
      name: string
      image: string
      price: number
      quantity: number
    }[]
  }
}

export type updateItemQuantityCart = {
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
