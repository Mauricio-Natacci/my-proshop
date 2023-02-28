import { Field, InputType } from 'type-graphql'
import { ShippingAddressInput } from './shippingAddress.input'

@InputType()
export class GetOrderInput {
  @Field(() => String)
  _id: string
}

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  _id: string

  @Field(() => Number)
  quantity: number

  @Field(() => ShippingAddressInput)
  shippingAddress: ShippingAddressInput
}

@InputType()
export class uploadOrderToDeliveredInput {
  @Field(() => String)
  _id: string
}
