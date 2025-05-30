  import React, { useEffect } from 'react'
  import { Navbar,Nav,Container,NavDropdown } from 'react-bootstrap'
  // import { LinkContainer } from 'react-router-bootstrap'
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch,useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/UserSlice';
import SearchBox from './SearchBox';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { turnOff, turnOn } from '../redux/slices/DarkModeSlice';

  function Header() {
    const userInfo=useSelector(state=>state.user.userInfo);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logoutHandler=()=>{
      dispatch(logoutUser());
      navigate("/");
    }
    // const darkModeOn=()=>{
    //   dispatch(turnOn());
    // }
    // const darkModeOff=()=>{
    //   dispatch(turnOff());
    // }
    const modeSelector=useSelector(state=>state.darkMode.Mode)
    const toggle=()=>{
      // console.log("toggle");
      modeSelector?dispatch(turnOff()):dispatch(turnOn());
    }
    return (
      <header>
         
          <Navbar bg='dark' expand="lg"  variant='dark' >
          <Container>
                <Navbar.Brand as={Link} to='/'>ProShop</Navbar.Brand>
                
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
             
              <Navbar.Collapse id="basic-navbar-nav">

             
              <SearchBox/>
              
              <Nav className="ms-auto ">
              <DarkModeSwitch checked={!modeSelector} onClick={toggle} className='mt-2 me-3'/>
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
                 
                  {
                    userInfo && userInfo.isAdmin &&
                    (
                      <NavDropdown title="Admin">
                        
                          <NavDropdown.Item as={Link} to='/admin/users' >users</NavDropdown.Item>
                          <NavDropdown.Item as={Link} to='/admin/products' >products</NavDropdown.Item>
                          <NavDropdown.Item as={Link} to='/admin/orders' >orders</NavDropdown.Item>
                        
                      </NavDropdown>
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