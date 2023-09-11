import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../ReduxToolkit/ChatSlice";
import DOMPurify from "dompurify";

function TextEditor() {
  const message = useSelector((state: any) => state.ChatSlice.Message);
  const dispatch = useDispatch();
  // const [editingMessage, setEditingMessage] = useState()

  const handleChange = (content, delta, source, editor) => {
    const value = DOMPurify.sanitize(content);

    dispatch(setMessage(value));
    
  };

  // const quillStyle = {
  //   width: "100%",
  //   border: "none"
  // };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      ["blockquote", "code-block"],
    ],
  };
  
  return (
    <div className="reactQuill">
      <ReactQuill  theme="snow" value={message.message} onChange={handleChange} modules={modules} />
    </div>
  );
}

export default TextEditor;
