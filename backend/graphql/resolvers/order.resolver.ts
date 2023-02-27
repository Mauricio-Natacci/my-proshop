import { Query, Resolver } from 'type-graphql'
import { OrderService } from '../service/order.service'
import { Order } from '../types/order.type'

@Resolver()
export default class OrderResolver {
  constructor(private readonly orderService: OrderService) {
    this.orderService = new OrderService()
  }

  @Query(() => [Order])
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders()
  }
}
