import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Product } from '../schema/product.schema'
import { ProductService } from '../service/product.service'
import { Context } from '../types/context.type'
import { CreateProductInput, GetProductInput } from '../types/product.type'

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @Authorized()
  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: CreateProductInput,
    @Ctx() context: Context
  ): Promise<Product> {
    return await this.productService.createProduct(input, context)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteProduct(@Arg('input') input: GetProductInput): Promise<boolean> {
    return await this.productService.deleteProduct(input)
  }

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.findProducts()
  }

  @Query(() => Product)
  async getProduct(@Arg('input') input: GetProductInput): Promise<Product> {
    return await this.productService.findSingleProduct(input)
  }
}
