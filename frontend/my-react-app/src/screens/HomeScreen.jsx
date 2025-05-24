import React,{useEffect,useState} from 'react'
// import products from '../products'
import {Container,Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios  from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { fetchproducts } from '../redux/slices/ProductSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchproducts());
    
  },[dispatch]);
  
  const productList=useSelector(state=>state.products) ;
  const {isLoading,data:products,error}=productList ;
  // console.log(products); 

  console.log(error);
  return (
    <div>
      <h1>Latest Products</h1>
      {
          isLoading ? <Loader/>
          :error?<Message variant='danger'>{error}</Message>
          :<Row>
              {products.map(product=>(
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
      }
        
    </div>
  )
}

export default HomeScreen