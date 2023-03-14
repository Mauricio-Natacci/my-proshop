import { UserResolver } from './user.resolver'
import { ProductResolver } from './product.resolver'
import { OrderResolver } from './order.resolver'
import { OrderItemResolver } from './orderItem.resolver'

export const resolvers = [
  UserResolver,
  ProductResolver,
  OrderResolver,
  OrderItemResolver,
] as const
