import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { Dispatch } from "redux"
import { listProducts } from '../actions/productActions'

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
        <h1>loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
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