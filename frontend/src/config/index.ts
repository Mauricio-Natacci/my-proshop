import { NotFoundError } from '../errors/notFoundError'

export const config = {
  graphqlURI:
    process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:5000/graphql'
}

if (!config.graphqlURI) {
  throw new NotFoundError(
    'REACT_APP_GRAPHQL_URI environment variable is not set'
  )
}
