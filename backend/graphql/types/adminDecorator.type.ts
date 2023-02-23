import { type Request } from 'express'

export interface adminDecoratorContext {
  req: Request
  user: {
    _id: string
    isAdmin: boolean
  }
}
