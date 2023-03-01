/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderModel } from '../../database/models/order.model'
import { NotFoundError } from '../errors/notFoundError'
import {
  type OrderDeliveredInput,
  type GetOrderInput,
  type OrderCanceledInput
} from '../inputs/order.input'
import { type Context } from '../types/context.type'
import { type Order } from '../types/order.type'

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return await OrderModel.find().populate('user', '-password')
  }

  async findSingleOrder(input: GetOrderInput): Promise<Order> {
    const order = await OrderModel.findOne(input)

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    return order
  }

  async updateOrderToDelivered(input: OrderDeliveredInput): Promise<Order> {
    const order = await OrderModel.findOne({ _id: input._id })
    if (!order) {
      throw new NotFoundError('Order not found')
    }

    order.isDelivered = true
    order.status = 'fulfilled'

    return await order.save()
  }

  async updateOrderToCanceled(input: OrderCanceledInput): Promise<Order> {
    const order = await OrderModel.findOne({ _id: input._id })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    order.isDelivered = false
    order.status = 'cancelled'

    return await order.save()
  }

  async getMyOrders(context: Context): Promise<Order[]> {
    const user = context.user!

    return await OrderModel.find({ user: user._id })
  }
}
