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

export type ProductDetailsState = {
  productDetails: {
    loading: boolean
    error: string
    product: {
      getProduct: ProductItem
    }
  }
}

export type ProductCreateState = {
  productCreate: {
    loading: boolean
    error: string
    success: boolean
    product: { createProduct: ProductItem }
  }
}

export type StateDeleteProduct = {
  productDelete: {
    loading: boolean
    error: string
    success: boolean
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

export type ProductListScreenProps = {
  history: {
    push: (url: string) => void
  }
}

export type ProductEditScreenProps = {
  match: {
    params: {
      id: string
    }
  }
  history: {
    push: (url: string) => void
  }
}

export type ProductUpdateState = {
  productUpdate: {
    loading: boolean
    error: string
    success: boolean
  }
}
