// React modules
import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useForm, RegisterOptions } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// Model
import { UserState } from '../../models/user';
import { UpdateUser } from '../../models/user';

// Service
import { UserService } from '../../services/UserService';

// import 
import '../../App.css';
const ProfileForm = ()=>{
    const passwordOpts: RegisterOptions = {
      minLength: 6
    };
    const fileInput: any = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [isAuthed, setIsAuthed] = useState(false);
    const { register, getValues, formState: { errors } } = useForm({ mode: 'onChange' });
    const [cookies] = useCookies();
    
    const dispatch = useDispatch();
    const { user } = useSelector((state: {user: UserState})=> state.user);
    
    const nav = useNavigate();

    useEffect(()=>{
      if (!cookies.csrftoken) {
        nav('/signin', {replace: true});
      }
    });

    useEffect(()=>{
      if (isAuthed) {
        let userId = localStorage.getItem("userId");
        dispatch<any>(UserService.retrieve(userId));
      }
    }, [isAuthed]);

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

    const handleFile = async (e:any) => {
      if (e.target.value !== "") {
        let formData = new FormData();
        formData.append('profile', e.target.files[0]);
        let userId = localStorage.getItem("userId");
        axios.patch(`/users/${userId}/profile`, formData)
          .then((resp)=>{
            dispatch<any>(UpdateUser(resp.data));
            e.target.value = "";
          })
          .catch((error)=>{
            console.log(error);
            let e = "";
            Object.keys(error.response.data).map((key)=>{
              e = error.response.data[key]
              return null;
            });
            setErrorMsg(e);
          });
      }
    }

    const uploadImage = async () => {
      fileInput?.current.click();
      // file fileInput?.current?.input?.value
      
    }

    const removeImage = () => {
      let userId = localStorage.getItem("userId");
      axios.delete(`/users/${userId}/profile`)
        .then((resp)=>{
          dispatch<any>(UpdateUser(resp.data));
        })
        .catch((error)=>{
          console.log(error);
          let e = "";
          Object.keys(error.response.data).map((key)=>{
            e = error.response.data[key]
            return null;
          });
          setErrorMsg(e);
        });
    }
    const handleImage = () => {
      if (user?.profile === null) {
        uploadImage();
      } else {
        removeImage();
      }
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
            <div className="profile-container" onClick={handleImage}>
              <img src={user?.profile === null ?  "./profile.png" : user?.profile} alt="" />
            </div>
            <input style={{display:'none'}} type="file" accept="image/*" onChange={handleFile} ref={fileInput} />
            <input className="form-input" type="text" placeholder="사용자이름" {...register("username")} />
            <textarea className="form-textarea" placeholder="소개 및 인사말" maxLength={255} rows={3} {...register("description")} />
            <button className="form-btn form-btn-blue" type="button" onClick={handleProfile}>저장</button>
          </div>
        }
        {errorMsg !=="" && <div className="form-error">{errorMsg}</div>}
      </form>
    );
}

export default ProfileForm;