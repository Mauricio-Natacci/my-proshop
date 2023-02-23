import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { IsAdmin } from '../decorators/adminDecorator'
import { Product } from '../schema/product.schema'
import { ProductService } from '../service/product.service'
import { Context } from '../types/context.type'
import {
  CreateProductInput,
  GetProductInput,
  UpdateProductInput
} from '../types/product.type'

@Resolver()
export default class ProductResolver {
  constructor(private readonly productService: ProductService) {
    this.productService = new ProductService()
  }

  @IsAdmin()
  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: CreateProductInput,
    @Ctx() context: Context
  ): Promise<Product> {
    return await this.productService.createProduct(input, context)
  }

  @IsAdmin()
  @Mutation(() => Product)
  async updateProduct(
    @Arg('input') input: UpdateProductInput,
    @Ctx() context: Context
  ): Promise<Product> {
    return await this.productService.updateProduct(input, context)
  }

  @IsAdmin()
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
