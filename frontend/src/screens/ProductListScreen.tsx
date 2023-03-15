import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import {
  ProductCreateState,
  ProductListScreenProps,
  ProductListState,
  StateDeleteProduct,
} from '../types/product.type'
import { StateUserInfo } from '../types/user.type'

export const ProductListScreen = ({ history }: ProductListScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const productList = useSelector(
    (state: ProductListState) => state.productList,
  )
  const { loading, error, products } = productList

  const userLogin = useSelector((state: StateUserInfo) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(
    (state: StateDeleteProduct) => state.productDelete,
  )
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector(
    (state: ProductCreateState) => state.productCreate,
  )
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.login.isAdmin) {
      history.push('/login')
    }

    if (successDelete) {
      dispatch(listProducts())
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct.createProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdProduct,
    successDelete,
  ])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = (id: string) => {
    dispatch(deleteProduct(id))
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3 rounded" onClick={createProductHandler}>
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
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
            {products.getAllProducts?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm rounded">
                      Edit
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm rounded"
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
