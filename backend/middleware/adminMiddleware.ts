import { type Response, type NextFunction } from 'express'

export const requireAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}
