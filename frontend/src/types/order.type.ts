export type Order = {
  _id: string
  buyer: Buyer
  orderItems: OrderItem[]
  shippingAddress: shippingAddress
  createdAt: string
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  updatedAt: string
}

type Buyer = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

type OrderItem = {
  name: string
  quantity: number
  image: string
  price: number
  product: string
}

type shippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
}

export type AllOrdersScreenProps = {
  history: {
    push: (url: string) => void
  }
}
