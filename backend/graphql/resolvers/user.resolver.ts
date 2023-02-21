import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../schema/user.schema'
import { UserService } from '../service/user.service'
import { Context } from '../types/context.type'
import { CreateUserInput, GetUserInput, LoginInput } from '../types/user.type'

@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService()
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput) {
    return await this.userService.createUser(input)
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    const user = await this.userService.login(input)
    return user
  }

  @Query(() => User)
  async getUser(@Arg('input') input: GetUserInput): Promise<User> {
    return await this.userService.getUser(input)
  }
}
