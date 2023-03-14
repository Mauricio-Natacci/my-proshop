import { FieldResolver, Resolver, Root } from 'type-graphql'
import { ProductService } from '../service/product.service'
import { OrderItem } from '../types/item.type'
import { Product } from '../types/product.type'

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @FieldResolver(() => Product)
  async product(@Root() orderItem: OrderItem) {
    return await this.productService.findSingleProduct({
      _id: orderItem.productId as string,
    })
  }
}
