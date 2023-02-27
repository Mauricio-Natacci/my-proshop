import { Field, ObjectType } from 'type-graphql'
import { Product } from './product.type'

@ObjectType()
export class OrderItem {
  @Field(() => String)
  _id: string

  @Field(() => Number)
  quantity: number

  @Field(() => Number)
  price: number

  @Field(() => Product)
  product: Product
}
