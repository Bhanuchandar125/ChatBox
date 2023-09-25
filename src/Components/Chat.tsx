import React, { useContext } from "react";
import { ChatList } from "react-chat-elements";
import { useFetchReciepient } from "../Hooks/useFetchReciepient";
import { ChatContext } from "../Context/ChatContext";

const Chat = ({ chat, key, user, handleopenchat }) => {
  const { reciepient }: any = useFetchReciepient(chat, user);
  
  const {updateCurrentChat} = useContext(ChatContext)

  return (
    <div>
      <ChatList
        
        className="chat-list"
        dataSource={[
          {
            id:key,
            avatar: reciepient?.profile_image,
            alt: reciepient?.name,
            title: reciepient?.name,
            subtitle: reciepient?.recent_message,
            date: reciepient?.last_message_Date,
          },
        ]}
        onClick={() => handleopenchat(()=>updateCurrentChat(chat))}
      />
    </div>
  );
};

export default Chat;
