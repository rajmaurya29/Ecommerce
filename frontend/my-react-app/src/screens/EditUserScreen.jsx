import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { fetchUser } from '../redux/slices/UserSlice'
import { GetUser } from '../redux/slices/GetUserSlice'
import { UserAdminUpdate } from '../redux/slices/UserAdminUpdate'

function EditUserScreen() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const dispatch=useDispatch();
    const [isAdmin,setIsAdmin]=useState(false);
    const id=useParams();
    const navigate=useNavigate();
     const modeSelector = useSelector(state => state.darkMode.Mode);
    const selector=useSelector(state=>state.userDetail.UserDetail)
    useEffect(()=>{
        dispatch(GetUser(id.id));
        
    },[])
    useEffect(()=>{
        setName(selector.name);
        setEmail(selector.email)
        setIsAdmin(selector.isAdmin)
    },[selector])
    // console.log(selector)
    const submitHandler=async(e)=>{
        e.preventDefault();
        // console.log(isAdmin)
        dispatch(UserAdminUpdate([{"name":name,"email":email,"isAdmin":isAdmin},id.id]))
        navigate("/admin/users");
    }
  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <Row>
                <h1 className={modeSelector ? 'text-white' : ''}>Edit</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name'  value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='text' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group  controlId="isAdmin">
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e)=>setIsAdmin(e.target.checked)}
                >

                </Form.Check>
            </Form.Group>
           
             
    
            <Button type='submit' className='mt-3'>
                Submit
            </Button>
        </Form>
    </FormContainer>
  )
}

export default EditUserScreen