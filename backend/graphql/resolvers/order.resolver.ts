import { Arg, Query, Resolver } from 'type-graphql'
import { GetOrderInput } from '../inputs/order.input'
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

  @Query(() => Order)
  async getOrder(@Arg('input') input: GetOrderInput): Promise<Order> {
    return await this.orderService.findSingleOrder(input)
  }
}
