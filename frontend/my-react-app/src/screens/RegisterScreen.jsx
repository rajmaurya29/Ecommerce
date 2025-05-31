import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { fetchUser } from '../redux/slices/UserSlice'

function RegisterScreen() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.user)
    const {userInfo,loading,error}=userLogin;
    const modeSelector = useSelector(state => state.darkMode.Mode);
    const submitHandler=async(e)=>{
        e.preventDefault();
        
        if(password!=confirmPassword){
            setMessage("Confirm Password do not match");
          
        }
        else{
            try{
                const response= await axios.post("https://ecommerce-1-pt17.onrender.com/api/users/register/",{"name":name,"email":email,"password":password},{withCredentials:true})
                // console.log(response.data);
                dispatch(fetchUser({"username":email,"password":password}))
               
            }
            catch(error){
                console.log(error.value)
            }
        }
        
    }
  return (
    <FormContainer>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Row>
                <h1 className={modeSelector ? 'text-white py-2' : 'py-2'}>REGISTER</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='text' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className=' mb-4' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type='text' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className=' mb-4' controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='text' placeholder='Enter password again' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </Form.Group>
            <Button type='submit'>
                Submit
            </Button>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen