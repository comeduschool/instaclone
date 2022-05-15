// React modules
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useForm, RegisterOptions } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Model
import { UserState } from '../../models/user';

// Service
import { UserService } from '../../services/UserService';

// import 
import '../../App.css';
import { tsConstructSignatureDeclaration } from '@babel/types';

let ProfileForm = ()=>{
    const passwordOpts: RegisterOptions = {
      minLength: 6
    };

    const [errorMsg, setErrorMsg] = useState("");
    const [isAuthed, setIsAuthed] = useState(false);
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const [cookies] = useCookies();
    
    const dispatch = useDispatch();
    const { user, error } = useSelector((state: {user: UserState})=> state.user);
    
    const nav = useNavigate();

    useEffect(()=>{
      if (!cookies.csrftoken) {
        nav('/signin', {replace: true});
      }
    });

    useEffect(()=>{
      let userId = localStorage.getItem("userId");
      dispatch<any>(UserService.retrieve(userId));
    }, []);

    const onChangePassword = (e: any) => {
      setErrorMsg(errors?.password?.message);
    }

    const handlePassword = ()=>{
      // dispatch<any(UserService.update(user));
      let password = getValues("password");
      if ( errors?.password?.type === 'minLength' || (errors?.password?.type===undefined && password==="")) {
        setErrorMsg("올바른 비밀번호 형식이 아닙니다.");
      } else {
        let password = getValues("password");
        let userId = localStorage.getItem("userId");
        axios.post(`/users/${userId}/password`, {password:password})
          .then((resp)=>{
            setIsAuthed(true);
            setErrorMsg("");
          })
          .catch((error)=>{
            console.log(error);
            setErrorMsg(error.response.data.message);
          });
      }
    };

    const handleProfile = ()=>{
      const [username, description] = getValues(["username", "description"]);
      let data = {...user, username, description}
      dispatch<any>(UserService.update(data));
      nav('/user');
    }

    return (
      <form className="profile-form">
        { isAuthed !== true &&
          <div>
            <div className="form-content-title">
              비밀번호 확인
            </div>
            <div className="form-content-subtitle">
              비밀번호를 다시한번 입력해주세요.
            </div>
            <input className="form-input" type="password" placeholder="비밀번호" {...register("password", {...passwordOpts, onChange: onChangePassword})} />
            <button className="form-btn form-btn-blue" type="button" onClick={handlePassword}>확인</button>
          </div>
        }
        { isAuthed === true &&
          <div>
            <div className="profile-container">
              <img src={user?.profile === "" ? user?.profile : "./profile.png"} alt="" />
            </div>
            <input className="form-input" type="text" placeholder="사용자이름" {...register("username")} />
            <textarea className="form-textarea" placeholder="소개 및 인사말" maxLength="255" rows="3" {...register("description")} />
            <button className="form-btn form-btn-blue" type="button" onClick={handleProfile}>저장</button>
          </div>
        }
        {errorMsg !=="" && <div className="form-error">{errorMsg}</div>}
      </form>
    );
}

export default ProfileForm;