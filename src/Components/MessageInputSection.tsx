import { AiOutlineSend } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./ChatContainer.css";
import { selectedFilesArray } from "./Context";
import { useContext, useEffect, useRef } from "react";


const MessageInputSection = (props: any) => {
  const { selectedFiles, setSelectedFiles } = useContext(selectedFilesArray);
  console.log("props", props);

  const handleEmojiSelect = (e: any) => {
    const emoji = e.native;
    props.setMessage({ ...props.message, name: props.message.name + emoji });
  };
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      props.setEmojiOpen(false);
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
    props.setEmojiOpen(!props.isEmojiOpen);
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
                    src={file.url}
                    alt={`Selected File ${index}`}
                    className="selectedImage"
                  />
                </div>
              );
            } else if (file.type.startsWith("video")) {
              return (
                <video controls className="selectedImage" key ={index}>
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

      <input
        type="text"
        className="textinput"
        onChange={props.handlechangeMessage}
        placeholder="Type Message..."
        value={props.message?.name}
        onDragOver={(e) => e.preventDefault()}
        onDrop={props.handleFileDrop}
      />
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
      {props.isEmojiOpen && (
        <div className="emojiPickerContainer" ref={emojiPickerRef}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      <label
        onClick={
          props.editIndex !== null ? props.handleEditSave : props.handleSend
        }
      >
        <AiOutlineSend className="sendIcon" />
      </label>
    </div>
  );
};

export default MessageInputSection;
