import { gql } from '@apollo/client'

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    getAllProducts {
      _id
      name
      price
      description
      image
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: GetProductInput!) {
    getProduct(input: $id) {
      _id
      name
      price
      description
      image
    }
  }
`
