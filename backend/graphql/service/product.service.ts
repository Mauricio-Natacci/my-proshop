import { ProductModel } from '../schema/product.schema'
import { type GetProductInput } from '../types/product.type'
import { NotFoundError } from '../errors/notFoundError'

export class ProductService {
  findProducts() {
    return ProductModel.find()
  }

  async findSingleProduct(input: GetProductInput) {
    const product = await ProductModel.findOne(input)

    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
