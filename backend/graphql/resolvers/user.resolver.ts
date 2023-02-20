import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../schema/user.schema'
import { UserService } from '../service/user.service'
import { CreateUserInput, GetUserInput } from '../types/user.type'

@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService()
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    return await this.userService.createUser(input)
  }

  @Query(() => User)
  async getUser(@Arg('input') input: GetUserInput): Promise<User> {
    return await this.userService.getUser(input)
  }
}
