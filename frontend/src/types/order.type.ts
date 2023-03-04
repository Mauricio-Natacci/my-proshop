export type Order = {
  updatedAt: any
  _id: string
  buyer: {
    _id: string
    name: string
    email: string
    isAdmin: boolean
  }
  orderItems: {
    name: string
    qty: number
    image: string
    price: number
    product: string
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: string
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
}

export type AllOrdersScreenProps = {
  history: {
    push: (url: string) => void
  }
}
