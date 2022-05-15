// React modules
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

// Model
import { UserState } from '../../models/user';

// Service
import { UserService } from '../../services/UserService';

// Styles
import './User.css';

// Image
function Profile() {
  
  const [cookies] = useCookies();

  const dispatch = useDispatch();
  const { user, error } = useSelector((state: {user: UserState})=> state.user);
  
  const nav = useNavigate();
  
  useEffect(()=>{
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    } else {
      let userId = localStorage.getItem("userId");
      dispatch<any>(UserService.retrieve(+userId));
    }
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={user?.profile === "" ? user?.profile : "./profile.png"} alt="" />
            </div>
            <div className="profile-user-settings">
              <h1 className="profile-user-name">{user.username}</h1>
              <button className="btn profile-edit-btn" onClick={()=>nav('/profile')}>Edit Profile</button>
              <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
            </div>
            <div className="profile-stats">
              <ul>
                <li><span className="profile-stat-count">164</span> posts</li>
                <li><span className="profile-stat-count">0</span> followers</li>
                <li><span className="profile-stat-count">0</span> following</li>
              </ul>
            </div>
            <div className="profile-bio">
            <p><span className="profile-real-name">{user.username}</span> {user.description}</p>
            </div>
          </div>
        </div>
      </header>
      <div></div>
    </div>
  );
}

export default Profile;