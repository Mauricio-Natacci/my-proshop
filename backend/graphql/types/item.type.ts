import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class OrderItem {
  @Field(() => Number)
  quantity: number

  @Field(() => Number)
  price: number

  @Field(() => String)
  productId: string
}
