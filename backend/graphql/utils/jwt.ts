import jwt from 'jsonwebtoken'
import { config } from '../../config'

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '100d' })
}
