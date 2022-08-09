import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
    .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => setUserBlogs(data.userBlogs.blogs))
  }, []);
console.log(userBlogs);
  return (
    <div>
      {userBlogs && userBlogs.map((blog, index) => 
      (<Blog isUser={true} id={blog._id}
      key={index} title={blog.title} description={blog.description} 
        image={blog.image} userName={blog.user.name}
      />))}
    </div>
  )
}

export default UserBlogs;