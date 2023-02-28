import { Field, InputType } from 'type-graphql'
import { ShippingAddressInput } from './shippingAddress.input'

@InputType()
export class GetOrderInput {
  @Field(() => String)
  _id: string
}

@InputType()
export class CreateItemInput {
  @Field(() => String)
  productId: string

  @Field(() => Number)
  quantity: number
}

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateItemInput])
  items: CreateItemInput[]

  @Field(() => ShippingAddressInput)
  shippingAddress: ShippingAddressInput
}

@InputType()
export class OrderDeliveredInput {
  @Field(() => String)
  _id: string
}

@InputType()
export class OrderCanceledInput {
  @Field(() => String)
  _id: string
}
