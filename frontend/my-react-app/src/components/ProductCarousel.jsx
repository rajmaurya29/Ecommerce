import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { topProducts } from '../redux/slices/TopProductsSlice';
import Loader from '../components/Loader'
import { Card } from 'react-bootstrap'
import Message from '../components/Message'
import { Carousel,Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCarousel() {
    const carouselSelector=useSelector(state=>state.topProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(topProducts())
    },[])
  return (
    carouselSelector.loading?<Loader/>:carouselSelector.error?<Message variant='danger'>{carouselSelector.error}</Message>:
    <Carousel pause='hover' className="product-carousel bg-dark mb-5 ">
        {
            carouselSelector.carousel.map((product,index)=>(
              
                      <Carousel.Item key={index}>
                      <Link to={`/product/${product._id}`}>
                         <Image  src={product.image} fluid/>
                         <Carousel.Caption className='carousel-caption'>
                            <h4>{product.name} (${product.price})</h4>
                         </Carousel.Caption>
                       </Link>
                     </Carousel.Item>
             
            ))
        }
    </Carousel>
  )
}

export default ProductCarousel