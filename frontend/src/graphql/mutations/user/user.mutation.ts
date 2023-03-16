import { gql } from '@apollo/client'

export const USER_FIELDS_FRAGMENT = gql`
  fragment UserFields on User {
    _id
    name
    email
    isAdmin
  }
`

export const LOGIN = gql`
  ${USER_FIELDS_FRAGMENT}
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserFields
    }
  }
`

export const ME = gql`
  ${USER_FIELDS_FRAGMENT}
  query me {
    me {
      ...UserFields
    }
  }
`
export const REGISTER = gql`
  ${USER_FIELDS_FRAGMENT}
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ...UserFields
    }
  }
`
