import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { Message } from '../components/Message'

type PlaceOrderScreenProps = {
  history: {
    push: (url: string) => void
  }
}

type CartItem = {
  image: string
  name: string
  quantity: number
  price: number
  productId: string
}

type StateCart = {
  cart: {
    cartItems: any
    shippingAddress: any
    itemsPrice: string
    totalPrice: string
  }
  orderCreate: {
    order: any
    success: boolean
    error: string
  }
}

export const PlaceOrderScreen = ({ history }: PlaceOrderScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const cart = useSelector((state: StateCart) => state.cart)

  const orderCreate = useSelector((state: StateCart) => state.orderCreate)
  const { order, success, error } = orderCreate

  //   Calculate prices
  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc: string, item: any) => acc + item.price * item.quantity,
      0
    )
  )
  cart.totalPrice = Number(cart.itemsPrice).toFixed(2)

  const items = cart.cartItems.map((item: CartItem) => {
    return {
      productId: item.productId,
      quantity: item.quantity
    }
  })

  const shippingAddress = cart.shippingAddress

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.createOrder._id}`)
    }
    // eslint-disable-next-line
  }, [history, success, dispatch])

  const placeOrderHandler = () => {
    dispatch(createOrder(items, shippingAddress))
  }

  return (
    <>
      <CheckoutSteps step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item: CartItem, index: number) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
