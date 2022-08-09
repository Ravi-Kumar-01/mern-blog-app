import './App.css';
import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Authorise from './components/Authorise';
import Blogs from './components/Blogs';
import UserBlog from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispath(authActions.login());
    }
  }, [dispath])
  
  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          { !isLoggedIn ? <>
            <Route path='/' element={<Authorise/>}/>
          <Route path='/authorise' element={<Authorise />}/>
          </> :
          <>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/userBlog' element={<UserBlog />}/>
          <Route path='/userBlog/:id' element={<BlogDetail />}/>
          <Route path='/blogs/add' element={<AddBlog />}/>
          </>
          }
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
