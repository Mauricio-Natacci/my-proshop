import { OrderModel } from '../../database/models/order.model'
import { ProductModel } from '../../database/models/product.model'
import { NotFoundError } from '../errors/notFoundError'
import {
  type orderDeliveredInput,
  type CreateOrderInput,
  type GetOrderInput,
  type orderCanceledInput
} from '../inputs/order.input'
import { type Context } from '../types/context.type'
import { type Order } from '../types/order.type'

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return await OrderModel.find()
  }

  async findSingleOrder(input: GetOrderInput): Promise<Order> {
    const order = await OrderModel.findOne(input)

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    return order
  }

  async createOrder(input: CreateOrderInput, context: Context): Promise<Order> {
    const user = context.user

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const product = await ProductModel.findOne({ _id: input._id })

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    const totalPrice = product.price * input.quantity

    const order = new OrderModel({
      user: user._id,
      ...input,
      totalPrice
    })

    return await order.save()
  }

  async updateOrderToDelivered(input: orderDeliveredInput): Promise<Order> {
    const order = await OrderModel.findOne({ _id: input._id })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    order.isDelivered = true
    order.status = 'fulfilled'

    return await order.save()
  }

  async updateOrderToCancelled(input: orderCanceledInput): Promise<Order> {
    const order = await OrderModel.findOne({ _id: input._id })

    if (!order) {
      throw new NotFoundError('Order not found')
    }

    order.isDelivered = false
    order.status = 'cancelled'

    return await order.save()
  }
}
