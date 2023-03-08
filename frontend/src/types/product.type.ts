export type ProductItem = {
  _id: string
  name: string
  image: string
  description: string
  price: number
}

export type ProductListState = {
  productList: {
    loading: boolean
    error: string
    products: {
      getAllProducts: ProductItem[]
    }
  }
}
