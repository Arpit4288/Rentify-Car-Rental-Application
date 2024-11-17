import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../../Assets/BrandLogo.png'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const Header = () => {

  const {isAuthenticated, user, userError, userMessage, userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }
  const handleLogout = () => {
    dispatch({ type: 'logoutUser' });
    toast.success("Logout Successfuly");
    navigate('/');
  }

  return (
    <>
      <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary header">
        <Container fluid>
          <Link to='/' className='Brand-logo'>
            <Navbar.Brand>
              <img src={BrandLogo} width={140} height={40} alt="" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='Link' title='Home page' to={'/'}>
                Home
              </Link>
              <Link className='Link' title='Know about us' to={'/about'}>
                About us
              </Link>
              {isAuthenticated &&
                <>
                  <Link className='Link' title='All Rental Agreements' to={'/agreements'}>
                    {user.role == "Admin" ? "All Agreement" : "My Agreements"}
                  </Link>
                 { user.role == "Admin" && <Link className='Link' title='All Rental Agreements' to={'/add-car'}>
                    Add Car
                  </Link>}
                </>
              }

            </Nav>
            <div style={{ display: 'flex', direction: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {isAuthenticated && <span className='text-muted' style={{ marginRight: '2rem' }}>Hello {user.fullName}</span>}
              {isAuthenticated ?
                <Button style={{ backgroundColor: '#61677A' }} variant="" onClick={handleLogout}>Logout</Button>
                :
                <Button style={{ backgroundColor: '#61677A' }} variant="" onClick={handleLogin}>Login</Button>
              }
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header