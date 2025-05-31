import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {shipping} from '../redux/slices/CartSlice'
import CheckoutScreen from './CheckoutScreen'

function PaymentScreen() {
    const [paymentMethod,setPaymentMethod]=useState('paypal');
    const submitHandler=()=>{
        // console.log(paymentMethod);
    }
  return (
    <FormContainer>
        <CheckoutScreen step1={true} step2={true} step3={true} step4={false}/>

        <Form>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                    <Form.Check type='radio'  label='Paypal or Credit Card' id='paypal' name='paymentMethod'  checked onChange={(e)=>{setPaymentMethod(e.target.value)}}>

                    </Form.Check>
                </Col>
            </Form.Group>
            <Link to='/placeorder/'>
                <Button type='submit' className='ms-3'>
                    Continue
                </Button>
            </Link>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen    