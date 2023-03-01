import UserResolver from './user.resolver'
import ProductResolver from './product.resolver'
import OrderResolver from './order.resolver'

export const resolvers = [UserResolver, ProductResolver, OrderResolver] as const
