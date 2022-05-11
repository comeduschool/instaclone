import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Main() {
  const nav = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("user") === null) {
      nav('/signin', {replace: true})
    }
  })

  return (
    <div>Main</div>
  );
}

export default Main;