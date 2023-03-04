/* eslint-disable @typescript-eslint/no-unused-expressions */
import { gql } from '@apollo/client'

export const PRODUCT_FIELDS_FRAGMENT = gql`
  fragment ProductFields on Product {
    _id
    name
    price
    description
    image
  }
`

export const GET_ALL_PRODUCTS = gql`
  ${PRODUCT_FIELDS_FRAGMENT}
  query getAllProducts {
    getAllProducts {
      ...ProductFields
    }
  }
`

export const GET_PRODUCT = gql`
  ${PRODUCT_FIELDS_FRAGMENT}
  query getProduct($id: GetProductInput!) {
    getProduct(input: $id) {
      ...ProductFields
    }
  }
`
