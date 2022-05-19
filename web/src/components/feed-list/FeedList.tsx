// React modules
import React, { useState, useEffect, useRef } from 'react';

// Components
import FeedDetail from './FeedDetail';

// Assets
import Profile from './profile.png';
import Pic1 from './1.jpg';
import Pic2 from './2.jpg';
import Pic3 from './3.jpg';
import './FeedDetail.css';

const FeedList = () => {
  return (
    <div className="feeds">
      <FeedDetail />
      <FeedDetail />
      <FeedDetail />
      <FeedDetail />
      <FeedDetail />
    </div>
  );
}

export default FeedList;