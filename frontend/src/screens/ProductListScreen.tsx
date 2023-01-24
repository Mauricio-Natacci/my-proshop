import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from "redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { UserInfo } from '../actions/userActions'

type ProductListScreenProps = {
  history: {
    push: (url: string) => void
  }
}

type Products = {
  _id: string
  name: string
  price: number
  user: string
  image: string
  description: string
}
type Product = {
  loading: boolean
  error: string
  products: Products[]
  _id: string
}
type State = {
  productList: {
    loading: boolean
    error: string
    products: Products[]
  }
  userLogin: {
    userInfo: UserInfo
  }
  productDelete: {
    loading: boolean
    error: string
    success: boolean
  }
  productCreate: {
    loading: boolean
    error: string
    success: boolean
    product: Product
  }
}

const ProductListScreen = ({ history }: ProductListScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const productList = useSelector((state: State) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state: State) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state: State) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state: State) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = (id: string) => {
    dispatch(deleteProduct(id))
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 rounded' onClick={createProductHandler}>
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm rounded'>
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm rounded'
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete{' '}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
