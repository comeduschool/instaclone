// React modules
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Styles
import '../../App.css';

// Logo
import logo from '../../logo.png';

function SigninForm() {
  const emailOpts: RegisterOptions = {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  };
  const passwordOpts: RegisterOptions = {
    required: true,
    minLength: 6
  };

  // let errorMsg = "";
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });
  const nav = useNavigate();
  const [cookies] = useCookies();
  
  useEffect(()=>{
    if (cookies.csrftoken) {
      nav('/');
    }
  });

  const handleValid = (data: any) => {
    axios.post("/users/signin", data)
      .then((resp)=>{
        localStorage.setItem("userId", resp.data.pk);
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
      <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
      <button className="form-btn form-btn-blue" type="submit" disabled={!isValid}>로그인</button>
      <Link className="link" to="/password"><span className="form-password">비밀번호를 잊으셨나요?</span></Link>
      { errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
    </form>
  );
}
export default SigninForm;