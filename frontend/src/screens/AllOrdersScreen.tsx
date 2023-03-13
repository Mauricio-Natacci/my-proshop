import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { OrdersScreenProps, Order, StateOrderList } from '../types/order.type'
import { listOrders } from '../actions/orderActions'
import { StateUserInfo } from '../types/user.type'

export const AllOrdersScreen = ({ history }: OrdersScreenProps) => {
  const dispatch: Dispatch<any> = useDispatch()

  const orderList = useSelector((state: StateOrderList) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state: StateUserInfo) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo?.login?.isAdmin) {
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
                {orders.getAllOrders?.map((order: Order) => (
                  <tr key={order._id}>
                    <td>{order.buyer.name}</td>
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
