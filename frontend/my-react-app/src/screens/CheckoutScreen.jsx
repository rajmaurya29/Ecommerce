import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function CheckoutScreen({step1,step2,step3,step4}) {
  return (
    <Nav className='justify-content-center mb-4 mt-4'>
        <Nav.Item>
        {step1?
                <Link to='/login' style={{textDecoration:'none'}}>Login</Link>
            :
            <Nav.Link>Login</Nav.Link>
            
        }
        </Nav.Item>
        <Nav.Item>
        {step2?
                <Link to='/shipping' style={{textDecoration:'none'}}>Shipping</Link>
            :
            <Nav.Link>Shipping</Nav.Link>
            
        }
        </Nav.Item>
        <Nav.Item>
        {step3?
                <Link to='/payment' style={{textDecoration:'none'}}>Payment</Link>
            :
            <Nav.Link disabled>Payment</Nav.Link>
            
        }
        </Nav.Item>
        <Nav.Item>
        {step4?
                <Link to='/checkout' style={{textDecoration:'none'}}>Checkout</Link>
            :
            <Nav.Link  disabled>Checkout</Nav.Link>
            
        }
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutScreen