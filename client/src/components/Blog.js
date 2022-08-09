import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, Box, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title, description, image, userName, isUser, id}) => {
  const navigate = useNavigate();
  console.log(title,isUser, userName, id);

  const handleEdit = (e) => {
    navigate(`/userBlog/${id}`)
  }

  const refresh = () => {
    window.location.reload();
  }

  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    refresh();
    const data = await res.data;
    return data;
  }
  const handleDelete = (e) => {
    deleteRequest().then(() => navigate('/blogs'));
  }
  
  return (
    <div><Card sx={{ width: '40%', margin:'auto', mt:2, padding: 2, borderColor: 'red', borderWidth: '5px', boxShadow: '5px 5px 10px #ccc', ":hover":{ boxShadow: '10px 10px 20px #ccc' } }}>
      
    <CardHeader sx={{ height: '20px', mt: '2px'}}
      title={title}
    />
    <CardMedia
      component="img"
      height="194"
      image={image}
      alt="Provide a Image"
    /> 
    
    <CardContent>
    <hr/>
    <br/>
      <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {":"} {description}
      </Typography>
    </CardContent>

    {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto' }} ><EditIcon/></IconButton>
          <IconButton onClick={handleDelete} ><DeleteIcon/></IconButton>
      </Box>)}
  </Card>
  </div>
  )
}

export default Blog