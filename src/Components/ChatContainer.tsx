import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { BiUpload, BiVideo } from "react-icons/bi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { AiOutlineSend } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ChatContainer = () => {
  const [message, setMessage] = useState<any>({
    name: "",
    url: "",
    type: "",
  });
  const [sentmessages, setSentMessages] = useState<any>([]);
  const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleEmojiSelect = (e: any) => {
    const emoji = e.native;
    setMessage({ ...message, name: message.name + emoji });
  };
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setEmojiOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    if (message.name.trim() !== "") {
      setSentMessages([...sentmessages, message]);
      setMessage({ name: "", url: "", type: "" });
    }
  };

  const handlechangeMessage = (e: any) => {
    const value = e.target.value;
    setMessage({ ...message, name: value, file: "", type: "text" });
  };
  const handleEdit = (idx: number, message: any) => {
    setEditIndex(idx);
    setMessage(message);
  };
  const handleEditSave = () => {
    if (editIndex !== null) {
      let updatedmessages = [...sentmessages];
      updatedmessages[editIndex] = message;
      setSentMessages(updatedmessages);
      setEditIndex(null);
      setMessage({ name: "", url: "", type: "" });
    }
  };
  const handleEmojiIconClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    setEmojiOpen(!isEmojiOpen);
  };
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const url = URL.createObjectURL(file);

        // Determine the type of the file (image, video, etc.)
        let fileType = "image";
        if (file.type.startsWith("video")) {
          fileType = "video";
        }

        const uploadedFile = {
          type: fileType,
          file: url,
        };

        setSentMessages([...sentmessages, uploadedFile]);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("isEmojiOpen", isEmojiOpen);
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
            if (each.type === "video") {
              return (
                <li className="videoContainer" key={index}>
                  <video controls className="videoContainer">
                    <source src={each.file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              );
            } else if (each.type === "image") {
              return (
                <li className="imageContainer" key={index}>
                  <img
                    src={each.file}
                    alt="Uploaded"
                    className="imageContainer"
                  />
                </li>
              );
            } else {
              return (
                <li className="messagecontainer" key={index}>
                  {each.name}
                  <span
                    className="editIcon"
                    onClick={() => handleEdit(index, each)}
                  >
                    <MdOutlineModeEditOutline />
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>

      <div className="messageinput">
        <input
          type="text"
          className="textinput"
          onChange={handlechangeMessage}
          placeholder="Type Message..."
          value={message.name}
        />
        <label htmlFor="fileInput">
          <BiUpload className="customFileInput" />
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label className="emojibg" onClick={handleEmojiIconClick}>
          <EmojiEmotionsOutlinedIcon />
        </label>
        {isEmojiOpen && (
          <div className="emojiPickerContainer" ref={emojiPickerRef}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
        <label onClick={editIndex !== null ? handleEditSave : handleSend}>
          {/* <label onClick={handleSend}> */}
          <AiOutlineSend className="sendIcon" />
        </label>
      </div>
    </div>
  );
};

export default ChatContainer;
