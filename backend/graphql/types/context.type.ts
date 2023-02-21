import { type Request, type Response } from 'express'
import { type User } from '../schema/user.schema'

interface Context {
  req: Request
  res: Response
  user: User | null
}

export default Context
