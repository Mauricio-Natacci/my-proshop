import { type Request, type Response, type NextFunction } from 'express'
import { config } from '../config'

interface Error {
  message: string
  stack: string
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: config.productionApplication ? null : err.stack
  })
}

export { notFound, errorHandler }
