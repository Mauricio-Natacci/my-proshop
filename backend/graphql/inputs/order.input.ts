import { Field, InputType } from 'type-graphql'

@InputType()
export class GetOrderInput {
  @Field(() => String)
  _id: string
}
