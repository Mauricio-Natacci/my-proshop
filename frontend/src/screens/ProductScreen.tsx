import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import { Dispatch } from 'redux'

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

type ProductDetailsState = {
  productDetails: {
    loading: boolean
    error: string
    product: {
      _id: string
      name: string
      image: string
      description: string
      price: number
    }
  }
}

export const ProductScreen = ({ history, match }: ProductScreenProps) => {
  const qty = 1
  const dispatch: Dispatch<any> = useDispatch()

  const productDetails = useSelector(
    (state: ProductDetailsState) => state.productDetails
  )
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

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
              src={product.image}
              alt={product.name}
              fluid
            ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
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
