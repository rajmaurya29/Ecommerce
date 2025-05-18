import React, { useState } from 'react'
import { ListGroup, Row,Col,Image,Form,Button } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {addToCart,removeFromCart} from '../redux/slices/CartSlice'
import { Link } from 'react-router-dom';

function CartScreen() {
  const items=useSelector((state)=>state.cart).cartItems;
  const dispatch=useDispatch();
  // console.log(items);
  const removeFromCartHandler=(x)=>{
    dispatch(removeFromCart(x))
  }
  const total=items.reduce((a,b)=>a+b.price*b.qty,0);
  // console.log(total);
  console.log(items)
  return (
    <>
    <h1>Items in cart</h1>
    {
      items.length===0?<h2>No items in cart</h2>:
      
        (<ListGroup variant='flush'>
          {items.map((x)=>
           <ListGroup.Item>
              <Row>
                <Col md={2} ><Image src={"http://localhost:8000/"+x.image} width={80} /></Col>
                <Col md={3}>{x.name}</Col>
                <Col md={2}>${x.price}</Col>
                <Col md={2}>qty:{x.qty}</Col>
                <Col md={2}>
                  <Form.Control as='select' value={x.qty} onChange={(e)=>dispatch(addToCart({product:x.product,qty:e.target.value}))} >
                                        {[...Array(x.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        )
                                        )}
                    </Form.Control>
                </Col>
                <Col md={1}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(x.product)}><i className='fas fa-trash'></i></Button>
                </Col>
              </Row>
           </ListGroup.Item>
          )
          }
    {
      <ListGroup.Item>
        <Row>
          <Col md={5}> <h2>Total:</h2>
          </Col>
          <Col md={7} > <h3>${total.toFixed(2)}</h3>
          </Col>
        </Row>
      </ListGroup.Item>
    }
          </ListGroup>
        )
      
    }
    <Link to='/shipping'>
      <Button type='submit' className='ms-3'>
        Proceed to address
      </Button>
    </Link>
    
    </>
  )
}

export default CartScreen