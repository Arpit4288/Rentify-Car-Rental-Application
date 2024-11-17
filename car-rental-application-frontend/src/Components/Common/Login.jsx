import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Actions/userActions';

import { useSelector } from 'react-redux';

import {toast} from 'react-toastify';
import LoadingSpinners from './LoadingSpinners';

const Login = () => {

  const {isAuthenticated, user, userError, userMessage, userLoading} = useSelector(state => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));  
  }

  useEffect(() => {
    if(userMessage){
      if(userMessage == "Success"){
        toast.success("Loged In successfuly");
        setEmail("");
        setPassword("");
      }
      if(userMessage == "Failed"){
        toast.warning("Invalid Email or Password");
        setEmail("");
        setPassword("");
      }
      dispatch({type: 'clearMessage'});
    }
    if(userError){
      toast.error(userError);
      dispatch({type: 'clearError'})
      setPassword("");
    }

    if(isAuthenticated){
      navigate('/');
    }


  }, [userMessage, userError, isAuthenticated])
  

  return (
    <>
    <LoadingSpinners show={userLoading}/>
      <section className="form box-shadow">
        <div className="form-child">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label><span className='text-danger'>*</span>
              <Form.Control value={email} size="sm" type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label><span className='text-danger'>*</span>
              <Form.Control value={password} size="sm" type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="" style={{ backgroundColor: '#272829', color: 'white' }} type="submit">
              Login
            </Button>
          </Form>
        </div>
      </section>
    </>
  )
}

export default Login