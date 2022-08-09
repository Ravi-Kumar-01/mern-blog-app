import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const labelStyles = {mb:1, mt:2, fontSize: '24px', fontWeight: 'bold'}

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '', description: '', image: ''});

  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=> navigate('/userBlog'));
  }

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    }).catch(err=> console.log(err));
    const data = await res.data;
    return data
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor='yellow' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={5} display='flex' flexDirection={'column'} width={'50%'}>
          <Typography display={'flex'} variant='h4' justifyContent={'center'} alignContent={'center'}>Post Your Blog</Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
            <InputLabel sx={labelStyles}>ImageLink</InputLabel>
            <TextField name='image' onChange={handleChange} value={inputs.image} margin='auto' variant='outlined'/>
            <Button type='submit'  sx={{margin: 1, borderRadius: 3, backgroundColor:'black', color: 'yellow',
                ":hover": {backgroundColor:'yellow', color: 'black'}}} >Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog;