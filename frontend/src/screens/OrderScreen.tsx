import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { CheckoutSteps } from '../components/CheckoutSteps'
import {
  getOrderDetails,
  deliverOrder,
  cancelledOrder
} from '../actions/orderActions'
import {
  ORDER_DELIVER_RESET,
  ORDER_CANCELLED_RESET
} from '../constants/orderConstants'
import { StateUserInfo } from '../types/user.type'

type OrderScreenProps = {
  match: {
    params: {
      id: string
    }
  }
  history: {
    push: (url: string) => void
  }
}

type State = {
  orderDetails: {
    error: string | null
    loading: boolean
    order: any
  }
  orderDeliver: {
    loading: boolean
    success: boolean
  }
  orderCancelled: {
    loading: boolean
    success: boolean
  }
}

type Item = {
  name: string
  image: string
  price: number
  product: string
  quantity: number
}

export const OrderScreen = ({ match, history }: OrderScreenProps) => {
  const orderId = match.params.id

  const dispatch: Dispatch<any> = useDispatch()

  const orderDetails = useSelector((state: State) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state: State) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderCancelled = useSelector((state: State) => state.orderCancelled)
  const { loading: loadingCancelled, success: successCancelled } =
    orderCancelled

  const userLogin = useSelector((state: StateUserInfo) => state.userLogin)
  const { userInfo } = userLogin

  console.log('userInfo', userInfo)

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (!order || order._id !== orderId || successDeliver || successCancelled) {
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCELLED_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, order, orderId, successDeliver, successCancelled])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const cancelledHandler = () => {
    dispatch(cancelledOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <CheckoutSteps step4 />
      <h1>Order {order.getOrder?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.getOrder?.buyer.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.getOrder?.buyer.email}`}>
                  {order.getOrder?.buyer.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.getOrder?.shippingAddress.address},{' '}
                {order.getOrder?.shippingAddress.city},
                {order.getOrder?.shippingAddress.postalCode},
                {order.getOrder?.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.getOrder?.orderItems?.length === 0 ? (
                <h2>Order is empty</h2>
              ) : (
                <ListGroup variant="flush">
                  {order.getOrder?.orderItems?.map(
                    (item: Item, index: number) => (
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
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x ${item.price} = $
                            {item.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
              {order.getOrder?.isDelivered ? (
                <Message>Delivered</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
              <ListGroup.Item className="Uppercase">
                Status: {order.getOrder?.status}
              </ListGroup.Item>
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
                  <Col>${order.getOrder?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo.login?.isAdmin && !order.getOrder?.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
              {loadingCancelled && <Loader />}
              {userInfo.login?.isAdmin && (
                <center>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-danger"
                      onClick={cancelledHandler}
                    >
                      Mark as Cancelled
                    </Button>
                  </ListGroup.Item>
                </center>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
