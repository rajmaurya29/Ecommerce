import React,{useEffect,useState} from 'react'

import {Container,Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios  from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { fetchproducts } from '../redux/slices/ProductSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
  const dispatch=useDispatch();
  const location=useLocation();
  let keyword=location.search;
  let keyword_pass="";
  try{
    keyword_pass=keyword.split("keyword=")[1].split("&page")[0];
  }
  catch{
    keyword_pass="";
  }
  useEffect(()=>{
    dispatch(fetchproducts(keyword));
    
  },[dispatch,keyword]);
  
  const productList=useSelector(state=>state.products) ;
  const {isLoading,data:products,error,page,pages}=productList ;
  // console.log(productList.pages)
  return (
    <div>
       <h1>Latest Products</h1>
      {!keyword && <ProductCarousel/>}
     
      {
          isLoading ? <Loader/>
          :error?<Message variant='danger'>{error}</Message>
          :<div>
            <Row>
              {products.map(product=>(
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
           <Paginate page={page} pages={pages}  keyword={keyword_pass}/>
          </div>
      }
       
    </div>
  )
}

export default HomeScreen