import { Query, Resolver } from 'type-graphql'
import { Product } from '../schema/product.schema'
import ProductService from '../service/product.service'

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @Query(() => [Product])
  getAllProducts() {
    return this.productService.findProducts()
  }
}
