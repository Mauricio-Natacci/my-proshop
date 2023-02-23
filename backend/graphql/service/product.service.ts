import { type Product, ProductModel } from '../schema/product.schema'
import {
  type CreateProductInput,
  type GetProductInput
} from '../types/product.type'
import { NotFoundError } from '../errors/notFoundError'
import { type Context } from '../types/context.type'

export class ProductService {
  async createProduct(
    input: CreateProductInput,
    context: Context
  ): Promise<Product> {
    if (!context.user) {
      throw new Error('User not found')
    }

    if (!context.user.isAdmin) {
      throw new Error('You are not authorized to create a product')
    }

    const product = new ProductModel({
      ...input,
      user: context.user._id
    })
    return await product.save()
  }

  async findProducts(): Promise<Product[]> {
    return await ProductModel.find()
  }

  async findSingleProduct(input: GetProductInput): Promise<Product> {
    const product = await ProductModel.findOne(input)

    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
