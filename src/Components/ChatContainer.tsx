import React, { useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { BiUpload, BiVideo } from "react-icons/bi";

// import "emoji-mart/css/emoji-mart.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { AiOutlineSend } from "react-icons/ai";

const ChatContainer = () => {
  const [message, setMessage] = useState<any>("");
  const [sentmessages, setSentMessages] = useState<any>([]);
  const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false);

  const handleEmojiSelect = (emoji: any) => {
    setMessage([...message, emoji.native]);
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      setSentMessages([...sentmessages, message]);
      setMessage("");
    }
    
  };
  console.log("sent", sentmessages);
  const handlechangeMessage = (e: any) => {
    const value = e.target.value;
    setMessage(value);
  };
  console.log(message);
  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div>
          <ArrowBackIcon className="backbutton" />
        </div>
        <div className="userTag">
          <div className="userProfileIcon">
            <p>BC</p>
          </div>
          <span className="userTitle">Bhanu Chandar</span>
          <ExpandMore />
        </div>

        <BiVideo className="videoIcon" />
      </div>
      <hr />
      <div className="chatBody">
        <ul className="listcontainer">
          {sentmessages.map((each: any, index: number) => {
            return <li className='messagecontainer' key={index}>{each}</li>
          })}
        </ul>
      </div>
      <div className="messageinput">
        <input
          type="text"
          className="textinput"
          onChange={handlechangeMessage}
          placeholder="Type Message..."
          value={message}
        />
        <label htmlFor="fileInput">
          <BiUpload className="customFileInput" />
        </label>
        <input
          type="file"
          id="fileInput"
          // onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label className="emojibg" onClick={() => setEmojiOpen(!isEmojiOpen)}>
          <EmojiEmotionsOutlinedIcon />
        </label>
        {isEmojiOpen && (
          <div className="emojiPickerContainer">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
        <label onClick={handleSend}>
          <AiOutlineSend className="sendIcon" />
        </label>
      </div>
    </div>
  );
};

export default ChatContainer;
