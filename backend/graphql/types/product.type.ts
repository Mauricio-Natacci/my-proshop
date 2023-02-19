import { Field, InputType } from 'type-graphql'

@InputType()
export class inputProduct {
  @Field()
  _id: string
}
