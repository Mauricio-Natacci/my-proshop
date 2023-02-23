import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { isAdmin } from '../middleware/decoratorMiddleware'
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

  @UseMiddleware(isAdmin)
  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: CreateProductInput,
    @Ctx() context: Context
  ): Promise<Product> {
    return await this.productService.createProduct(input, context)
  }

  @UseMiddleware(isAdmin)
  @Mutation(() => Product)
  async updateProduct(
    @Arg('input') input: UpdateProductInput,
    @Ctx() context: Context
  ): Promise<Product> {
    return await this.productService.updateProduct(input, context)
  }

  @UseMiddleware(isAdmin)
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
