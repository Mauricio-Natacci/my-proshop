import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      _id
      orderItems {
        price
        quantity
      }
      totalPrice
    }
  }
`

export const DELIVER_ORDER = gql`
  mutation deliverOrder($input: OrderDeliveredInput!) {
    orderDelivered(input: $input) {
      _id
      isDelivered
      deliveredAt
      status
    }
  }
`

export const CANCEL_ORDER = gql`
  mutation cancelOrder($input: OrderCanceledInput!) {
    orderCanceled(input: $input) {
      _id
      isDelivered
      isCanceled
      canceledAt
      status
    }
  }
`
