import { Request, Response } from 'express'
import { User } from '../../models/user.model'

export interface Context {
  req: Request
  res: Response
  user: User | null
}
