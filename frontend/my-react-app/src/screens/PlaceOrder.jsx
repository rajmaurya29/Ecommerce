import React,{useEffect,useState} from 'react'
import { Row,Col,Image,Card,Button,ListGroup,Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutScreen from './CheckoutScreen'
import { placeOrder,resetOrder } from '../redux/slices/OrderSlice'
import { clearCart } from '../redux/slices/CartSlice'
import { useNavigate } from 'react-router-dom'

function PlaceOrderScreen() {
    // const dispatch=useDispatch();
    const selector=useSelector((state)=>(state.cart.cartItems))
    const [countItem,setCountItem]=useState(0);
    const [shipping,setShipping]=useState(0);
    const [tax,setTax]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const placeSelector=useSelector((state)=>state.order);
    const userSelector=useSelector((state)=>state.user);
    const shippingSelector=useSelector((state)=>(state.cart.shipping));
    useEffect(()=>{
        // console.log(selector)
        let total=0;
        for(let i=0;i<selector.length;i++){
            total+=(selector[i].qty*selector[i].price);  
            // console.log(total)

        }
        setShipping(total);
        setCountItem(selector.length);
        setTax(total*0.1);

    },[ selector]);
    const productDetail=useSelector((state)=>(state.products));
    const {productLoading,productData:product,productError}=productDetail;
    
    const submitHandler=()=>{
        dispatch(placeOrder({
                orderItems:selector,
                shippingAddress:shippingSelector,
                paymentMethod:"payPal", 
                shippingPrice:shipping,
                taxPrice:tax,
                totalPrice:shipping+tax
        }))
       

    }
    useEffect(()=>{
        if(placeSelector.success ){
            localStorage.removeItem('cartItems')
            dispatch(clearCart())
            // console.log("placeselector",placeSelector.order._id);
            const newId=placeSelector.order._id;
            dispatch(resetOrder())
            navigate(`/order/${newId}`);
        }
    },[placeSelector,dispatch])
  return (
    <div>
        {/* <Link to='/' className='btn btn-light my-3'>Go Back</Link> */}

        <CheckoutScreen step1={true} step2={true} step3={true} step4={true} className='my-0'/>
        {
            !userSelector.userInfo &&
                <h1 className='text-danger mt-3'>Please login to place order</h1>
            
        }
            
       <Row className='py-4'>
            <Col md={9}>
                <Row>
                    <h1>
                        Shipping
                    </h1>
                    <h5 className='py-2'>
                        shipping: {shippingSelector.address}, {shippingSelector.city}, {shippingSelector.postalCode}, {shippingSelector.country}
                    </h5>
                    <hr/>
                </Row>
                <Row className='mt-3'>
                    <h1>
                        Payment Method
                    </h1>
                    <h5 className='py-2'>
                    Payment: Paypal
                    </h5>
                    <hr/>
                </Row>
                <Row className='mt-3'>
                    <h1>
                        order items
                    </h1>
                    {selector.map((x)=>
                               <ListGroup.Item className='my-2 ms-4'>
                                  <Row>
                                    <Col md={2} ><Image src={"http://localhost:8000/"+x.image} width={80} /></Col>
                                    <Col md={6}>{x.name}</Col>
                                    <Col md={4}>{x.qty} X ${x.price}=${(x.qty*x.price).toFixed(2)}</Col>
                                  </Row>
                               </ListGroup.Item>
                              )
                              }
                </Row>
            </Col>
            
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
                            <Col>{countItem} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>{shipping.toFixed(2)}</Col>
                        </Row>
                    </ListGroup.Item><ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>${tax.toFixed(2)} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total: </Col>
                            <Col>${(shipping+tax).toFixed(2)} </Col>
                        </Row>
                    </ListGroup.Item>



                    <ListGroup.Item >
                        <Button className='btn-block px-5 mx-1 w-100 h-100' onClick={submitHandler} type='submit'  disabled={selector==0 || !userSelector.userInfo}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        
        
        
    </div>
  )
}

export default PlaceOrderScreen