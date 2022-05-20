// React Modules
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Components
import FeedForm from '../../components/feed-form/FeedForm';
import FeedList from '../../components/feed-list/FeedList';

// Styles
import '../../App.css';
import './Main.css';

function Main() {
  const nav = useNavigate();
  const [cookies] = useCookies();

  useEffect(()=>{
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    }
  })

  return (
    <div>
      <FeedList />
      {/* <div className="modal-container" onScroll={(e)=>e.stopPropagation()} onWheel={(e)=>e.stopPropagation()}> */}
      <FeedForm />
    </div>
  );
}

export default Main;