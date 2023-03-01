import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ShippingAddress {
  @Field(() => String)
  address: string

  @Field(() => String)
  city: string

  @Field(() => String)
  postalCode: string

  @Field(() => String)
  country: string
}
