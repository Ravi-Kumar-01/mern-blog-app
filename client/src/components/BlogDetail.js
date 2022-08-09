import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
const labelStyles = {mb:1, mt:2, fontSize: '24px', fontWeight: 'bold'}

function BlogDetail() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
 });

  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate('/userBlog'));
  }

  const [blog, setBlog] = useState();
  const id = useParams().id;

  const fetchDetail = async () =>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err=> console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetail().then(data => {
      setBlog(data.blog)
      setInputs({title: data.blog.title, description: data.blog.description })
    })
  }, [id]);

  const sendRequest = async () =>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err => console.log(err));

    const data = await res.data;
    return data
  }

  return (
    <div>
      {inputs && 
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor='green' borderRadius={10} boxShadow='10px 10px 20px #ccc' padding={3} margin={'auto'} marginTop={5} display='flex' flexDirection={'column'} width={'60%'}>
          <Typography>Post Your Blog</Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
            <Button type='submit'  sx={{margin: 1, borderRadius: 3, backgroundColor:'black', color: 'yellow',
                ":hover": {backgroundColor:'yellow', color: 'black'}}} >Submit</Button>
        </Box>
      </form>
      }
    </div>
  )
}

export default BlogDetail;