import jwt from 'jsonwebtoken'

// TODO: import from config
let JWT_SECRET: string
if (process.env.JWT_SECRET) {
  JWT_SECRET = process.env.JWT_SECRET
} else {
  throw new Error('JWT_SECRET environment variable is not set')
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '100d' })
}

export default generateToken
