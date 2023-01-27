import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'

let JWT_SECRET: string
if (process.env.JWT_SECRET) {
  JWT_SECRET = process.env.JWT_SECRET
} else {
  throw new Error("JWT_SECRET environment variable is not set")
}

type Decoded = {
  id: string
}

const protect = asyncHandler(async (req: any, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, JWT_SECRET) as Decoded

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed!')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token!')
  }
})

const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
