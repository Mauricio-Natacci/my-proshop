import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { listOrders } from '../actions/orderActions'

type AllOrdersScreenProps = {
  history: {
    push: (url: string) => void
  }
}

export type Orders = {
  _id: string
  user: {
    name: string
    _id: string
  }
  orderItems: {
    name: string
    qty: number
    image: string
    price: number
    product: string
  }[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: string
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
}

type State = {
  orderList: {
    loading: boolean
    error: string
    orders: Orders[]
  }
  userLogin: {
    userInfo: {
      _id: string
      name: string
      email: string
      isAdmin: boolean
    }
  }
}

export const AllOrdersScreen = ({ history }: AllOrdersScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const orderList = useSelector((state: State) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state: State) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row>
        <Col md={9}>
          <h2>All Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>DELIVER</th>
                  <th>INFO</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>

                    <td>
                      {order.isDelivered ? (
                        <p>Delivered</p>
                      ) : (
                        <p>Not Delivered</p>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm rounded" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}
