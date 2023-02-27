import { OrderModel } from '../../database/models/order.model'
import { NotFoundError } from '../errors/notFoundError'
import { type GetOrderInput } from '../inputs/order.input'
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
}
