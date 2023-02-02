import jwt from 'jsonwebtoken'
import { type Response, type NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'
import { config } from '../config'

interface Decoded {
  id: string
}

const protect = asyncHandler(async (req: any, res, next) => {
  let token

  // TODO: research about the optional chaining operator
  if (req.headers.authorization?.startsWith?.('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, config.jwtSecret) as Decoded

      req.user = await UserModel.findById(decoded.id).select('-password')

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

// TODO: can we have a more explicit name?
// TODO: can we split these into separate files?
const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
