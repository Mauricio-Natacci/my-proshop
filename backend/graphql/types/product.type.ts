import { Field, InputType } from 'type-graphql'

@InputType()
export class GetProductInput {
  @Field()
  _id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  price: number
}
