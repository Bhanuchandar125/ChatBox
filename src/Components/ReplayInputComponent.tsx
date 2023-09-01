import React, { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ReplayMessage.css";
import { MessageBox } from "react-chat-elements";
import { BiUpload } from "react-icons/bi";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { AiOutlineSend } from "react-icons/ai";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { EmojiClick, EmojiSelect, setMessage,sendMessages } from "../ReduxToolkit/ChatSlice";
// import {Message} from './Context'

const ReplayInputComponent = () => {
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
const dispatch = useDispatch()

const Message = useSelector((state:any)=>state.ChatSlice.Message)

  const Replaymessage = useSelector(
    (state: any) => state.ChatSlice.ReplayState
  );
  const EmojiOpen = useSelector((state:any)=>state.ChatSlice.EmojiOpen)

  const handleOnChange=(e:any)=>{
    const value = e.target.value 
    dispatch(setMessage(value))
  }
  
console.log("Message", Message)
 const handleEmojiClick=()=>{
 dispatch(EmojiClick(!EmojiOpen))
 }
 const handleEmojiSelect=(e:any)=>{
   const emoji = e.native;
  //  setMessage({...message, Message:message+emoji})
  dispatch(EmojiSelect(emoji))
 }
 const handlesend=()=>{
  dispatch(sendMessages(Message))
 }

 
  return (
    <div className="inputOpen">
      <div>
        {Replaymessage.prevmsgType.startsWith("video") ? (
          <video controls className="videoContainer">
            <source src={Replaymessage.Message} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : Replaymessage.prevmsgType.startsWith("image") ? (
          <img
            src={Replaymessage.Message}
            alt={`Uploaded`}
            className="imageContainer"
          />
        ) : (
          <MessageBox
            title="Liam Johnson"
            type="text"
            text={Replaymessage.Message}
            replyButton={false}
          />
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type Message..."
          className="textinput"
          value={Message.message}
          onChange={handleOnChange}
          
        />
        <label htmlFor="fileInput">
          <BiUpload className="customFileInput" />
        </label>
        <input
          type="file"
          id="fileInput"
          // onChange={props.handleFileSelect}
          multiple
          style={{ display: "none" }}
        />
        <label className="emojibg" onClick={handleEmojiClick}>
          <EmojiEmotionsOutlinedIcon />
        </label>
        {EmojiOpen && (
                <div className="emojiPickerContainer" ref={emojiPickerRef}>
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
        <label>
        <AiOutlineSend className="sendIcon" onClick ={handlesend} />
        </label>
      </div>
    </div>
  );
};

export default ReplayInputComponent;
