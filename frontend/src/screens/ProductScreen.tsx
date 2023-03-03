import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../graphql/queries/product/product-query'

type ProductScreenProps = {
  history: {
    push: (url: string) => void
  }
  match: {
    params: {
      id: string
    }
  }
}

export const ProductScreen = ({ history, match }: ProductScreenProps) => {
  const _id = { _id: match.params.id }

  console.log(_id)

  const {
    loading,
    error,
    data: product
  } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'no-cache',
    variables: { id: { _id: match.params.id } }
  })

  console.log(product)

  const qty = 1

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-ligth my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              className="rounded"
              src={product.getProduct.image}
              alt={product.getProduct.name}
              fluid
            ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.getProduct.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>{product.getProduct.description}</ListGroup.Item>
              <ListGroup.Item>
                Price: $ {product.getProduct.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}
