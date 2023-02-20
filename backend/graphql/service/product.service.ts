import { ProductModel } from '../schema/product.schema'
import { type GetProductInput } from '../types/product.type'

export class ProductService {
  findProducts() {
    return ProductModel.find()
  }

  async findSingleProduct(input: GetProductInput) {
    return await ProductModel.findOne(input)
  }
}
