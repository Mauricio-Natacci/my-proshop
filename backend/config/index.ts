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
  portRest: process.env.PORT_REST,
  originFrontend: process.env.ORIGIN_FRONTEND,
}

if (!config.mongoURI) {
  throw new NotFoundError('MONGO_URI environment variable is not set')
}

const isValidReactApp = config.shouldServeReactApp === undefined
if (isValidReactApp) {
  throw new NotFoundError('SERVE_REACT_APP environment variable is not set')
}

const isValidShowErrorStack = config.showErrorStack === undefined
if (isValidShowErrorStack) {
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

const isValidPlaygroundEnabled = config.playgroundEnabled === undefined
if (isValidPlaygroundEnabled) {
  throw new NotFoundError('PLAYGROUND_ENABLED environment variable is not set')
}

if (!config.portRest) {
  throw new NotFoundError('PORT_REST environment variable is not set')
}

if (!config.originFrontend) {
  throw new NotFoundError('ORIGIN_FRONTEND environment variable is not set')
}
