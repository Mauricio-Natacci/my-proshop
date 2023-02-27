import { Field, InputType } from 'type-graphql'

@InputType()
export class getOrderInput {
  @Field(() => String)
  id: string
}
