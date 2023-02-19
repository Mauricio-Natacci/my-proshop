import { ProductModel } from '../schema/product.schema'

class ProductService {
  findProducts() {
    return ProductModel.find()
  }
}

export default ProductService
