import {
  getModelForClass,
  prop,
  type ReturnModelType
} from '@typegoose/typegoose'
import { type AsQueryMethod } from '@typegoose/typegoose/lib/types'
import { Field, ObjectType } from 'type-graphql'

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email })
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>
}

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
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
