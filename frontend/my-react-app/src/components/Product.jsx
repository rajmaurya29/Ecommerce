import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Product({product}) {
    // console.log(product.image)
    const modeSelector=useSelector(state=>state.darkMode.Mode);
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong className={modeSelector ? 'text-white' : ''}>
              {product.name}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className={`py-2 ${modeSelector ? 'text-white' : ''}`}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={'#f8e825'}
          />
        </Card.Text>

        <Card.Text as="h3" className={modeSelector ? 'text-white' : ''}>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product