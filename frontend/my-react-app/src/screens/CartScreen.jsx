import React from 'react'
import { ListGroup, Row,Col,Image,Form,Button } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {addToCart,removeFromCart} from '../redux/slices/CartSlice'

function CartScreen() {
  const items=useSelector((state)=>state.cart).cartItems;
  const dispatch=useDispatch();
  console.log(items);
  const removeFromCartHandler=(x)=>{
    // console.log(x);
    dispatch(removeFromCart(x))
  }

  return (
    <>
    <h1>Items in cart</h1>
    {
      items.length===0?<h2>No items in cart</h2>:
      
        (<ListGroup variant='flush'>
          {items.map((x)=>
           <ListGroup.Item>
              <Row>
                <Col md={2} ><Image src={x.image} width={80} /></Col>
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
          )}
          </ListGroup>
        )
      
    }
    
    </>
  )
}

export default CartScreen