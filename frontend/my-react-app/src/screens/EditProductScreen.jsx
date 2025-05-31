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
import axios from 'axios'

function EditProductScreen() {
    const navigate=useNavigate();
    const[name,setName]=useState("");
    const[brand,setBrand]=useState("");
    const[category,setCategory]=useState("");
    const[description,setDescription]=useState("");
    const[image,setImage]=useState("");
    const[rating,setRating]=useState(0);
    const[numReviews,setNumReviews]=useState(0);
    const[price,setPrice]=useState(0);
    const[countInStock,setCountInStock]=useState(0);
    const prm=useParams();
    const dispatch=useDispatch();
    const modeSelector=useSelector(state=>state.darkMode.Mode);
    const detailSelector=useSelector(state=>state.products.productData)
    useEffect(()=>{
        
        dispatch(fetchproductDetails(prm.id));
        
    },[]);
    const productDetail=useSelector((state)=>(state.products));
    useEffect(()=>{
        setName(detailSelector.name)
        setBrand(detailSelector.brand)
        setCategory(detailSelector.category)
        setDescription(detailSelector.description)
        setImage(detailSelector.image);
        setRating(detailSelector.rating)
        setNumReviews(detailSelector.numReviews)
        setPrice(detailSelector.price)
        setCountInStock(detailSelector.countInStock)
    },[productDetail])


    const submitHandler=async(e)=>{
        e.preventDefault()
        dispatch(ProductUpdate([
            {
                "name":name,
                "brand":brand,
                "category":category,
                "description":description,
                "image":image,
                "rating":rating,
                "numReviews":numReviews,
                "price":price,
                "countInStock":countInStock
            },prm.id
        ]))
        navigate("/admin/products")
    }

    const fileUploadHandler=async(e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file);
        try{
            const data=await axios.post(`https://ecommerce-1-pt17.onrender.com/api/products/upload/${prm.id}/`,formData,{
                withCredentials:true,
                headers:{
                    'Content-Type':'multipart/form-data',
                }

            })
            // console.log(data);
            dispatch(fetchproductDetails(prm.id));
        }
        catch{

        }
    }

  return (
    <FormContainer>
        <Form onSubmit={submitHandler}>
            <Row>
                <h1 className={modeSelector ? 'text-white' : ''}>Edit Product Details</h1>
            </Row>
            <Form.Group className='mt-3 mb-4' controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type='text' placeholder='Enter product name' value={name}  onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e)=>setBrand(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formImage">
                <Form.Label>image</Form.Label>
                <Form.Control type='text' placeholder='Enter image' value={image}></Form.Control>
                <Form.Control
                type='file'
                    id='image-file'
                    label='Choose file'
                    custom
                    onChange={fileUploadHandler}
    
                    />

            </Form.Group>

            <Form.Group className='mt-3 mb-4' controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type='text' placeholder='Enter rating' value={rating} onChange={(e)=>setRating(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formNumReviews">
                <Form.Label>Number of Reviews</Form.Label>
                <Form.Control type='text' placeholder='Enter no. of reviews' value={numReviews} onChange={(e)=>setNumReviews(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type='text' placeholder='Enter price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mt-3 mb-4' controlId="formCountInStock">
                <Form.Label>No. of product</Form.Label>
                <Form.Control type='text' placeholder='Enter no. of product' value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}/>
            </Form.Group>
            

            
           
             
    
            <Button type='submit' className='mt-3'>
                Submit
            </Button>
        </Form>
    </FormContainer>
  )
}

export default EditProductScreen