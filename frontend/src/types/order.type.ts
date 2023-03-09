import { User } from './user.type'

export type Order = {
  _id: string
  buyer: User
  orderItems: OrderItem[]
  shippingAddress: shippingAddress
  createdAt: string
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  updatedAt: string
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

export type OrdersScreenProps = {
  history: {
    push: (url: string) => void
  }
}

export type StateOrderList = {
  orderList: {
    loading: boolean
    error: string
    orders: {
      getAllOrders: Order[]
    }
  }
}

export type StateOrderListMy = {
  orderListMy: {
    loading: boolean
    error: string
    orders: {
      getMyOrders: Order[]
    }
  }
  userLogin: {
    userInfo: {
      login: User
    }
  }
}
