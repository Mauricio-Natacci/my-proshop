import { type User, UserModel } from '../schema/user.schema'
import { NotFoundError } from '../errors/notFoundError'
import {
  type CreateUserInput,
  type GetUserInput,
  type LoginInput
} from '../types/user.type'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt'

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

  async login(input: LoginInput): Promise<User> {
    const errorMessage = 'Invalid email or password'

    const user = await UserModel.findOne({ email: input.email }).lean()

    if (!user) {
      throw new NotFoundError(errorMessage)
    }

    const isValidPassword = await bcrypt.compare(input.password, user.password)

    if (!isValidPassword) {
      throw new NotFoundError(errorMessage)
    }

    const { _id } = user

    const token = generateToken(_id)

    user.token = token

    return user
  }
}
