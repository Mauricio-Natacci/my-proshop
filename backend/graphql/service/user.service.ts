import { UserModel } from '../schema/user.schema'
import { NotFoundError } from '../errors/notFoundError'
import { type CreateUserInput, type GetUserInput } from '../types/user.type'

export class UserService {
  async createUser(input: CreateUserInput) {
    return await UserModel.create(input)
  }

  async getUser(input: GetUserInput) {
    const user = await UserModel.findById(input).lean()

    if (!user) {
      throw new NotFoundError('User not found')
    }
    return user
  }
}
