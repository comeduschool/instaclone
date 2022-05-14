import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Main() {
  const nav = useNavigate();
  const [cookies] = useCookies();

  useEffect(()=>{
    console.log(cookies.csrftoken);
    if (!cookies.csrftoken) {
      nav('/signin', {replace: true});
    }
  })

  return (
    <div>Main</div>
  );
}

export default Main;