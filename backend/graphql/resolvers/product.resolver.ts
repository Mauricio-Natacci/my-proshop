import { Arg, Query, Resolver } from 'type-graphql'
import { NotFoundError } from '../errors/notFoundError'
import { Product } from '../schema/product.schema'
import { ProductService } from '../service/product.service'
import { GetProductInput } from '../types/product.type'

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @Query(() => [Product], { nullable: true })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findProducts()
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg('input') input: GetProductInput): Promise<Product> {
    const product = await this.productService.findSingleProduct(input)

    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
