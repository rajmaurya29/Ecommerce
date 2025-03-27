  import React from 'react'
  import { Navbar,Nav,Container } from 'react-bootstrap'
  import { useNavigate } from "react-router-dom";

  function Header() {
    const navigate=useNavigate();
    return (
      <header>
          <Navbar bg='dark' expand="lg"  variant='dark' >
          <Container>
                <Navbar.Brand onClick={()=>navigate('/')}>ProShop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link onClick={()=>navigate("/cart")}><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                  <Nav.Link onClick={()=>navigate("/login")}><i className='fas fa-user'></i> Login </Nav.Link>
              </Nav>
              </Navbar.Collapse>
          </Container>
          </Navbar>
      </header>
    )
  }

  export default Header   