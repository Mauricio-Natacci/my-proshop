import dotenv from 'dotenv'

dotenv.config()

// TODO: have all the environment variables in one place and import this variable everywhere
// like we did with the brilliantly named "my-project"
export const config = {
  mongoURI: process.env.MONGO_URI,
  shouldServeReactApp: process.env.SERVE_REACT_APP === 'true',
  port: process.env.PORT || 5000,
}

// TODO: throw an error if the environment variable is not set
if (!config.mongoURI) {
  throw new Error('MONGO_URI environment variable is not set')
}
