import React, { useEffect, useState } from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchproducts } from '../redux/slices/ProductSlice';
import { useLocation } from 'react-router-dom'

function SearchBox() {
    const [keyword,setKeyword]=useState("");
    const adminSelector=useSelector(state=>state.user.userInfo.isAdmin)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    let keyword_admin=location.pathname.includes("admin");
    // console.log("admni",keyword_admin)
    useEffect(()=>{
        setKeyword("");
    },[location])
    const submitHandler= (e)=>{
        e.preventDefault();
        // console.log(keyword)
        if(keyword && keyword_admin && adminSelector){
            navigate(`/admin/products/?keyword=${keyword}&page=1`)
           
        }
        else if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }
        
    }
   
  return (
    <>
        <Form onSubmit={submitHandler} className='d-flex' >
           
                
                <Form.Control type='text' placeholder='Enter product name' value={keyword}  onChange={(e)=>setKeyword(e.target.value)}/>
            
        
        <Button type='submit' variant='outline-success' className='ms-1 me-2 ' >
            Submit
        </Button>
        </Form>
    </>
  )
}

export default SearchBox