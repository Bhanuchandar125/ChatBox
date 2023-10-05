import React, { useContext } from "react";
import { ChatList } from "react-chat-elements";
import { useFetchReciepient } from "../Hooks/useFetchReciepient";
import { ChatContext } from "../Context/ChatContext";
import "./ChatContainer.css";

const Chat = (props: any) => {
  const reciepient: any = useFetchReciepient(props.chat, props.user);

  const { updateCurrentChat, onlineUsers } = useContext<any>(ChatContext);

  return (
    <div>
      <ChatList
        className="chat-list"
        dataSource={[
          {
            id: props.key,
            avatar: reciepient?.image,
            alt: reciepient?.name,
            title: reciepient?.name,
            subtitle: reciepient?.recent_message,
            // date: reciepient?.updatedAt,
            unread: 0,
          },
        ]}
        onClick={() => props.handleopenchat()}
        
      />
      {onlineUsers.some((user: any) => user.userId === reciepient?._id) ? (
          <label className="chatList-online"></label>
        ) : (
          ""
        )}
    </div>
  );
};

export default Chat;
