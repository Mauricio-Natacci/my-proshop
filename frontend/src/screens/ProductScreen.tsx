import { useEffect } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { ProductScreenProps, ProductDetailsState } from '../types/product.type'
import { listProductDetails } from '../actions/productActions'

export const ProductScreen = ({ history, match }: ProductScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const productDetails = useSelector(
    (state: ProductDetailsState) => state.productDetails,
  )
  const { loading, error, product } = productDetails

  const qty = 1

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

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
              src={product.getProduct?.image}
              alt={product.getProduct?.name}
              fluid
            ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.getProduct?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>{product.getProduct?.description}</ListGroup.Item>
              <ListGroup.Item>
                Price: $ {product.getProduct?.price}
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
