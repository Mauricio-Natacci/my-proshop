import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Product } from './product.model'
import { User } from './user.model'

@modelOptions({ options: { allowMixed: 0 } })
export class Order {
  _id: string

  @prop({ required: true, ref: () => User })
  buyer: Ref<User>

  @prop({ required: true, type: () => [Object] })
  orderItems: OrderItem[]

  @prop({ required: true, type: () => Object })
  shippingAddress: ShippingAddress

  @prop({ required: true, default: 'Pending', type: () => String })
  status: string

  @prop({ required: true, type: () => Number })
  totalPrice: number

  @prop({ required: true, default: false, type: () => Boolean })
  isDelivered: boolean

  @prop({ required: true, default: Date.now, type: () => Date })
  deliveredAt: Date

  @prop({ required: true, default: Date.now, type: () => Date })
  updatedAt: Date

  @prop({ required: true, default: Date.now, type: () => Date })
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
