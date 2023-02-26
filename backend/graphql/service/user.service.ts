import { UserModel } from '../../database/models/user.model'
import { NotFoundError } from '../errors/notFoundError'
import {
  type CreateUserInput,
  type GetUserInput,
  type LoginInput
} from '../inputs/user.input'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/jwt'
import { type Context } from '../types/context.type'
import { type User } from '../types/user.type'

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

  async login(input: LoginInput, context: Context): Promise<User> {
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

    context.res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    })

    return user
  }

  logout(context: Context): boolean {
    context.res.clearCookie('accessToken')

    if (!context.req.cookies.accessToken) {
      return true
    }
    return false
  }

  me(context: Context): User | null {
    if (context.req.cookies.accessToken) {
      return context.user
    }
    return null
  }
}
