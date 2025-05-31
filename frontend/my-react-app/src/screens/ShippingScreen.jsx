import React,{useState,useEffect} from 'react'
import { Link,Navigate, useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {shipping} from '../redux/slices/CartSlice'
import CheckoutScreen from './CheckoutScreen'
function ShippingScreen() {
    const shipp=useSelector(state=>state.cart)
    // console.log(shipp.shipping.address);
    const [address,setAddress]=useState(shipp.shipping.address);
    const [city,setCity]=useState(shipp.shipping.city);
    const [postalCode,setPostalCode]=useState(shipp.shipping.postalCode);
    const [country,setCountry]=useState(shipp.shipping.country);
    const dispatch=useDispatch();
    const modeSelector = useSelector(state => state.darkMode.Mode);
    const navigate=useNavigate();
    const submitHandler=async(e)=>{
        e.preventDefault();
        // console.log({"address":address,"city":city,"postalCode":postalCode,"country":country});
        dispatch(shipping({"address":address,"city":city,"postalCode":postalCode,"country":country}));
        navigate("/payment/")
    }


  return (
    
    <FormContainer>
        <CheckoutScreen step1={true} step2={true} step3={false} step4={false}/>

        <Form onSubmit={submitHandler}>
            <Row>
                <h1 className={modeSelector ? 'text-white' : ''}>SHIPPING</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group className=' mb-4' controlId="formBasicPostalCode">
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type='text' placeholder='Enter PostalCode' value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}/>
            </Form.Group>
            <Form.Group className=' mb-4' controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country'  value={country} onChange={(e)=>setCountry(e.target.value)}/>
            </Form.Group>
            {/* <Link> */}
                <Button type='submit' className='ms-3'>
                    Continue
                </Button>
            {/* </Link> */}
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen