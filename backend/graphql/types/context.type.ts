import { type Request, type Response } from 'express'
import { type User } from '../../database/models/user.model'

export interface Context {
  req: Request
  res: Response
  user: User | null
}
