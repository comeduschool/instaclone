import React from 'react';
import { useParams } from "react-router";

// Assets
import Profile from './profile.png';
import Pic1 from './1.jpg';
import Pic2 from './2.jpg';
import Pic3 from './3.jpg';
import './FeedDetail.css';

function FeedDetail({ userID: Number }) {
  return (
    <div className="feed">
      <div className="info">
        <div className="user">
          <div className="profile-image">
            <img src={Profile} alt="" />
          </div>
          <p className="username">modern_web_channel</p>
        </div>
        <i className="material-symbols-outlined">more_vert</i>
      </div>
      <img src={Pic1} className="feed-image" alt="" />
      <div className="feed-content">
        <div className="reaction-wrapper">
          <i className="material-symbols-outlined">favorite_border</i>
          <i className="material-symbols-outlined">mode_comment</i>
          <i className="material-symbols-outlined">send</i>
          <i className="save material-symbols-outlined">bookmark_border</i>
        </div>
        <p className="likes">1,012 likes</p>
        <p className="description"><span>username </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
        <p className="feed-time">2 minutes ago</p>
      </div>
      <div className="comment-wrapper">
        <i className="icon material-symbols-outlined">sentiment_satisfied</i>
        <input type="text" className="comment-box" placeholder="Add a comment" />
        <button className="comment-btn">post</button>
      </div>
    </div>
  );
}

export default FeedDetail;