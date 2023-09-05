import React, { useContext, useEffect, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { BiVideo } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import MessageInputSection from "./MessageInputSection";
import { openedChat, selectedFilesArray } from "./Context";
import { sentMessagesArray } from "./Context";
import { Avatar, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import MessageOptionsMenu from "./MessageMenu";
import { sendMessages, setMessage } from "../ReduxToolkit/ChatSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatContainer = (props: any) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  const { sentmessages, setSentMessages } = useContext(sentMessagesArray);
  const [openedchat, setOpenedchat] = useState<any>({});
  const { openChat } = useContext(openedChat);
  const isReplayClicked = useSelector(
    (state: any) => state.ChatSlice.ReplayClicked
  );
  const replayState = useSelector((state: any) => state.ChatSlice.ReplayState);

  const displayMessage = useSelector(
    (state: any) => state.ChatSlice.displaymessages
  );
  const Message = useSelector((state: any) => state.ChatSlice.Message);
  const replaymessage = useSelector(
    (state: any) => state.ChatSlice.ReplayState
  );

  console.log("message", Message)
  const dispatch = useDispatch();

  const handleSend = () => {
    if (selectedFiles.length !== 0) {
      // setSentMessages([...sentmessages, ...selectedFiles]);
      dispatch(sendMessages([...selectedFiles]));
      setSelectedFiles([]);
    } else if (Message.message.trim() !== "") {
      dispatch(sendMessages(Message));
    }
  };

  useEffect(() => {
    const chat = localStorage.getItem("openedchat");
    setOpenedchat(JSON.parse(chat));
  }, [openChat]);

  const handlechangeMessage = (e: any) => {
    const message = e.target.value;

    dispatch(setMessage(message));
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
      setMessage({ text: "", url: "", type: "" });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFilesArray: any[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const url = URL.createObjectURL(e.target.files[i]);
        const type = e.target.files[i].type;

        if (type.startsWith("image") || type.startsWith("video")) {
          selectedFilesArray.push({ message: url, type: type });
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
        selectedFilesArray.push({ text: "", url: url, type: type });
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
            src={openedchat?.profile_image}
            alt="avatar"
            size="xlarge"
            className="userProfileIcon"
          />
          <span className="userTitle">{openedchat?.name}</span>
          <ExpandMore />
        </div>

        <BiVideo className="videoIcon" />
      </div>
      <hr />
      <div className="chatBody">
        <ul className="listcontainer">
          {displayMessage &&
            displayMessage.map((each: any, index: number) => {
              if (each.type && each.type.startsWith("video")) {
                return (
                  <li className="videoContainer" key={index}>
                    {/* <video controls className="videoContainer">
                      <source src={each.message} type={each.type} />
                      Your browser does not support the video tag.
                    </video> */}
                    <MessageBox
                      position={"right"}
                      type={"video"}
                      title={openedchat.name}
                      data={{
                        uri: each.message,
                      }}
                    />
                    <MessageOptionsMenu
                      message={each.url}
                      type={each.type}
                      id={index}
                    />
                  </li>
                );
              } else if (each.type && each.type.startsWith("image")) {
                return (
                  <li key={index} className="imageContainer">
                    
                    <MessageBox
                      position={"right"}
                      type={"photo"}
                      title={openedchat.name}
                      
                      data={{
                        uri: each.message,
                        height:150,
                        width:300
                      }}
                    />
                    <MessageOptionsMenu
                      message={each.url}
                      type="image"
                      id={index}
                    />
                  </li>
                );
              } else {
                return (
                  <>
                    <MessageBox
                      key={index}
                      position="right"
                      title={openedchat.name}
                      type="text"
                      text={each.message}
                      date={new Date()}
                      replyButton={false}
                      avatar={openedchat?.profile_image}
                      {...(each.replaymessage
                        ? {
                            reply: {
                              title: openedchat.name,
                              titleColor: "#8717ae",
                              message: replaymessage.Message,
                            },
                          }
                        : {})}
                    />

                    <MessageOptionsMenu
                      Message={each.message}
                      type="text"
                      id={index}
                    />
                  </>
                );
              }
            })}{" "}
        </ul>
      </div>

      <div className="messageinput">
        <MessageInputSection
          setMessage={setMessage}
          Message={Message}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          handleSend={handleSend}
          handlechangeMessage={handlechangeMessage}
          handleEditSave={handleEditSave}
          handleFileSelect={handleFileSelect}
          handleFileDrop={handleFileDrop}
          person={openedchat}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
