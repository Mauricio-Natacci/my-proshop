/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderModel } from '../../models/order.model'
import { NotFoundError } from '../errors/notFoundError'
import {
  OrderDeliveredInput,
  GetOrderInput,
  OrderCanceledInput
} from '../inputs/order.input'
import { Context } from '../types/context.type'
import { Order } from '../types/order.type'

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return await OrderModel.find().populate('buyer', '-password')
  }

  async findSingleOrder(input: GetOrderInput): Promise<Order> {
    const order = await OrderModel.findOne(input).populate('buyer', '-password')

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

    const test = await OrderModel.find({ buyer: user._id }).populate(
      'buyer',
      '-password'
    )
    return test
  }
}
