import { ProductModel } from '../schema/product.schema'
import { type inputProduct } from '../types/product.type'

export class ProductService {
  async findProducts() {
    return await ProductModel.find()
  }

  async findSingleProduct(input: inputProduct) {
    return await ProductModel.findOne(input)
  }
}
