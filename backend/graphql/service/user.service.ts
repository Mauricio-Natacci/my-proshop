import { UserModel } from '../schema/user.schema'

export class UserService {
  async getUser(id: string) {
    return await UserModel.findById(id).lean()
  }
}
