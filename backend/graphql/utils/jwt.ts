import jwt from 'jsonwebtoken'
import { config } from '../../config'

export const generateToken = (_id: string) => {
  return jwt.sign({ _id }, config.jwtSecret, { expiresIn: '100d' })
}

export function verifyJwt<T>(token: string): T {
  return jwt.verify(token, config.jwtSecret) as T
}
