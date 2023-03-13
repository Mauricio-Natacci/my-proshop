import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { UserModel } from '../models/user.model'
import { config } from '../config'
import { NotFoundError } from '../errors/NotFoundError'

interface Decoded {
  id: string
}

export const requireUser = asyncHandler(async (req: any, res, next) => {
  let token

  if (req.headers.authorization?.startsWith?.('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, config.jwtSecret) as Decoded

      req.user = await UserModel.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new NotFoundError('Not authorized, token failed!')
    }
  }

  if (!token) {
    res.status(401)
    throw new NotFoundError('Not authorized, no token!')
  }
})
