import React, { useState } from 'react';
import axios from 'axios';
import {Box, Button, TextField, Typography} from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Authorise = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: '', email: '', password: ''})
  
  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type='login') => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data); 
    return data
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(inputs);
    if(isSignup) {
      sendRequest("signup").then((data)=> localStorage.setItem("userId",data.user._id))
      .then(()=> dispath(authActions.login()))
      .then(()=> navigate("/blogs"))
    } else {
      sendRequest().then((data)=> localStorage.setItem("userId",data.user._id))
      .then(()=> dispath(authActions.login()))
      .then(()=> navigate("/blogs"))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          maxWidth={400}
          display='flex'
          flexDirection={'column'}
          alignItems = 'center'
          justifyContent={'content'}
          boxShadow = '10px 10px 20px #CCC'
          padding={3}
          margin = 'auto'
          marginTop={5}
          borderRadius={5} 
          border='solid'
          borderColor={'yellow'}
        >
          <Typography padding={3} textAlign='center' variant='h4'>
            {isSignup ? 'Signup' : 'Login'} </Typography>

          { isSignup && <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>}
          <TextField name='email' borderColor={'yellow'} onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email: test@gmail.com' margin='normal'/>
          <TextField name='password' onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password: test@123' margin='normal'/>
          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3}} color='warning'>Submit</Button>
          <p style={{color: 'blue', marginTop: '23px'}}> {!isSignup ? "Don't have account ?": "Already register?"} </p>
          <Button onClick={()=> setIsSignup(!isSignup)} type='submit' variant='contained' 
                sx={{margin: 1, borderRadius: 3, backgroundColor:'black', color: 'yellow',
                ":hover": {backgroundColor:'yellow', color: 'black'}}}>
            Switch to { isSignup ? 'Login' : 'Signup'} </Button>
        </Box>
      </form>
    </div>
  )
}

export default Authorise;