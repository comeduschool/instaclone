
// React modules
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

// External modules
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

// Components
import Slider from 'react-slick';

// Models
import { FeedState } from '../../models/feed';

// Actions
import { HideModal } from '../../models/feed';

// Styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FeedForm.css';

const FeedForm = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // className: 'slider',
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [files, setFiles] = useState([]);
  const modal = useSelector((state: { feed: FeedState }) => state.feed.modal);
  const [fileInputStyle, setFileInputStyle] = useState<string>("file-input file-input-default");
  const { register, getValues } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const onDrop = (acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file: File, index: number)=>{return {key: index, file: URL.createObjectURL(file), fileBlob: file}}));
  }
  
  const { getRootProps, getInputProps, inputRef } = useDropzone({onDrop, accept: {'image/*': []}});
  
  const postFeed = () => {
    const data = new FormData();
    const content = getValues('content');
    const sendFiles = files.map((obj: {fileBlob: Blob})=>obj.fileBlob);
    if (content === "") {
      setErrorMsg("내용을 입력해 주세요.");
    } else {
      data.append('content', content);
      sendFiles.forEach((value, index)=>{
        // data.append(`file_${index}`.padStart(2, '0'), value);
        data.append('images', value);
      });
      axios.post('/feeds', data)
        .then((resp)=>{
          dispatch(HideModal());
          nav('/');
        })
        .catch((error)=>{
          setErrorMsg(error.response.message);
        });
    }
  }

  return (
    <div 
      className={modal ? "modal-container modal-show" : "modal-container modal-hide"}
      onScroll={(e)=>{console.log(e)}} 
      onWheel={(e)=>{e.stopPropagation()}}
      onClick={()=>dispatch(HideModal())}
    >
      {files.length === 0 && 
        <div className={modal ? "modal1 modal-content-show" : "modal1 modal-content-hide"}  onClick={(e)=>e.stopPropagation()}>
          <div className="modal-title-container">
            <div className="modal-title">
              <div className="modal-title-side"></div>
              <div>새 게시물</div>
              <div className="modal-title-side"></div>
            </div>
          </div>
          <div className="modal-content-container">
            <div className="modal-image-content">
              <div 
                className={fileInputStyle} 
                onDragOver={(e)=>setFileInputStyle("file-input file-input-drag")} 
                onDrop={(e)=>setFileInputStyle("file-input file-input-default")} 
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <span className="file-icon material-icons-outlined">
                  photo_library
                </span>
                <div>사진을 여기다 끌어다 놓으세요.</div>
                <button className="file-btn" type="button"  onClick={()=>inputRef.current.click()}>컴퓨터에서 선택</button> 
              </div>
            </div>
          </div>
        </div>
      }
      { files.length > 0 && 
        <div className={modal ? "modal2 modal-content-show" : "modal2 modal-content-hide"} onClick={(e)=>e.stopPropagation()}>
          <div className="modal-title-container">
            <div className="modal-title">
              <div className="modal-title-side" onClick={(e)=>{e.stopPropagation(); setFiles([])}}>이전</div>
              <div>새 게시물</div>
              <div className="modal-title-side" onClick={()=>{postFeed()}}>다음</div>
            </div>
          </div>
          <div className="modal-content-container">
            <div className="modal-input-content">
              <div className="modal-content-slider">
                <Slider {...settings}>
                {
                  files.map( file =>
                    <div key={file.key}><img className="modal-content-slide-img" src={file.file} alt="" /></div>
                  )
                }
                </Slider>
              </div>
              <div className="modal-content-form">
                <div className="modal-content-form-user">
                  <div className="modal-content-form-profile">
                  <img className="modal-content-form-profile-img" src="https://i0.wp.com/colorcodedlyrics.com/wp-content/uploads/2021/07/seori-long-night.jpeg?fit=600%2C600&ssl=1" alt=""/>
                  </div>
                  <div className="modal-content-form-useranem">Heelo</div>
                </div>
                <div className="modal-content-form-input">
                  <textarea className="modal-context-input-text" {...register("content", {})} placeholder="문구 입력..."></textarea>
                </div>
                {errorMsg !=="" && <div className="form-error">{errorMsg}</div>}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
export default FeedForm;