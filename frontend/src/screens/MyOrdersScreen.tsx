import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from "redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'
import { Orders } from './AllOrdersScreen'

type MyOrdersScreenProps = {
  history: {
    push: (url: string) => void
  }
}

type userInfoProps = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

type State = {
  orderListMy: {
    loading: boolean
    error: string
    orders: Orders[]
  }
  userLogin: {
    userInfo: userInfoProps
  }
}

const MyOrdersScreen = ({ history }: MyOrdersScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const orderListMy = useSelector((state: State) => state.orderListMy)
  const { loading, error, orders } = orderListMy

  const userLogin = useSelector((state: State) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders())
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row>
        <Col md={9}>
          <h2>My Orders</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>DELIVER</th>
                  <th>INFO</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  < tr key={order._id}>
                    <td>
                      {userInfo.name}
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.totalPrice}</td>

                    <td>
                      {order.isDelivered ? (
                        <p>Delivered</p>
                      ) : (
                        <p>Not Delivered</p>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
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

export default MyOrdersScreen
