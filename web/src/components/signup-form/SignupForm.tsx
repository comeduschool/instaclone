// React modules
import React from "react";
import { useForm, RegisterOptions } from "react-hook-form";

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
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange' });

  // Handlers
  const handleValid = (d: any) => {
    console.log(d);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleValid)}>
      <img className="form-logo" src={logo} alt="logo.png"/>
      <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}/>
      <input className="form-input" type="text" placeholder="사용자이름" {...register("username", usernameOpts)}/>
      <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
      <button id="form-btn" type="submit" disabled={!isValid}>가입</button>
    </form>
  );
}
export default SignunForm;