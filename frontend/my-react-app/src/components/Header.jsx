  import React from 'react'
  import { Navbar,Nav,Container,NavDropdown } from 'react-bootstrap'
  // import { LinkContainer } from 'react-router-bootstrap'
  import { Link } from "react-router-dom";
  import { useDispatch,useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/UserSlice';

  function Header() {
    const userInfo=useSelector(state=>state.user.userInfo);
    const dispatch=useDispatch();
    const logoutHandler=()=>{
      dispatch(logoutUser());
    }
    // console.log(userInfo);
    return (
      <header>
          <Navbar bg='dark' expand="lg"  variant='dark' >
          <Container>
                <Navbar.Brand as={Link} to='/'>ProShop</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link as={Link} to='/cart'><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                  {
                    userInfo ?
                    (
                      <NavDropdown title={userInfo.name}>
                        
                          <NavDropdown.Item as={Link} to='/profile' >Profile</NavDropdown.Item>
                          <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                        
                      </NavDropdown>
                    ):
                    (
                      <Nav.Link as={Link} to='/login' ><i className='fas fa-user'></i> Login </Nav.Link>

                    )
                  }
                  
              </Nav>
              </Navbar.Collapse>
          </Container>
          </Navbar>
      </header>
    )
  }

  export default Header   