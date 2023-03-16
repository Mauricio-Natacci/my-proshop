import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class Product {
  _id: string

  @prop()
  createdBy: Ref<User>

  @prop()
  name: string

  @prop()
  image: string

  @prop()
  description: string

  @prop()
  price: number

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date
}

export const ProductModel = getModelForClass<typeof Product>(Product)
