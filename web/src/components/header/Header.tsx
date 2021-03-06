// React modules
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
  
// Model 
import { ShowModal } from '../../models/feed';


// Styles
import './Header.css';
import '../../App.css';

// Logo
import logo from '../../logo2.png';

const Header = ()=>{
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  const nav = useNavigate();
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
          <span onClick={()=>dispatch(ShowModal())}><i className="nav-item material-icons">add_box</i></span>
          <Link to="/user"><i className="nav-item material-icons">person_outline</i></Link>
          <button className="nav-item" onClick={()=>handleLogout()}>{cookies.csrftoken ? "Logout" : "Login"}</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;