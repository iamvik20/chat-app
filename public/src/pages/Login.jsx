// import React from 'react'

import { NavLink, useNavigate } from "react-router-dom"
import FormContainer from "../styled-components/FormContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import logo from '../assets/logo.svg'
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from '../styled-components/ToastOptions';

function Login() {
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginCredentials;

    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      })

      if (data.status) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.loginUser));        
        toast.success("looged in", toastOptions);
        navigate('/');
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  }

  const handleValidation = () => {
    const { email, password } = loginCredentials;
    if (password.length === 0) {
      toast.error('Password is required.',
        toastOptions
      );
      return false;
    }
    if (email.length === 0) {
      toast.error('Email is required.', toastOptions);
      return false;
    }
    return true
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Happy</h1>
          </div>
          <input
            type="email"
            name="email"
            placeholder='email'
            value={CredentialsContainer.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder='password'
            value={loginCredentials.password}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span className="login">Not a user? <NavLink to='/Register'>Create account</NavLink></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

export default Login