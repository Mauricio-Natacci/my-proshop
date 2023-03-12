/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import dotenv from 'dotenv'
import { NotFoundError } from '../errors/NotFoundError'

dotenv.config()

export const config = {
  mongoURI: process.env.MONGO_URI,
  shouldServeReactApp: process.env.SERVE_REACT_APP === 'true',
  showErrorStack: process.env.SHOW_ERROR_STACK === 'true',
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  playgroundEnabled: process.env.PLAYGROUND_ENABLED === 'true',
  portGraphql: process.env.PORT_GRAPHQL,
  originFrontend: process.env.ORIGIN_FRONTEND
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

if (config.playgroundEnabled) {
  throw new NotFoundError('PLAYGROUND_ENABLED environment variable is not set')
}

if (!config.portGraphql) {
  throw new NotFoundError('PORT_GRAPHQL environment variable is not set')
}

if (!config.originFrontend) {
  throw new NotFoundError('ORIGIN_FRONTEND environment variable is not set')
}
