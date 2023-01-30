import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

type ProductProps = {
  product: {
    _id: string
    name: string
    image: string
    description: string
    price: number
  }
}

const Product = ({ product }: ProductProps) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='maxImageHeight' />
      </Link>

      <Card.Body className='heightBox'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>$ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
