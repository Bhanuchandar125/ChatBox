import { AiOutlineSend } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./ChatContainer.css";
import { selectedFilesArray } from "./Context";
import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineFormatItalic, MdTextFormat } from "react-icons/md";
import { BsTypeBold } from "react-icons/bs";
import { PiTextUnderlineBold } from "react-icons/pi";
import { DiCode } from "react-icons/di";
import { useDispatch, useSelector } from "react-redux";
import ReplayInputComponent from "./ReplayInputComponent";
import { EmojiSelect } from "../ReduxToolkit/ChatSlice";

const MessageInputSection = (props: any) => {
  const menuMessages = useSelector((state: any) => state.ChatSlice.ReplayState);
  const isReplayClicked = useSelector(
    (state: any) => state.ChatSlice.ReplayClicked
  );
  const ReplayMessage = useSelector((state:any)=>state.ChatSlice.ReplayState);
  const sentMessage = useSelector((state:any)=>state.ChatSlice.displaymessages)

  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const [isbold, setIsbold] = useState<boolean>(false);
  const dispatch = useDispatch()

  const handleEmojiSelect = (e: any) => {
    const emoji = e.native;
    // props.setMessage({ ...props.message, text: props.message.text + emoji });
    dispatch(EmojiSelect(emoji))
  };
 console.log("ReplayMessage",ReplayMessage)
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

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (props.editIndex !== null) {
        props.handleEditSave();
      } else {
        props.handleSend();
      }
    }
  };
  const handleBold = () => {};
  return (
    <div>
      {selectedFiles.length !== 0 ? (
        <div className="selectedFilesContainer">
          {selectedFiles.map((file: any, index: number) => {
            if (file.type.startsWith("image")) {
              return (
                <div className="selectedFilePreview" key={index}>
                  <img
                    src={file.url}
                    alt={`Selected File ${index}`}
                    className="selectedImage"
                  />
                </div>
              );
            } else if (file.type.startsWith("video")) {
              return (
                <video controls className="selectedImage" key={index}>
                  <source
                    src={file.url}
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
        <ReplayInputComponent
        message={props.message?.text}
        />
      ) : (
        <div className={isInputOpen ? "inputOpen" : "inputsection"}>
          <input
            type="text"
            className={`textinput ${isbold ? "boldTextInput" : ""}`}
            onChange={props.handlechangeMessage}
            placeholder="Type Message..."
            value={props.Message?.message}
            onDragOver={(e) => e.preventDefault()}
            onDrop={props.handleFileDrop}
            onKeyDown={handleEnterKeyPress}
          />

          <div className={isInputOpen ? "texteditorOpen" : null}>
            {isInputOpen ? (
              <div className="textEditor">
                <label onClick={handleBold}>
                  <BsTypeBold
                    className={`textEditorIcons ${
                      isbold ? "textEditorIconsactive" : ""
                    }`}
                  />
                </label>
                <label>
                  <MdOutlineFormatItalic className="textEditorIcons" />
                </label>
                <label>
                  <PiTextUnderlineBold className="textEditorIcons" />
                </label>
                <label>
                  <DiCode className="textEditorIcons" />
                </label>
              </div>
            ) : null}
            <div>
              <label onClick={() => setIsInputOpen(!isInputOpen)}>
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
              <label
                onClick={
                  props.editIndex !== null
                    ? props.handleEditSave
                    : props.handleSend
                }
              >
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
