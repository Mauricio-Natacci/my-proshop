import { gql } from '@apollo/client'
import { ORDER_FIELDS_FRAGMENT } from '../../queries/order/order-query'

export const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      _id
      orderItems {
        productId
        price
        quantity
      }
      totalPrice
    }
  }
`
