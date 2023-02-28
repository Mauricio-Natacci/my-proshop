import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../types/user.type'
import { UserService } from '../service/user.service'
import { Context } from '../types/context.type'
import { CreateUserInput, GetUserInput, LoginInput } from '../inputs/user.input'
import { IsLoggedIn } from '../decorators/authDecorator'

@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService()
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('input') input: LoginInput,
    @Ctx() context: Context
  ): Promise<User> {
    return await this.userService.login(input, context)
  }

  @IsLoggedIn()
  @Mutation(() => Boolean)
  logout(@Ctx() context: Context): boolean {
    return this.userService.logout(context)
  }

  @Query(() => User)
  async getUser(@Arg('input') input: GetUserInput): Promise<User> {
    return await this.userService.getUser(input)
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context): User | null {
    return this.userService.me(context)
  }
}
