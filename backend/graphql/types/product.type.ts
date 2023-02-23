import { Field, InputType } from 'type-graphql'

@InputType()
export class GetProductInput {
  @Field(() => String)
  _id: string
}

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => Number)
  price: number

  @Field(() => String)
  image: string
}
