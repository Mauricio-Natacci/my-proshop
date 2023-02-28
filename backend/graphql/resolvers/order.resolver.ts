import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  CreateOrderInput,
  GetOrderInput,
  orderCanceledInput,
  orderDeliveredInput
} from '../inputs/order.input'
import { OrderService } from '../service/order.service'
import { Context } from '../types/context.type'
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

  @Mutation(() => Order)
  async createOrder(
    @Arg('input') input: CreateOrderInput,
    @Ctx() context: Context
  ): Promise<Order> {
    return await this.orderService.createOrder(input, context)
  }

  @Mutation(() => Order)
  async orderDelivered(
    @Arg('input') input: orderDeliveredInput
  ): Promise<Order> {
    return await this.orderService.updateOrderToDelivered(input)
  }

  @Mutation(() => Order)
  async orderCancelled(
    @Arg('input') input: orderCanceledInput
  ): Promise<Order> {
    return await this.orderService.updateOrderToCancelled(input)
  }
}
