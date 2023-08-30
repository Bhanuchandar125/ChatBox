import React, { useContext, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { BiVideo } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import MessageInputSection from "./MessageInputSection";
import { selectedFilesArray } from "./Context";
import { sentMessagesArray } from "./Context";
import { Avatar, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import MessageOptionsMenu from "./MessageMenu";

const ChatContainer = (props: any) => {
  const [message, setMessage] = useState<any>({ name: "", url: "", type: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  const { sentmessages, setSentMessages } = useContext(sentMessagesArray);

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
       
            <Avatar
              src={props.user.profile_image}
              alt="avatar"
              size="xlarge"
              className="userProfileIcon"
            />     
         <span className="userTitle">{props.user.name}</span>
          <ExpandMore />
        </div>

        <BiVideo className="videoIcon" />
      </div>
      <hr />
      <div className="chatBody">
        <ul className="listcontainer">
          {sentmessages &&
            sentmessages.map((each: any, index: number) => {
              if (each.type.startsWith("video")) {
                return (
                  <li className="videoContainer" key={index}>
                    <video controls className="videoContainer">
                      <source src={each.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <MessageOptionsMenu />
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
                    <MessageOptionsMenu />
                  </li>
                );
              } else {
                return (
                  
                  <>
                    <MessageBox
                      key={index}
                      position="right"
                      title="Liam Johnson"
                      type="text"
                      text={each.name}
                      date={new Date()}
                      replyButton={false}
                      avatar={"https://randomuser.me/api/portraits/men/16.jpg"} 
                    />
                    <MessageOptionsMenu
                    Message={each.name}
                    id={index} />
                  </>
                );
              }
            })}{" "}
        </ul>
      </div>

      <div className="messageinput">
        <MessageInputSection
          setMessage={setMessage}
          message={message}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          handleSend={handleSend}
          handlechangeMessage={handlechangeMessage}
          handleEditSave={handleEditSave}
          handleFileSelect={handleFileSelect}
          handleFileDrop={handleFileDrop}
        />
        {/* <TestMessageInputSection
          setMessage={setMessage}
          message={message}
          
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          handleSend={handleSend}
          handlechangeMessage={handlechangeMessage}
          handleEditSave={handleEditSave}
          handleFileSelect={handleFileSelect}
          handleFileDrop={handleFileDrop}
        /> */}
      </div>
    </div>
  );
};

export default ChatContainer;
