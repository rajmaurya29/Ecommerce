import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,Card,Button,ListGroup,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams,useNavigate } from "react-router-dom";
import { fetchproductDetails } from '../redux/slices/ProductSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart,removeFromCart } from '../redux/slices/CartSlice'



function PlaceOrderScreen() {
    const dispatch=useDispatch();

    useEffect(()=>{
    },[ ]);
    const productDetail=useSelector((state)=>(state.products));
    const {productLoading,productData:product,productError}=productDetail;

    


  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
       <Row className='py-4'>
            
            <Col md={3}>

                <ListGroup >
                <ListGroup.Item>
                        <Row>
                            <Col className='mt-2'><h4>Order Summary </h4> </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row> 
                            <Col>Items: </Col>
                            <Col>${product.price } </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>{product.countInStock==0? "Out of Stock" : "In Stock"} </Col>
                        </Row>
                    </ListGroup.Item><ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>${product.price } </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total: </Col>
                            <Col>{product.countInStock==0? "Out of Stock" : "In Stock"} </Col>
                        </Row>
                    </ListGroup.Item>



                    <ListGroup.Item>
                        <Button className='btn-block px-5 mx-1 w-100 h-100' type='button'  disabled={product.countInStock==0}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        
        
        
    </div>
  )
}

export default PlaceOrderScreen