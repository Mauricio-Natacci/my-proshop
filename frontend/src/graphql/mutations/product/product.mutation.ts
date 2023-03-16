import { gql } from '@apollo/client'

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: GetProductInput!) {
    deleteProduct(input: $id)
  }
`
export const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      _id
      name
      price
      description
      image
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      _id
      name
      price
      description
      image
    }
  }
`
