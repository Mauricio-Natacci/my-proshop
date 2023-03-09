import { ApolloClient, InMemoryCache } from '@apollo/client'
import { config } from '../../config'

export const client = new ApolloClient({
  uri: config.graphqlURI,
  cache: new InMemoryCache(),
  credentials: 'include'
})
