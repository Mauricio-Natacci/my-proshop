import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

type FormContainerProps = {
  children: React.ReactNode
}

export const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <Container>
      <Row className="justify-content-mid-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
