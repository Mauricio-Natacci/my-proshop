import { Ref } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { OrderItem } from './item.type'
import { ShippingAddress } from './shippingAddress.type'
import { User } from './user.type'

@ObjectType()
export class Order {
  @Field(() => String)
  _id: string

  @Field(() => User)
  buyer: Ref<User>

  @Field(() => [OrderItem])
  orderItems: OrderItem[]

  @Field(() => ShippingAddress)
  shippingAddress: ShippingAddress

  @Field(() => String)
  status: string

  @Field(() => Number)
  totalPrice: number

  @Field(() => Boolean)
  isDelivered: boolean

  @Field(() => Boolean)
  isCanceled: boolean

  @Field(() => Date)
  deliveredAt: Date

  @Field(() => Date)
  canceledAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Date)
  createdAt: Date
}
export { OrderItem }
