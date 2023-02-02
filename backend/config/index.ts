import dotenv from 'dotenv'

dotenv.config()

export const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017',
  shouldServeReactApp: process.env.SERVE_REACT_APP === 'true',
  showErrorStack: process.env.SHOW_ERROR_STACK === 'true',
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET
}

if (!config.mongoURI) {
  throw new Error('MONGO_URI environment variable is not set')
}

if (config.shouldServeReactApp) {
  throw new Error('SERVE_REACT_APP environment variable is not set')
}

if (config.showErrorStack) {
  throw new Error('SHOW_ERROR_STACK environment variable is not set')
}

if (!config.port) {
  throw new Error('PORT environment variable is not set')
}

if (!config.environment) {
  throw new Error('NODE_ENV environment variable is not set')
}

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not set')
}
