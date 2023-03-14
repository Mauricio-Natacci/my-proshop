import { ProductItem } from './product.type'
import { User } from './user.type'

export type Order = {
  _id: string
  buyer: User
  orderItems: OrderItem[]
  shippingAddress: shippingAddress
  createdAt: string
  totalPrice: number
  status: boolean
  isDelivered: boolean
  updatedAt: string
}

export type OrderItem = {
  quantity: number
  price: number
  productId: ProductItem
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

export type OrderScreenProps = {
  match: {
    params: {
      id: string
    }
  }
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

export type StateOrderDetails = {
  orderDetails: {
    loading: boolean
    error: string
    order: {
      getOrder: Order
    }
  }
  userLogin: {
    userInfo: {
      login: User
    }
  }
}

export type StatusOrderState = {
  orderDeliver: {
    loading: boolean
    success: boolean
  }
  orderCancelled: {
    loading: boolean
    success: boolean
  }
}
