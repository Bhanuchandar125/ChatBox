import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import {  BiVideo } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import MessageInputSection from "./MessageInputSection";

const ChatContainer = () => {
  const [message, setMessage] = useState<any>({
    name: "",
    url: "",
    type: "",
  });
  const [sentmessages, setSentMessages] = useState<any>([]);
  const [isEmojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    if (selectedFiles.length !== 0) {
      setSentMessages([...sentmessages, ...selectedFiles]);
      setSelectedFiles([]);
    } else if (message.name.trim() !== "") {
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilesArray: any[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const url = URL.createObjectURL(e.target.files[i]);
        const type = e.target.files[i].type;

        if (type.startsWith("image") || type.startsWith("video")) {
          selectedFilesArray.push({ name: "", url: url, type: type });
        }
      }
      setSelectedFiles([...selectedFiles, ...selectedFilesArray]);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const selectedFilesArray: any[] = [];
    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      const type = file.type;

      if (type.startsWith("image") || type.startsWith("video")) {
        selectedFilesArray.push({ name: "", url: url, type: type });
      }
    }

    setSelectedFiles([...selectedFiles, ...selectedFilesArray]);
  };

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
            if (each.type.startsWith("video")) {
              return (
                <li className="videoContainer" key={index}>
                  <video controls className="videoContainer">
                    <source src={each.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              );
            } else if (each.type.startsWith("image")) {
              return (
                <li className="imageContainer" key={index}>
                  <img
                    src={each.url}
                    alt={`Uploaded ${index}`}
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
          })}{" "}
        </ul>
      </div>

      <div className="messageinput">
        
          <MessageInputSection 
          handleEmojiSelect={handleEmojiSelect}
          handleSend={handleSend}
          handlechangeMessage={handlechangeMessage}
          handleEditSave={handleEditSave}
          handleEmojiIconClick={handleEmojiIconClick}
          handleFileSelect={handleFileSelect}
          handleFileDrop={handleFileDrop}/>
      </div>
    </div>
  );
};

export default ChatContainer;

// Inside the chatBody rendering
