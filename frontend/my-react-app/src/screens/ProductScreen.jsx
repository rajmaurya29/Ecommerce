import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,Card,Button,ListGroup } from 'react-bootstrap'
import Rating from '../components/Rating'
import  Products  from '../products'
import { useParams } from "react-router-dom";
import products from '../products'


function ProductScreen() {
    const prm=useParams();

    const product=products.find((p)=>p._id==prm.id)
    // console.log(prm.id);
  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        <h1>{product.name}</h1>
        <Row className='py-4'>
            <Col md={6} >
                <Image src={product.image}  alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/></ListGroup.Item>
                    <ListGroup.Item><strong>Price: ${product.price}</strong></ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price: </Col>
                            <Col>${product.price } </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status: </Col>
                            <Col>{product.countInStock==0? "Out of Stock" : "In Stock"} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block px-5 mx-1 w-100 h-100' type='button' disabled={product.countInStock==0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default ProductScreen