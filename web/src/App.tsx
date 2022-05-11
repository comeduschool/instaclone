// React modules
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// Styles
import './App.css';

// Pages
import NotFound from './pages/not-found/NotFound';
import Signup from './pages/signup/Signup';
import Password from './pages/password/Password';
import Signin from './pages/signin/Signin';
import Profile from './pages/profile/Profile';
import Main from './pages/main/Main';
import FeedDetail from './pages/feed-detail/FeedDetail';
import Laboratroy from './pages/laboratory/Laboratory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/password" element={<Password/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/feeds/*" element={<Main/>} />
        <Route path="/feeds/:id" element={<FeedDetail />} />
        <Route path="/lab" element={<Laboratroy/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
