import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { User } from './user.model'

@modelOptions({ options: { allowMixed: 0 } })
export class Order {
  _id: string

  @prop({ required: true, ref: () => User })
  user: Ref<User>

  @prop({ required: true })
  orderItems: Array<{
    quantity: number
    price: number
    productId: string
  }>

  @prop({ required: true })
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }

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
}

export const OrderModel = getModelForClass<typeof Order>(Order)
