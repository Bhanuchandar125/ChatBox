import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import "./ChatContainer.css";

const TestMessageInputSection = (props:any) => {
  const [isEmojiOpen, setEmojiOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const handleEmojiSelect = (e) => {
    const emoji = e.native;
    props.setMessage({ ...props.message, name: props.message.name + emoji });
  };

  const handleTextEditorClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={`inputsection ${isExpanded ? "expanded" : ""}`}>
      <div className="input-row">
        <div className="text-editor-icon" onClick={handleTextEditorClick}>
          <HiOutlinePencilAlt />
        </div>
        <input
          type="text"
          className="textinput"
          onChange={props.handlechangeMessage}
          placeholder="Type Message..."
          value={props.message?.name}
          onDragOver={(e) => e.preventDefault()}
          onDrop={props.handleFileDrop}
        //   onKeyDown={handleEnterKeyPress}
        />
        <label htmlFor="fileInput" className="file-select-icon">
          <BiUpload />
        </label>
        <label className="emoji-icon" /*onClick={handleEmojiIconClick}*/>
          <EmojiEmotionsOutlinedIcon />
        </label>
        <label
          className="send-icon"
          onClick={
            props.editIndex !== null ? props.handleEditSave : props.handleSend
          }
        >
          <AiOutlineSend />
        </label>
      </div>
      {isExpanded && (
        <div className="expanded-row">
          {/* Additional icons here */}
        </div>
      )}
      {isEmojiOpen && (
        <div className="emojiPickerContainer">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default TestMessageInputSection;
