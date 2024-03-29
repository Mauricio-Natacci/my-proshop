import { gql } from '@apollo/client'

export const ORDER_FIELDS_FRAGMENT = gql`
  fragment OrderFields on Order {
    _id
    buyer {
      _id
      name
      email
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
export const GET_ORDER = gql`
  ${ORDER_FIELDS_FRAGMENT}
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ...OrderFields
      orderItems {
        product {
          _id
          name
          image
        }

        quantity
        price
      }
      shippingAddress {
        address
        city
        country
        postalCode
      }
      status
    }
  }
`
