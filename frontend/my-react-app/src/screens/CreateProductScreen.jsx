import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row,Col,Image,Card,Button,ListGroup,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams,useNavigate } from "react-router-dom";
import { fetchproductDetails } from '../redux/slices/ProductSlice'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { addToCart,removeFromCart } from '../redux/slices/CartSlice'
import { ProductUpdate } from '../redux/slices/ProductUpdate';
import { CreateProduct } from '../redux/slices/CreateProductSlice';


function CreateProductScreen() {
    const navigate=useNavigate();
    const[name,setName]=useState("");
    const[brand,setBrand]=useState("");
    const[category,setCategory]=useState("");
    const[description,setDescription]=useState("");
    const[rating,setRating]=useState(0);
    const[numReviews,setNumReviews]=useState(0);
    const[price,setPrice]=useState(0);
    const[countInStock,setCountInStock]=useState(0);
    const dispatch=useDispatch();

    const submitHandler=async(e)=>{
        e.preventDefault()
        dispatch(CreateProduct(
            {
                "name":name,
                "brand":brand,
                "category":category,
                "description":description,
                "rating":rating,
                "numReviews":numReviews,
                "price":price,
                "countInStock":countInStock
            }
        ))
        navigate("/admin/products")
    }


  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <Row>
                <h1>Enter New Product Details</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type='text' placeholder='Enter product name' onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' placeholder='Enter brand'  onChange={(e)=>setBrand(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter category' onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type='text' placeholder='Enter rating' onChange={(e)=>setRating(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formNumReviews">
                <Form.Label>Number of Reviews</Form.Label>
                <Form.Control type='text' placeholder='Enter no. of reviews'  onChange={(e)=>setNumReviews(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type='text' placeholder='Enter price' onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formCountInStock">
                <Form.Label>No. of product</Form.Label>
                <Form.Control type='text' placeholder='Enter no. of product' onChange={(e)=>setCountInStock(e.target.value)}/>
            </Form.Group>
            

            
           
             
    
            <Button type='submit' className='mt-3'>
                Submit
            </Button>
        </Form>
    </FormContainer>
  )
}

export default CreateProductScreen