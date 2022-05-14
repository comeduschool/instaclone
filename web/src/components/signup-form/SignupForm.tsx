// React modules
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from "react-hook-form";
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Logo
import logo from '../../logo.png';

// Styles
import "../../App.css";

function SignunForm() {
  const emailOpts:RegisterOptions = {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  };

  const usernameOpts:RegisterOptions = {
    required: true,
    minLength: 6
  };

  const passwordOpts: RegisterOptions = {
    required: true,
    minLength: 6
  };
  
  // States
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });
  const nav = useNavigate();
  const [cookies] = useCookies();

  useEffect(()=>{
    if (cookies.csrftoken) {
      nav('/')
    }
  });
  
  // Handlers
  const handleValid = (d: any) => {
    axios.post("http://localhost:9991/users/signup", d)
      .then((resp)=>{
        console.log(resp);
        console.log(cookies.user);
        nav('/', {replace: true});
      })
      .catch((error)=>{
        let errors:string[] = [];
        Object.keys(error.response.data).map((key)=>{
          errors = [...errors.concat(error.response.data[key])];
          return null;
        });
        setErrorMsg(errors.join(" "));
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleValid)}>
      <img className="form-logo" src={logo} alt="logo.png"/>
      <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}/>
      <input className="form-input" type="text" placeholder="사용자이름" {...register("username", usernameOpts)}/>
      <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
      <button id="form-btn" type="submit" disabled={!isValid}>가입</button>
      { errorMsg !== "" && <div className="form-error">{errorMsg}</div> }
    </form>
  );
}
export default SignunForm;