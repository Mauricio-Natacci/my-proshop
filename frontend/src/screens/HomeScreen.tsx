import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { Dispatch } from "redux"
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'

const HomeScreen = () => {
  const dispatch: Dispatch<any> = useDispatch()

  type ProductListState = {
    productList: {
      loading: boolean
      error: string
      products: any[]
    }
  }

  const productList = useSelector((state: ProductListState) => state.productList)
  const { loading, error, products } = productList


  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
