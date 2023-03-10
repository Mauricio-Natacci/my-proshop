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

export type State = {
  productDetails: {
    loading: boolean
    error: string
    product: {
      getProduct: ProductItem
    }
  }
}

export type ProductScreenProps = {
  history: {
    push: (url: string) => void
  }
  match: {
    params: {
      id: string
    }
  }
}
