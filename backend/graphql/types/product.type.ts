import { Field, ObjectType } from 'type-graphql'
import { User } from './user.type'

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string

  @Field(() => User)
  createdBy: any

  @Field(() => String)
  name: string

  @Field(() => String)
  image: string

  @Field(() => String)
  description: string

  @Field(() => Number)
  price: number

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
