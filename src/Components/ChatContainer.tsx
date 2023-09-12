import React, { useContext, useEffect, useState } from "react";
import "./ChatContainer.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExpandMore } from "@mui/icons-material";
import { BiVideo } from "react-icons/bi";
import MessageInputSection from "./MessageInputSection";
import { openedChat, selectedFilesArray } from "./Context";
import { Avatar, MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import MessageOptionsMenu from "./MessageMenu";
import { EditSave, sendMessages, setMessage } from "../ReduxToolkit/ChatSlice";
import { useDispatch, useSelector } from "react-redux";


const ChatContainer = (props: any) => {
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

  const dispatch = useDispatch();

  const handleSend = () => {
    if (selectedFiles.length !== 0) {
      dispatch(sendMessages([...selectedFiles]));
      setSelectedFiles([]);
    } else if (Message.message?.trim() !== "") {
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
                      className ="messageMenu"
                    />
                  </li>
                );
              } else if (each.type && each.type.startsWith("image")) {
                console.log(each.message)
                return (
                  <li key={index} className="imageContainer">
                    <MessageBox
                      position={"right"}
                      type={"photo"}
                      title={openedchat.name}
                      data={{
                        uri: each.message,
                        height: 150,
                        width: 300,
                      }}
                    />
                    <MessageOptionsMenu
                      message={each.message}
                      type="image"
                      id={index}
                      className ="messageMenu"
                    />
                  </li>
                );
              } else if (
                each.message.startsWith("<") ||
                each.message.includes("@")
              ) {
                return (
                  <>
                    <div className="  texteditContainer ">
                      <div className="textHead">
                        <div className="d-flex ">
                        <Avatar
                          alt={openedchat.name}
                          src={openedchat?.profile_image}
                        />
                        <label className="chatname">{openedchat.name}</label>
                        </div>
                        <MessageOptionsMenu
                          Message={each.message}
                          type="text"
                          id={index}
                          
                        />
                      </div>
                      <div
                        className="chattext"
                        dangerouslySetInnerHTML={{
                          __html: htmlText(each.message),
                        }}
                      ></div>
                      <label className="textTime">just now</label>
                    </div>
                  </>
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
                      {...(each.prevMessage.trim() !== ""
                        ? {
                            reply: {
                              title: openedchat.name,
                              titleColor: "#8717ae",
                              message: each.prevMessage,
                            },
                          }
                        : {})}
                    />
                    <MessageOptionsMenu
                      Message={each.message}
                      type="text"
                      id={index}
                      className ="messageMenu"
                    />
                  </>
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
