import { Field, InputType } from 'type-graphql'

@InputType()
export class ShippingAddressInput {
  @Field(() => String)
  address: string

  @Field(() => String)
  city: string

  @Field(() => String)
  postalCode: string

  @Field(() => String)
  country: string
}
