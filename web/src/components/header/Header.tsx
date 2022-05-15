// React modules
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Styles
import './Header.css';
import '../../App.css';

// Logo
import logo from '../../logo2.png';

const Header = ()=>{
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  // document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  const handleLogout = () => {
    console.log(cookies);
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    } else {
      document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      localStorage.clear();
      nav('/signin', {replace: true});
    } 
  }

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left" onClick={()=>nav('/')}>
          <img className="logo" src={logo} alt="logo"/>
        </div>
        <div className="nav-right">
          <Link to="/"><i className="nav-item large material-icons">home</i></Link>
          <Link to="/lab"><i className="nav-item material-icons">add_box</i></Link>
          <Link to="/user"><i className="nav-item material-icons">person_outline</i></Link>
          <button className="nav-item" onClick={()=>handleLogout()}>{cookies.csrftoken ? "Logout" : "Login"}</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;