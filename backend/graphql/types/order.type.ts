import { Field, ObjectType } from 'type-graphql'
import { Item } from './item.type'
import { ShippingAddress } from './shippingAddress.type'

@ObjectType()
export class Order {
  @Field(() => String)
  _id: string

  @Field(() => String)
  user: any

  @Field(() => [Item])
  orderItems: Item[]

  @Field(() => ShippingAddress)
  shippingAddress: ShippingAddress

  @Field(() => String)
  status: string

  @Field(() => Number)
  totalPrice: number

  @Field(() => Boolean)
  isDelivered: boolean

  @Field(() => Date)
  deliveredAt: Date

  @Field(() => Date)
  updatedAt: Date
}
