import { Field, ObjectType } from 'type-graphql'
import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.schema'

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>

  @Field(() => String)
  @prop({ required: true })
  name: string

  @Field(() => String)
  @prop({ required: true })
  image: string

  @Field(() => String)
  @prop({ required: true })
  description: string

  @Field(() => Number)
  @prop({ required: true })
  price: number

  @Field(() => Date)
  @prop({ required: true, default: Date.now })
  createdAt: Date

  @Field(() => Date)
  @prop({ required: true, default: Date.now })
  updatedAt: Date
}

export const ProductModel = getModelForClass<typeof Product>(Product)
