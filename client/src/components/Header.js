import React, { useState } from 'react';
import './Header.css';
import {Link} from 'react-router-dom'
import {AppBar, Typography, Toolbar, Box, Button, Tabs, Tab} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';


const Header =() =>{
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState(0);
  return (
    <AppBar sx={{background: 'black'}} position='sticky'>
        <Toolbar>
            <Typography variant='h4' color={'yellow'}>Blogger.com</Typography>
            { isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
                <Tabs textColor='inherit' color={'yellow'} value={value} onChange={(e, val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab LinkComponent={Link} to="/userBlog" label="My Blogs"/>
                    <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
                </Tabs>
            </Box> }
            <Box display='flex' marginLeft='auto'>
                { !isLoggedIn &&  <Button 
                LinkComponent={Link} to="/authorise" 
                variant='contained' 
                sx={{margin: 1, borderRadius: 10}} 
                color='warning'>LOGIN</Button>
                }

                { isLoggedIn && <Button 
                onClick={()=>dispath(authActions.logout())}
                LinkComponent={Link} to="/authorise"
                variant='contained' 
                sx={{margin: 1, borderRadius: 10}} 
                color='warning'>LOGOUT</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header;