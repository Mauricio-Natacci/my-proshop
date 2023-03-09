import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      email
      isAdmin
    }
  }
`
