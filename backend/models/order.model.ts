import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

@modelOptions({ options: { allowMixed: 0 } })
export class Order {
  _id: string

  @prop({ required: true, ref: () => User })
  buyer: Ref<User>

  @prop({ required: true })
  orderItems: OrderItem[]

  @prop({ required: true })
  shippingAddress: ShippingAddress

  @prop({ required: true, default: 'Pending' })
  status: string

  @prop({ required: true })
  totalPrice: number

  @prop({ required: true, default: false })
  isDelivered: boolean

  @prop({ required: true, default: Date.now })
  deliveredAt: Date

  @prop({ required: true, default: Date.now })
  updatedAt: Date

  @prop({ required: true, default: Date.now })
  createdAt: Date
}

export const OrderModel = getModelForClass<typeof Order>(Order)

export type OrderItem = {
  quantity: number
  price: number
  productId: string
}

export type ShippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
}
