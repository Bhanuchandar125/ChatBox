import React, { useContext, useEffect, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { FcVideoCall } from "react-icons/fc";
import MessageInputSection from "./MessageInputSection";
import {  openedChat, selectedFilesArray } from "./Context";
import { Avatar, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import MessageOptionsMenu from "./MessageMenu";
import { EditSave, sendMessages, setMessage } from "../ReduxToolkit/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetchReciepient } from "../Hooks/useFetchReciepient";
import { ChatContext } from "../Context/ChatContext";

const ChatContainer = (props: any) => {
  const {currentChat, messages} = useContext<any>(ChatContext);
  const user: any = localStorage.getItem("user");
  const loginuser = JSON.parse(user);

  const reciepient:any = useFetchReciepient(currentChat, loginuser)  
  
  // console.log("Receipient", reciepient)
  console.log("messages", messages)
  // console.log("currentChat", currentChat)

  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  const [openedchat, setOpenedchat] = useState<any>({});
  const { openChat } = useContext(openedChat);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
   
  const displayMessage = useSelector(
    (state: any) => state.ChatSlice.displaymessages
  );
  const Message = useSelector((state: any) => state.ChatSlice.Message);
  const [focusedMessageindex, setFocusedmessageindex] = useState<number | null>(
    null
  );
  

  const dispatch = useDispatch();

  const handleSend = () => {
    if (selectedFiles.length !== 0) {
      dispatch(sendMessages([...selectedFiles]));
      setSelectedFiles([]);
    } else if (Message.text?.trim() !== "") {
      dispatch(sendMessages(Message));
      setIsInputOpen(false);
    }
  };
  
  useEffect(() => {
    const chat: any = localStorage.getItem("openedchat");
    setOpenedchat(JSON.parse(chat));
  }, [openChat]);
  const handlechangeMessage = (e: any) => {
    const message = e.target.value;

    dispatch(setMessage(message));
  };

  const handleEditSave = () => {
    if (editIndex !== null && editedMessage.trim() !== "") {
      // Dispatch the action to save the edited message
      dispatch(EditSave({ index: editIndex, editedMessage }));
      setEditIndex(null);
      setEditedMessage(""); // Clear the edited message
    }
  };

  const htmlText = (message: string) => {
    const parser = new DOMParser();
    const htmlContent = parser.parseFromString(message, "text/html");

    const htmlString = htmlContent.documentElement.innerHTML; // Get the HTML content as a string

    return htmlString;
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

  function parseMessage(message: any) {
    if (message.includes("@")) {
      const parts = message.split(" ");
      return parts.map((part: any, index: number) => {
        if (part.startsWith("<") && part.endsWith(">")) {
          return React.createElement("strong", {
            dangerouslySetInnerHTML: { __html: part },
          });
        }
        return part + " ";
      });
    } else {
      const parts = message.split("/(<[^>]+>)/");
      return parts.map((part: any, index: number) => {
        if (part.startsWith("<") && part.endsWith(">")) {
          return React.createElement("span", {
            dangerouslySetInnerHTML: { __html: part },
          });
        }
        return part + " ";
      });
    }
  }

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div>
          <ArrowBackIcon className="backbutton" />
        </div>
        <div className="userTag">
          <Avatar
            src={reciepient?.profile_image}
            alt="avatar"
            size="xlarge"
            className="userProfileIcon"
          />
          <span className="userTitle">{reciepient?.name}</span>
          <ExpandMore />
        </div>

        <FcVideoCall className="videoIcon" />
      </div>
      <hr />
      <div className="chatBody">
        <ul className="listcontainer">
          {messages &&
            messages.map((each?: any, index: number) => {
              if (each?.type && each?.type?.startsWith("video")) {
                return (
                  <li
                    className="videoContainer"
                    onFocus={() => setFocusedmessageindex(index)}
                    onBlur={() => setFocusedmessageindex(null)}
                    onMouseEnter={() => setFocusedmessageindex(index)}
                    onMouseLeave={() => setFocusedmessageindex(null)}
                    key={index}
                  >
                    <MessageBox
                      position={"left"}
                      type={"video"}
                      title={openedchat.name}
                      data={{
                        uri: each?.message,
                      }}
                    />
                    {focusedMessageindex === index && (
                      <MessageOptionsMenu
                        Message={each?.url}
                        type={each?.type}
                        id={index}
                        className="messageMenu"
                      />
                    )}
                  </li>
                );
              } else if (each?.type && each?.type?.startsWith("image")) {
                return (
                  <li
                    key={index}
                    className="imageContainer"
                    onMouseEnter={() => setFocusedmessageindex(index)}
                    onMouseLeave={() => setFocusedmessageindex(null)}
                    onFocus={() => setFocusedmessageindex(index)}
                    onBlur={() => setFocusedmessageindex(null)}
                  >
                    <MessageBox
                      position={"right"}
                      type={"photo"}
                      title={openedchat.name}
                      data={{
                        uri: each?.message,
                        height: 150,
                        width: 300,
                      }}
                    />
                    {focusedMessageindex === index && (
                      <MessageOptionsMenu
                        Message={each?.message}
                        type="text"
                        id={index}
                        className="messageMenu"
                      />
                    )}
                  </li>
                );
              } else if (
                each?.text.startsWith("<") ||
                each?.text.includes("@")
              ) {
                const messageText = each?.message;

                return (
                  
                  <li
                    key={index}
                    className="imageContainer"
                    onFocus={() => setFocusedmessageindex(index)}
                    onBlur={() => setFocusedmessageindex(null)}
                    onMouseEnter={() => setFocusedmessageindex(index)}
                    onMouseLeave={() => setFocusedmessageindex(null)}
                  >
                    <MessageBox
                      key={index}
                      position="right"
                      title={openedchat.name}
                      type="text"
                      text={parseMessage(each?.message)}
                      date={new Date()}
                      replyButton={false}
                      avatar={openedchat?.profile_image}
                      {...(each?.prevMessage?.trim() !== ""
                        ? {
                            reply: {
                              title: openedchat.name,
                              titleColor: "#8717ae",
                              message: each?.prevMessage,
                            },
                          }
                        : {})}
                    />
                    {focusedMessageindex === index && (
                      <MessageOptionsMenu
                        Message={each?.message}
                        type="text"
                        id={index}
                        className="messageMenu"
                      />
                    )}
                  </li>
                );
              } else {
                return (
                  <li
                    key={index}
                    className="imageContainer"
                    onFocus={() => setFocusedmessageindex(index)}
                    onBlur={() => setFocusedmessageindex(null)}
                    onMouseEnter={() => setFocusedmessageindex(index)}
                    onMouseLeave={() => setFocusedmessageindex(null)}
                  >
                    <MessageBox
                      key={index}
                      position={(each?.senderId ===loginuser._id)?"right":"left"}
                      title={(each?.senderId ===loginuser._id)?openedchat.name:reciepient?.name}
                      type="text"
                      text={each?.text}
                      date={each?.updatedAt}
                      replyButton={false}
                      avatar={openedchat?.profile_image}
                      {...(each?.prevMessage? {
                            reply: {
                              title: openedchat.name,
                              titleColor: "#8717ae",
                              message: each?.prevMessage,
                            },
                          }
                        : {})}
                    />

                    {focusedMessageindex === index && (
                      <MessageOptionsMenu
                        Message={each?.text}
                        type="text"
                        id={index}
                        className="messageMenu"
                      />
                    )}
                  </li>
                );
              }
            })}
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
          isInputOpen={isInputOpen}
          setIsInputOpen={setIsInputOpen}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
