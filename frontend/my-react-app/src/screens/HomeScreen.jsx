import React,{useEffect,useState} from 'react'
// import products from '../products'
import {Container,Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios  from 'axios'

function HomeScreen() {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    const load=async()=>{
      const response=await axios.get("http://127.0.0.1:8000/api/products/");
      // console.log(response.data);
      setProducts(response.data);
    };
    load();
  },[]);

  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen