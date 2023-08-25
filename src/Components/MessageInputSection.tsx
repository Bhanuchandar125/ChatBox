
import { AiOutlineSend } from 'react-icons/ai';
import { BiUpload } from 'react-icons/bi';
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./ChatContainer.css";

const MessageInputSection = (props:any) => {
    
  return (
    <div>{selectedFiles.length !== 0 ? (
        <div className="selectedFilesContainer">
          {selectedFiles.map((file, index) => {
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
                <video controls className="selectedImage">
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
        value={message.name}
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
      <label className="emojibg" onClick={props.handleEmojiIconClick}>
        <EmojiEmotionsOutlinedIcon />
      </label>
      {isEmojiOpen && (
        <div className="emojiPickerContainer" ref={emojiPickerRef}>
          <Picker data={data} onEmojiSelect={props.handleEmojiSelect} />
        </div>
      )}
      <label onClick={editIndex !== null ? props.handleEditSave : props.handleSend}>
        {/* <label onClick={handleSend}> */}
        <AiOutlineSend className="sendIcon" />
      </label></div>
  )
}

export default MessageInputSection