import { type Response, type NextFunction } from 'express'
import { NotFoundError } from '../errors/NotFoundError'

export const requireAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new NotFoundError('Not authorized as an admin')
  }
}
