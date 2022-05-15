// React modules
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Image
// import 
import '../../App.css';

let PassswordForm = ()=>{
    const emailOpts: RegisterOptions = {
      required: true,
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    };
    const codeOpts: RegisterOptions = {
      pattern: /^.{6}$/
    }
    const passwordOpts: RegisterOptions = {
      minLength: 6
    };

    const [errorMsg, setErrorMsg] = useState("");
    const [current, setCurrent] = useState("email");
    const [time, setTime] = useState(299);
    const [timeStr, setTimeStr] = useState("5:00");
    // const [counter, setCounter] = useState({time: 300, str:"5:00"});
    const [btnLabel, setBtnLabel] = useState("인증코드 전송하기.");
    const [cookies] = useCookies();
    const { register, setValue, getValues, reset, formState: { errors, isDirty } } = useForm({ mode: 'onChange' });
    const nav = useNavigate();

    useEffect(()=>{
      console.log(cookies.csrftoken);
      if (cookies.csrftoken) {
        nav('/');
      }
    })

    useEffect(()=>{
      if (current==="authcode") {
        const timer = setInterval(()=>{
          setTime(t=>t-1);
          if (time === 0) {
            clearInterval(timer);
          } 
        }, 1000);
      }
    }, [current]);

    useEffect(()=>{
      if (time >= 0) {
        let min = Math.floor((time-1) / 60);
        let sec = (time) % 60;
        let str = `${min}:${sec.toString().padStart(2, '0')}`;
        setTimeStr(str);
      }
    }, [time])

    const handleInputs = () => {
      if(current === "email") {
        let data = getValues();
        setValue('email', data.email, { shouldValidate: true, shouldDirty: true });
        if (errors?.email?.type==='required') {
          setErrorMsg("이메일을 입력해 주세요.");
        } else if (errors?.email?.type==="pattern") {
          setErrorMsg("이메일 형식에 맞지 않습니다.");
        } else if (isDirty && (errors.email === undefined)) {
          setErrorMsg("");
          reset({...data}, {keepDirty: false});
          axios.post("/users/authcode", data)
            .then((resp)=>{
              console.log(resp);
              setCurrent("authcode");
              setBtnLabel("인증코드를 입력하세요.");
              window.alert(`인증코드: ${resp.data.message}`);
            })
            .catch((error)=>{
              console.log(error);
              console.log(error.response.data.message);
              setErrorMsg(error.response.data.message);
            });
        }
      } else if (current === "authcode") {
        // 23b2c1
        let data = getValues();
        console.log(isDirty);
        console.log(data);
        console.log(errors);
        setValue('authcode', data.authcode, { shouldValidate: true, shouldDirty: true });
        if (errors?.authcode?.type === "pattern") {
          setErrorMsg("인증코드 형식에 맞지 않습니다.");
        } else if (isDirty && (errors.authcode===undefined)) {
          setErrorMsg("");
          reset({...data}, {keepDirty: false});
          axios.put("/users/authcode", data)
            .then((resp)=>{
              setCurrent("password");
              setBtnLabel("비밀번호 저장하기.");
            })
            .catch((error)=>{
              console.log(error);
              setErrorMsg(error.response.data.message);
            });
        }
      } else if (current === "password") {
        let data = getValues();
        console.log(isDirty);
        console.log(data);
        console.log(errors);
        setValue('password', data.password, { shouldValidate: true, shouldDirty: true });
        if (errors?.authcode?.type === "minLength") {
          setErrorMsg("비밀번호 형식에 맞지 않습니다.");
        } else if (isDirty && (errors.authcode===undefined)) {
          setErrorMsg("");
          reset({...data}, {keepDirty: false});
          axios.put("/users/password", data)
            .then((resp)=>{
              nav("/signin", {replace: true});
            })
            .catch((error)=>{
              console.log(error);
              setErrorMsg(error.response.data.message);
            });
        }
      }
    };

    return (
      <form className="password-form">
        <div className="form-content-title">
          로그인에 문제가 있나요?
        </div>
        <div className="form-content-subtitle">
          이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 인증코드를 보내드립니다.
        </div>
        {
          current==="email" &&
          <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)}></input>  
        }
        {
          current==="authcode" &&
          <div>
            <input className="form-input" type="text" placeholder="인증코드" {...register("authcode", codeOpts)}></input>
            <span>{timeStr}</span>
          </div>
        }
        {
          current==="password" &&
          <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}></input>
        }
        <button className="form-btn form-btn-blue" type="button" onClick={handleInputs}>{ btnLabel }</button>
        <Link className="link link-noline" to="/signup"><span className="form-password">새 계정 만들기</span></Link>
        {errorMsg !=="" && <div className="form-error">{errorMsg}</div>}
        <button className="form-btn form-btn-bottom" onClick={()=>{nav("/signin")}}>로그인으로 돌아가기</button>
      </form>
    );
}

export default PassswordForm;