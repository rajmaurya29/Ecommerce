import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Table,Image,Container,Card,Button,ListGroup,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams,useNavigate } from "react-router-dom";
import { fetchproductDetails } from '../redux/slices/ProductSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart,removeFromCart } from '../redux/slices/CartSlice'
import FormContainer from '../components/FormContainer'
import { PostReview } from '../redux/slices/ReviewSlice';

function ProductScreen() {
    const navigate=useNavigate();
    const[qty,setQty]=useState(1);
    const[rat,setRat]=useState(5);
    const[comment,setComment]=useState("");
    const modeSelector = useSelector(state => state.darkMode.Mode);

    const prm=useParams();
    const dispatch=useDispatch();
    const userSelector=useSelector(state=>state.user.userInfo)
    const reviewSelector=useSelector(state=>state.products.productData.reviews);
    useEffect(()=>{
        dispatch(fetchproductDetails(prm.id));
    },[dispatch,prm]);
    const productDetail=useSelector((state)=>(state.products));
    const {productLoading,productData:product,productError}=productDetail;

    const addToCartHandler=()=>{
        dispatch(addToCart({
            product:product._id,
            name:product.name,
            image:product.image,
            price:product.price,
            countInStock:product.countInStock,
            qty,

        }))
        navigate(`/cart/${prm.id}?qty=${qty}`);
    }

    const reviewHandler=(e)=>{
        e.preventDefault();
        dispatch(PostReview([{"name":userSelector.name,"rating":rat,"comment":comment},prm.id])).then()
        dispatch(dispatch(fetchproductDetails(prm.id)))
    }


  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        <h1 className={modeSelector ? 'text-white' : ''}>{product.name}</h1>
        {
            productLoading? <Loader/>
            :productError?<Message variant='danger'>{productError}</Message>
            :<Row className='py-4'>
            <Col md={6} >
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={6}>
                <ListGroup variant='flush' >
                    <ListGroup.Item ><h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item ><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/></ListGroup.Item>
                    <ListGroup.Item >Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
                <Card className="mt-3">
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col><strong>${product.price}</strong></Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row className="align-items-center">
                                    <Col>Qty:</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                            <Button
                                onClick={addToCartHandler}
                                className='btn-block w-100'
                                type='button'
                                disabled={product.countInStock <= 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        }
        
        <Container className="mt-5">
            <Row>
                <Col md={8}>
                    <h2>Write a Customer Review</h2>
                    {userSelector ? (
                    <Card>
                        <Card.Body>
                            <Form onSubmit={reviewHandler}>
                                <Form.Group controlId='rating' className="my-2">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={rat}
                                        onChange={(e) => setRat(e.target.value)}
                                    >
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment' className="my-2">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows='3'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type='submit' variant='primary' className="mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    ) : (
                        <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                    )}
                </Col>
            </Row>
        </Container>
        <h1 className={modeSelector ? 'text-white' : ''}>other Reviews</h1>
        {reviewSelector && reviewSelector.length ?
        <Table striped bordered hover responsive variant={modeSelector ? 'dark' : 'light'}>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody >
                { reviewSelector.map((review,index)=>(
                    
               
                    <tr key={index}>
                        <td>{review["_id"]}</td>
                        <td>{review["name"]}</td>
                        <td>{review["rating"]}</td>
                        <td>{review["comment"]}</td>
                    </tr>
                
                
                ))}</tbody>
                </Table>:
                
                <Message variant='danger'>No review found</Message>
            }
            
          
        
        
    </div>
  )
}

export default ProductScreen