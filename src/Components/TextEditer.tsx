import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../ReduxToolkit/ChatSlice';
import DOMPurify from 'dompurify';


function TextEditor() {
  const message = useSelector((state:any) => state.ChatSlice.Message);
  const dispatch = useDispatch();

  const handleChange = (content, delta, source, editor) => {
 
    const value = DOMPurify.sanitize(content);
    console.log(typeof value)
    
    dispatch(setMessage(value));
  };

  
  const quillStyle = {
    width: '100%', 
    
  };
  const modules = {
    toolbar: [
       
      ['bold', 'italic', 'underline', 'strike'],  
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      [{ 'align': [] }],  
      ['blockquote', 'code-block'],  
    ],
  };
console.log("message", message)
  return (
    <div style={quillStyle}>
      <ReactQuill theme="snow"  onChange={handleChange} modules={modules} />
    </div>
  );
}

export default TextEditor;
