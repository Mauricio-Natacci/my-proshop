import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class GetUserInput {
  @Field(() => String)
  _id: string
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string

  @IsEmail()
  @Field(() => String)
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long'
  })
  @MaxLength(50, {
    message: 'Password must be at most 50 characters long'
  })
  @Field(() => String)
  password: string

  @Field(() => Boolean, { defaultValue: false })
  isAdmin: boolean
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
