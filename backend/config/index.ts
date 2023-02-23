import dotenv from 'dotenv'
import { NotFoundError } from '../errors/NotFoundError'

dotenv.config()

export const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
  shouldServeReactApp: process.env.SERVE_REACT_APP === 'true',
  showErrorStack: process.env.SHOW_ERROR_STACK === 'true',
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  playgroundEnabled: process.env.PLAYGROUND_ENABLED === 'true'
}

if (!config.mongoURI) {
  throw new NotFoundError('MONGO_URI environment variable is not set')
}

if (config.shouldServeReactApp) {
  throw new NotFoundError('SERVE_REACT_APP environment variable is not set')
}

if (config.showErrorStack) {
  throw new NotFoundError('SHOW_ERROR_STACK environment variable is not set')
}

if (!config.port) {
  throw new NotFoundError('PORT environment variable is not set')
}

if (!config.environment) {
  throw new NotFoundError('NODE_ENV environment variable is not set')
}

if (!config.jwtSecret) {
  throw new NotFoundError('JWT_SECRET environment variable is not set')
}
