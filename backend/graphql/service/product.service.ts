import { ProductModel } from '../schema/product.schema'
import { type inputProduct } from '../types/product.type'

class ProductService {
  findProducts() {
    return ProductModel.find()
  }

  async findSingleProduct(input: inputProduct) {
    return await ProductModel.findOne(input)
  }
}

export default ProductService
