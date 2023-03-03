import { Col, Row } from 'react-bootstrap'
import { Product } from '../components/Product'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS } from '../graphql/queries/product/product-query'

export const HomeScreen = () => {
  const { loading, error, data: products } = useQuery(GET_ALL_PRODUCTS)

  type Product = {
    _id: string
    name: string
    image: string
    description: string
    price: number
  }

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.getAllProducts.map((product: Product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
