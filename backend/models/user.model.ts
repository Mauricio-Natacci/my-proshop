import {
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
  type ReturnModelType
} from '@typegoose/typegoose'
import { type AsQueryMethod } from '@typegoose/typegoose/lib/types'
import bcrypt from 'bcryptjs'

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email })
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(this.password, salt)

  this.password = hash
})
@index({ email: 1 })
@queryMethod(findByEmail)
export class User {
  _id: string

  @prop({ required: true, type: () => String })
  name: string

  @prop({ required: true, type: () => String })
  email: string

  @prop({ required: true, type: () => String })
  password: string

  @prop({ required: true, default: false, type: () => Boolean })
  isAdmin: boolean

  @prop({ required: true, default: Date.now, type: () => Date })
  createdAt: Date

  @prop({ required: true, default: Date.now, type: () => Date })
  updatedAt: Date
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
