import { Arg, Query, Resolver } from 'type-graphql'
import { User } from '../schema/user.schema'
import { UserService } from '../service/user.service'

@Resolver()
export default class UserResolver {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService()
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg('id') id: string) {
    return await this.userService.getUser(id)
  }
}
