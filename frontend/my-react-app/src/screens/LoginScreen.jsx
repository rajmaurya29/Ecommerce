import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { fetchUser } from '../redux/slices/UserSlice'

function LoginScreen() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.user)
    const {userInfo,loading,error}=userLogin;
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(email);
        console.log(password);
        
        dispatch(fetchUser({"username":email,"password":password}))
        
    }
    useEffect(()=>{
        if(userInfo)
            navigate("/");
    },[userInfo,navigate]);
  return (
    <FormContainer>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        
        <Form onSubmit={submitHandler}>
            <Row>
                <h1>SIGN IN</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='text' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className=' mb-4' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Button type='submit'>
                Submit
            </Button>
            <Row>
                <Col  className='mt-2'>Not registered? <Link to="/register"> Register here</Link></Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default LoginScreen