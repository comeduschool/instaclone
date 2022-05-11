// React modules
import React from "react";
import { Link } from 'react-router-dom';
import { useForm, RegisterOptions } from "react-hook-form";

// Logo
import logo from '../../logo.png';

// Styles
import "../../App.css";

function SigninForm() {
  const emailOpts:RegisterOptions = {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  };
  const passwordOpts: RegisterOptions = {
    required: true,
    minLength: 6
  };

  // let errorMsg = "";
  
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });

  const handleValid = (d: any) => {
    console.log(d);
  };
  return (
    <form className="form" onSubmit={handleSubmit(handleValid)}>
      <img className="form-logo" src={logo} alt="logo.png"/>
      <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}/>
      <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
      <button id="form-btn" type="submit" disabled={!isValid}>로그인</button>
      <Link className="link" to="/password"><span className="form-password">비밀번호를 잊으셨나요?</span></Link>
    </form>
  );
}
export default SigninForm;