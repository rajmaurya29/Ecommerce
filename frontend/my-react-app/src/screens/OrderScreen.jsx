import React,{useEffect,useState} from 'react'
import { Row,Col,Image,Card,Button,ListGroup,Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutScreen from './CheckoutScreen'
import { useParams } from "react-router-dom";
import { fetchDetail } from '../redux/slices/OrderDetail'
import { payOrder } from '../redux/slices/PayOrderSlice'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';

import { deliveredOrder } from '../redux/slices/DeliveredOrderSlice';


function OrderScreen() {
    // const dispatch=useDispatch();
    const prm=useParams();
    // console.log(prm.id);
    const selector=useSelector((state)=>(state.orders.order.orderItems))
    // console.log("selector",selector)
    const [countItem,setCountItem]=useState(0);
    const modeSelector = useSelector(state => state.darkMode.Mode);
    const [shipping,setShipping]=useState(0);
    const [tax,setTax]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const paySelector=useSelector((state)=>state.pay);
    const userSelector=useSelector((state)=>state.user);
    const shippingSelector=useSelector((state)=>(state.orders.order.shippingAddress));
    const payHandler=()=>{
        dispatch(payOrder(prm.id))
        dispatch(fetchDetail(prm.id))
    }
    useEffect(()=>{
        dispatch(fetchDetail(prm.id))
    },[dispatch,prm.id,paySelector])
    useEffect(()=>{

        if(selector){
            let total=0;
            for(let i=0;i<selector.length;i++){
                total+=(selector[i].qty*selector[i].price);  
            }
        setShipping(total);
        setCountItem(selector.length);
        setTax(total*0.1);

        }
    },[selector]);
    const deliveredHandler=()=>{
        dispatch(deliveredOrder(prm.id));
        dispatch(fetchDetail(prm.id));
        // navigate("/admin/orders")
    }
    const orderInfo=useSelector((state)=>(state.orders.order))
    const productDetail=useSelector((state)=>(state.products));
    const {productLoading,productData:product,productError}=productDetail;
    
  return (
    <div>
        {/* <Link to='/' className='btn btn-light my-3'>Go Back</Link> */}

        <CheckoutScreen step1={true} step2={true} step3={true} step4={true} className='my-0'/>
      
        {
            !userSelector.userInfo ?
                <h1 className='text-danger mt-3'>Please login to see order</h1>
            :
        
            selector && 
            
            <Row className='py-4'>
                 <Col md={9}>
                     <Row>

                         <h1 className={modeSelector ? 'text-white' : ''}>
                             Shipping
                         </h1>
                         <h5  className={modeSelector ? 'text-white py-2' : 'py-2'}>
                             Name: {orderInfo.user.username}
                         </h5>
                         <h5  className={modeSelector ? 'text-white py-2' : 'py-2'}>
                             shipping: {shippingSelector.address}, {shippingSelector.city}, {shippingSelector.postalCode}, {shippingSelector.country}
                         </h5>
                         <h5  className={modeSelector ? 'text-white py-2' : 'py-2'}>
                             Created at: {orderInfo.createdAt}
                         </h5 >
                            {
                                orderInfo.isDelivered?
                                <Message variant='success'>Delivered</Message>:
                                <Message variant='danger'>Not delivered</Message>
                            }
                         <hr/>
                     </Row>
                     <Row className='mt-3'>
                         <h1  className={modeSelector ? 'text-white' : ''}>
                             Payment Method
                         </h1>
                         <h5 className={modeSelector ? 'text-white py-2' : 'py-2'}>
                         Payment: Paypal
                         </h5>
                         {
                                orderInfo.isPaid?
                                <Message variant='success'>Paid</Message>:
                                <Message variant='danger'>Not paid<Button className='ms-5' onClick={payHandler}>pay</Button></Message>
                            }
                         <hr/>
                     </Row>
                     <Row className='mt-3'>
                         <h1 className={modeSelector ? 'text-white' : ''}>
                             order items
                         </h1>
                         {selector.map((x,index)=>
                                    <ListGroup.Item className='my-2 ms-4' key={index}>
                                       <Row>
                                         <Col md={2} ><Image src={x.image} width={80} /></Col>
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
     
     
     
                     </ListGroup>
                     <Button className=' mt-3 w-100' onClick={deliveredHandler}> Mark as delivered </Button>
                     <ListGroup>
                        
                     </ListGroup>
                 </Col>
             </Row>
             
            
        
        
                            }    
    </div>
  )
}

export default OrderScreen