import {
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
  type ReturnModelType
} from '@typegoose/typegoose'
import { type AsQueryMethod } from '@typegoose/typegoose/lib/types'
import { Field, ObjectType } from 'type-graphql'
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
@ObjectType()
export class User {
  @Field(() => String)
  _id: string

  @Field(() => String)
  @prop({ required: true })
  name: string

  @Field(() => String)
  @prop({ required: true })
  email: string

  @prop({ required: true })
  password: string

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isAdmin: boolean

  @Field(() => Date)
  @prop({ required: true, default: Date.now })
  createdAt: Date

  @Field(() => Date)
  @prop({ required: true, default: Date.now })
  updatedAt: Date

  @Field(() => String)
  token: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
