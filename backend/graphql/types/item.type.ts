import { Ref } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { Product } from './product.type'

@ObjectType()
export class OrderItem {
  @Field(() => Number)
  quantity: number

  @Field(() => Number)
  price: number

  // @Field(() => String)
  // productId: string

  @Field(() => Product)
  productId: Ref<Product>
}
