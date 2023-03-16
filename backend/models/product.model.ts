import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

export class Product {
  _id: string

  @prop()
  createdBy: Ref<User>

  @prop({ required: true, type: () => String })
  name: string

  @prop({ required: true, type: () => String })
  image: string

  @prop({ required: true, type: () => String })
  description: string

  @prop({ required: true, type: () => Number })
  price: number

  @prop({ required: true, default: Date.now, type: () => Date })
  createdAt: Date

  @prop({ required: true, default: Date.now, type: () => Date })
  updatedAt: Date
}

export const ProductModel = getModelForClass<typeof Product>(Product)
