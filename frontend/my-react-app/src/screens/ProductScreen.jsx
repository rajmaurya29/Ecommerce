import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,Card,Button,ListGroup,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams,useNavigate } from "react-router-dom";
import { fetchproductDetails } from '../redux/slices/ProductSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
    const navigate=useNavigate();
    const[qty,setQty]=useState(1);
    const prm=useParams();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchproductDetails(prm.id));
    },[dispatch,prm]);
    const productDetail=useSelector((state)=>(state.products));
    const {productLoading,productData:product,productError}=productDetail;

    const addToCartHandler=()=>{
        navigate(`/cart/${prm.id}?qty=${qty}`);
    }




  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        <h1>{product.name}</h1>
        {
            productLoading? <Loader/>
            :productError?<Message variant='danger'>{productError}</Message>
            :<Row className='py-4'>
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

                    {product.countInStock>0 && 
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty </Col>
                                <Col xs='auto' className='my-1'>
                                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)} >
                                        {[...Array(product.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                        )}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    }

                    <ListGroup.Item>
                        <Button className='btn-block px-5 mx-1 w-100 h-100' type='button' onClick={addToCartHandler} disabled={product.countInStock==0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        }
        
        
    </div>
  )
}

export default ProductScreen