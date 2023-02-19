import {
  getModelForClass,
  prop,
  type ReturnModelType
} from '@typegoose/typegoose'
import { type AsQueryMethod } from '@typegoose/typegoose/lib/types'

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email })
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

export class User {
  @prop({ required: true, unique: true })
  email: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  isAdmin: boolean
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
