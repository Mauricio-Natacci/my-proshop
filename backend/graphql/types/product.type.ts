import { Field, InputType } from 'type-graphql'

@InputType()
export class GetProductInput {
  @Field()
  _id: string
}
