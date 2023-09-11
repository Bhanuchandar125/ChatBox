import { AiOutlineSend } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./ChatContainer.css";
import { selectedFilesArray } from "./Context";
import { useContext, useEffect, useRef, useState } from "react";
import {  MdTextFormat } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ReplayInputComponent from "./ReplayInputComponent";
import { EditSave, EmojiSelect } from "../ReduxToolkit/ChatSlice";
import TextEditer from "./TextEditer";
import { MentionsInput, Mention } from 'react-mentions'
import userData from '../assets/UserData.json'

const MessageInputSection = (props: any) => {
    const isReplayClicked = useSelector(
    (state: any) => state.ChatSlice.ReplayClicked
  );
  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState();
  
  const editMode = useSelector((state: any) => state.ChatSlice.editMode);
  const message = useSelector((state: any) => state.ChatSlice.Message);
  const editIndex = useSelector((state: any) => state.ChatSlice.editIndex);
  const dispatch = useDispatch();

  const handleEmojiSelect = (e: any) => {
    const emoji = e.native;
    dispatch(EmojiSelect(emoji));
  };

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleEmojiIconClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleEditSave = () => {
    dispatch(EditSave({ message, editIndex }));
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editMode) {
        handleEditSave();
      } else {
        props.handleSend();
      }
    }
  };
  
  return (
    <div>
      {selectedFiles.length !== 0 ? (
        <div className="selectedFilesContainer">
          {selectedFiles.map((file: any, index: number) => {
            if (file.type.startsWith("image")) {
              return (
                <div className="selectedFilePreview" key={index}>
                  <img
                    src={file.message}
                    alt={`Selected File ${index}`}
                    className="selectedImage"
                  />
                </div>
              );
            } else if (file.type.startsWith("video")) {
              return (
                <video controls className="selectedImage" key={index}>
                  <source
                    src={file.message}
                    type="video/mp4"
                    className="selectedImage"
                  />
                  Your browser does not support the video tag.
                </video>
              );
            }
          })}
        </div>
      ) : null}
      {isReplayClicked ? (
        <ReplayInputComponent message={props.message?.text} />
      ) : (
        <div className={props.isInputOpen ? "inputOpen" : "inputsection"}>
          {!props.isInputOpen&&
          <MentionsInput value ={value} onChange={(e:any)=>setValue(e.target.value)} >
            <Mention data={userData}/>
          <input
            type="text"
            className='textinput' 
            onChange={props.handlechangeMessage}
            placeholder="Type Message..."
            value={props.Message.message}
            onDragOver={(e) => e.preventDefault()}
            onDrop={props.handleFileDrop}
            onKeyDown={handleEnterKeyPress}
          />
          </MentionsInput>}

          <div >
            {props.isInputOpen ? (
              
              <TextEditer/>
            ) : null}
            <div>
              <label onClick={() => props.setIsInputOpen(!props.isInputOpen)}>
                <MdTextFormat className="customFileInput" />
              </label>
              <label htmlFor="fileInput">
                <BiUpload className="customFileInput" />
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={props.handleFileSelect}
                multiple
                style={{ display: "none" }}
              />
              <label className="emojibg" onClick={handleEmojiIconClick}>
                <EmojiEmotionsOutlinedIcon />
              </label>
              {isOpen && (
                <div className="emojiPickerContainer" ref={emojiPickerRef}>
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
              <label onClick={editMode ? handleEditSave : props.handleSend}>
                <AiOutlineSend className="sendIcon" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInputSection;
