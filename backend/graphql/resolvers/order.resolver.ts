import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { IsAdmin } from '../decorators/adminDecorator'
import { IsLoggedIn } from '../decorators/authDecorator'
import {
  CreateOrderInput,
  GetOrderInput,
  OrderCanceledInput,
  OrderDeliveredInput
} from '../inputs/order.input'
import { OrderService } from '../service/order.service'
import { Context } from '../types/context.type'
import { Order } from '../types/order.type'

@Resolver()
export default class OrderResolver {
  constructor(private readonly orderService: OrderService) {
    this.orderService = new OrderService()
  }

  @IsAdmin()
  @Query(() => [Order])
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders()
  }

  @IsAdmin()
  @Query(() => Order)
  async getOrder(@Arg('input') input: GetOrderInput): Promise<Order> {
    return await this.orderService.findSingleOrder(input)
  }

  @IsLoggedIn()
  @Mutation(() => Order)
  async createOrder(
    @Arg('input') input: CreateOrderInput,
    @Ctx() context: Context
  ): Promise<Order> {
    return await this.orderService.createOrder(input, context)
  }

  @IsAdmin()
  @Mutation(() => Order)
  async orderDelivered(
    @Arg('input') input: OrderDeliveredInput
  ): Promise<Order> {
    return await this.orderService.updateOrderToDelivered(input)
  }

  @IsAdmin()
  @Mutation(() => Order)
  async orderCancelled(
    @Arg('input') input: OrderCanceledInput
  ): Promise<Order> {
    return await this.orderService.updateOrderToCanceled(input)
  }

  @IsLoggedIn()
  @Query(() => [Order])
  async getMyOrders(@Ctx() context: Context): Promise<Order[]> {
    return await this.orderService.getMyOrders(context)
  }
}
