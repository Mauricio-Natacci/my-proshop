import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class Product {
  @prop({ required: true })
  productId: string

  @prop({ required: true, ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  name: string

  @prop({ required: true })
  image: string

  @prop({ required: true })
  description: string

  @prop({ required: true })
  price: number

  @prop({ required: true, default: Date.now })
  createdAt: Date

  @prop({ required: true, default: Date.now })
  updatedAt: Date
}

export const ProductModel = getModelForClass<typeof Product>(Product)
