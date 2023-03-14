import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Message } from '../components/Message'
import {
  CartScreenProps,
  stateCart,
  updateItemQuantityCart
} from '../types/cart.type'

export const CartScreen = ({ match, location, history }: CartScreenProps) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch: Dispatch<any> = useDispatch()

  const cart = useSelector((state: stateCart) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = (id: React.MouseEvent<HTMLButtonElement>) => {
    history.push('/login?redirect=shipping')
  }

  const updateItemQuantity = ({ productId, value }: updateItemQuantityCart) => {
    dispatch(addToCart(productId, value))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty! <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={3}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity({
                          productId: item.productId,
                          value: Number(e.target.value)
                        })
                      }
                      min="1"
                      max="10"
                    />
                    <p>Quantity: {item.quantity}</p>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      <p>Remove</p>{' '}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="fluid">
            <ListGroup.Item>
              <h4>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h4>
              <h4>
                Total: $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Buy Products
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}
