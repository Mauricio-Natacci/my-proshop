import { gql } from '@apollo/client'

export const ORDER_FIELDS_FRAGMENT = gql`
  fragment OrderFields on Order {
    _id
    buyer {
      _id
      name
    }
    updatedAt
    createdAt
    isDelivered
    totalPrice
  }
`

export const GET_ALL_ORDERS = gql`
  ${ORDER_FIELDS_FRAGMENT}
  query getAllOrders {
    getAllOrders {
      ...OrderFields
    }
  }
`

export const GET_MY_ORDERS = gql`
  ${ORDER_FIELDS_FRAGMENT}
  query getMyOrders {
    getMyOrders {
      ...OrderFields
    }
  }
`
