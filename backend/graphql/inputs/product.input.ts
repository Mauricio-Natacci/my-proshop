import { Field, InputType } from 'type-graphql'

@InputType()
export class GetProductInput {
  @Field(() => String)
  productId: string
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

@InputType()
export class UpdateProductInput {
  @Field(() => String)
  productId: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Number, { nullable: true })
  price?: number

  @Field(() => String, { nullable: true })
  image?: string
}
