import { type Product, ProductModel } from '../schema/product.schema'
import {
  type UpdateProductInput,
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
    const product = new ProductModel({
      ...input,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user: context.user!._id
    })
    return await product.save()
  }

  async updateProduct(
    input: UpdateProductInput,
    context: Context
  ): Promise<Product> {
    const product = await ProductModel.findOne({ _id: input._id })

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    product.name = input.name ?? product.name
    product.price = input.price ?? product.price
    product.image = input.image ?? product.image
    product.description = input.description ?? product.description

    return await product.save()
  }

  async deleteProduct(input: GetProductInput): Promise<boolean> {
    const product = await ProductModel.findOne(input)

    if (!product) {
      throw new NotFoundError('Product not found')
    }

    await product.remove()
    return true
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
