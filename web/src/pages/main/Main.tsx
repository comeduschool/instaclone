// React Modules
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


// Styles
import '../../App.css';

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
     
    </div>
  );
}

export default Main;