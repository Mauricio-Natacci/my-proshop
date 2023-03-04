import React from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS } from '../graphql/queries/order/order-query'
import { AllOrdersScreenProps, Order } from '../types/order.type'

export const AllOrdersScreen = ({ history }: AllOrdersScreenProps) => {
  const { loading, error, data } = useQuery(GET_ALL_ORDERS)

  if (loading) return <Loader />
  if (error) return <Message variant="danger">{error.message}</Message>

  const orders = data.getAllOrders

  //TODO: add history.push to home page if user is not admin, requirement: login feature needs to be implemented

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
                {orders.map((order: Order) => (
                  <tr key={order._id}>
                    <td>{order.buyer.name}</td>
                    <td>{order.updatedAt.substring(0, 10)}</td>
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
