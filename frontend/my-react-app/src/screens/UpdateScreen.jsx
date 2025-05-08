import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form,Button,Row,Col,Container,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { fetchUser } from '../redux/slices/UserSlice'
import { fetchAllOrder } from '../redux/slices/AllOrderSlice'

function UpdateScreen() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const dispatch=useDispatch();
    const allOrder=useSelector(state=>state.allOrder.allOrders)
    // console.log(allOrder)
    const userLogin=useSelector(state=>state.user)
   
    const {userInfo,loading,error}=userLogin;
    useEffect(()=>{
            dispatch(fetchAllOrder())
    },[])
    useEffect(()=>{
        if(userInfo){
            
            setEmail(userInfo.email);
            setName(userInfo.name);
            
        }
        else{
            setName('');
            setEmail('');
        }
    },[userInfo]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        console.log(email);
        console.log(password);
        if(password!=confirmPassword){
            setMessage("Confirm Password do not match");
            // console.log("not matched");
        }
        else{
            try{
                const response= await axios.put("http://127.0.0.1:8000/api/users/update/",{"name":name,"email":email,"password":password},{withCredentials:true})
                // console.log(response.data);
                const response1=dispatch(fetchUser({"username":email,"password":password}))
                // console.log(response1);
            }
            catch(error){
                console.log(error.value)
            }
        }
        
    }


  return (
    <Container >
        <Row>
            <Col md={5}>

            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Row>
                    <h1>PROFILE</h1>
                </Row>
                <Form.Group className='mt-3 mb-4' controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mt-3 mb-4' controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='text' placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className=' mb-4' controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='text' placeholder='Enter new password' onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className=' mb-4' controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='text' placeholder='Enter new password again' onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <Button type='submit'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={7}>
                <h1>My orders</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                       allOrder.length && allOrder.map((order,index)=>(
                        <tr>
                            <td>{order["_id"]}</td>
                            <td>{order["createdAt"].slice(0,10)}</td>
                            <td>${order["totalPrice"]}</td>
                            {order["isPaid"]?<td>✔️</td>:<td>❌</td>}

                            {order["isDelivered"]?<td>Yes</td>:<td>NO</td>}
                        </tr>
                       ))
                    }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default UpdateScreen