
// React modules
import React, { useCallback, useState } from 'react';

// External modules
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone';

// Models
import { FeedState } from '../../models/feed';

// Actions
import { HideModal } from '../../models/feed';

// Styles
import './FeedForm.css';

const FeedForm = () => {
  const [fileInputStyle, setFileInputStyle] = useState("file-input file-input-default");
  const [files, setFiles] = useState([]);
  const modal = useSelector((state: { feed: FeedState }) => state.feed.modal);

  const dispatch = useDispatch();

  const handleFile = (acceptedFiles: any) => { 
    setFiles(acceptedFiles);
    console.log(files);
  }
  
  const onDrop = useCallback(handleFile, []);
  const { getRootProps, getInputProps, inputRef } = useDropzone({onDrop});

  return (
    <div 
      className={modal ? "modal-container modal-show" : "modal-container modal-hide"}
      onScroll={(e)=>{console.log(e)}} 
      onWheel={(e)=>{e.stopPropagation()}}
      onClick={()=>{dispatch(HideModal())}}
    >
      <div className="modal">
        <div className="modal-title">
          <div className="modal-title-side"></div>
          <div>새 게시물</div>
          <div className="modal-title-side"></div>
        </div>
        <div className="model-content">
          <div {...getRootProps()}>
            <div 
              className={fileInputStyle} 
              onDragOver={(e)=>setFileInputStyle("file-input file-input-drag")} 
              onDrop={(e)=>setFileInputStyle("file-input file-input-default")} 
              onClick={(e)=>e.stopPropagation()}
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
    </div>
  );
}
export default FeedForm;