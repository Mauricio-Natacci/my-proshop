import { Arg, Query, Resolver } from 'type-graphql'
import { Product } from '../schema/product.schema'
import { ProductService } from '../service/product.service'
import { inputProduct } from '../types/product.type'

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @Query(() => [Product])
  async getAllProducts() {
    return await this.productService.findProducts()
  }

  @Query(() => Product)
  async getProductById(@Arg('input') input: inputProduct) {
    return await this.productService.findSingleProduct(input)
  }
}
