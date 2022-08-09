import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import axios from 'axios';

function Blogs() {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/blog").catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(()=> {
    sendRequest().then((data) => setBlogs(data.blogs));
    // sendRequest().then((data) => console.log(data));
  },[]);

  // console.log(blogs);
  return (
    <div>
      {blogs && blogs.map((blog, index) => 
      (<Blog
        id={blog._id } key={index}
        isUser={localStorage.getItem("userId")=== blog.user._id}
        title={blog.title} description={blog.description} 
        image={blog.image} userName={blog.user.name}
      />))}
    </div>
  )
}

export default Blogs;