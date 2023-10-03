import React, { useContext } from "react";
import { ChatList } from "react-chat-elements";
import { useFetchReciepient } from "../Hooks/useFetchReciepient";
import { ChatContext } from "../Context/ChatContext";

const Chat = (props:any) => {

  const  reciepient : any = useFetchReciepient(props.chat, props.user);
  
  const {updateCurrentChat} = useContext<any>(ChatContext)
  
  
  return (
    <div>
      <ChatList
        
        className="chat-list"
        dataSource={[
          {
            id:props.key,
            avatar:reciepient?.image,
            alt: reciepient?.name,
            title: reciepient?.name,
            subtitle: reciepient?.recent_message,
            // date: reciepient?.updatedAt,
            unread:0
          },
        ]}
        onClick={() =>  props.handleopenchat()}
      />
    </div>
  );
};

export default Chat;
