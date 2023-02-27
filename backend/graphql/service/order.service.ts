import { OrderModel } from '../../database/models/order.model'
import { type Order } from '../types/order.type'

export class OrderService {
  async getAllOrders(): Promise<Order[]> {
    return await OrderModel.find()
  }
}
