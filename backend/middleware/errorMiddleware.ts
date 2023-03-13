import { Request, Response, NextFunction } from 'express'

interface Error {
  statusCode: number
  message?: string
  stack?: string
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).send({
    success: false,
    message: err.message,
    stack: err.stack
  })
}
