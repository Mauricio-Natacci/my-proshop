import jwt from 'jsonwebtoken'
import { config } from '../config'

let JWT_SECRET: string
if (config.jwtSecret) {
  JWT_SECRET = config.jwtSecret
} else {
  throw new Error('JWT_SECRET environment variable is not set')
}

export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '100d' })
}
