// React modules
import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import axios from 'axios';

// Styles
import './App.css';

// Components
import Header from './components/header/Header';

// Pages
import NotFound from './pages/not-found/NotFound';
import Signup from './pages/signup/Signup';
import Password from './pages/password/Password';
import Signin from './pages/signin/Signin';
import User from './pages/user/User';
import Profile from './pages/profile/Profile';
import Main from './pages/main/Main';
import FeedDetail from './pages/feed-detail/FeedDetail';
import Laboratroy from './pages/laboratory/Laboratory';

function App() {
  axios.defaults.baseURL = 'http://localhost:9991';
  axios.defaults.withCredentials = true
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  return (
    <div>
       <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/password" element={<Password/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/feeds/*" element={<Main/>} />
          <Route path="/feeds/:id" element={<FeedDetail />} />
          <Route path="/lab" element={<Laboratroy/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
