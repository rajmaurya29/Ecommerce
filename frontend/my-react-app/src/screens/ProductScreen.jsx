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
            <Col md={3}>
                <ListGroup variant='flush' >
                    <ListGroup.Item ><h3>{product.name}</h3></ListGroup.Item>
                    <ListGroup.Item ><Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/></ListGroup.Item>
                    <ListGroup.Item ><strong>Price: ${product.price}</strong></ListGroup.Item>
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
                            <Col>{product.countInStock<=0? "Out of Stock" : "In Stock"} </Col>
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
                        <Button className='btn-block px-5 mx-1 w-100 h-100' type='button' onClick={addToCartHandler} disabled={product.countInStock<=0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        }
        
        <Container>
            <Row>
                <Col md={4}>
                {/* <FormContainer> */}
        {/* <Form onSubmit={reviewHandler}> */}
        <Form onSubmit={reviewHandler} className={modeSelector ? ' text-white' : 'bg-light'}>

            <Row>
            <h1 className={modeSelector ? 'text-white' : ''}>Review product</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formBasicName">
                <Form.Label>Rating</Form.Label>
                <Form.Control as='select' value={rat} onChange={(e)=>setRat(e.target.value)} >
                                        {[...Array(5).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                        )}
                                    </Form.Control>
            </Form.Group>
            
            <Form.Group className='mt-3 mb-4' controlId="formBasicComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control type='text' placeholder='Enter comment' value={comment} onChange={(e)=>setComment(e.target.value)}/>
            </Form.Group>
          
           
             
    
            <Button type='submit' className='mt-3 mb-5'>
                Submit review
            </Button>
        </Form>
    {/* </FormContainer> */}
                </Col>
            </Row>
        </Container>
        <h1 className={modeSelector ? 'text-white' : ''}>other Reviews</h1>
        
        <Table striped bordered hover variant={modeSelector ? 'dark' : 'light'}>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
            {
                reviewSelector && reviewSelector.length ? reviewSelector.map((review,index)=>(
                    
                <tbody>
                    <tr>
                        <td>{review["_id"]}</td>
                        <td>{review["name"]}</td>
                        <td>{review["rating"]}</td>
                        <td>{review["comment"]}</td>
                    </tr>
                </tbody>
                
                )):
                
                <Message variant='danger'>No review found</Message>
            }
            </Table>
          
        
        
    </div>
  )
}

export default ProductScreen