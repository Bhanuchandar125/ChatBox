import React, { useCallback, useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { ChatContext } from "../Context/ChatContext";
import Dialougebox from "./Dialougebox";
import { postRequest } from "../apiCalls/UserCalls";
import Config from "./Config";
import { Authuser } from "./Context";

const PotentialUsers = () => {
  const { userChats,createChat, potentialChats, onlineUsers } = useContext(ChatContext);
  const [dialogueOpen, setDialogueopen] = useState(false);
  const [selectedUser, setSelecteduser] = useState<any>(null)
  const {loginuser} = useContext(Authuser)
  console.log("onlineUsers", onlineUsers)
  const clickOnPotentialuser = (chat:any) => {
    setDialogueopen(true);
    setSelecteduser(chat)

  };
  const potentialUserClose = () => {
    
    setSelecteduser(null)
    setDialogueopen(false);
  };
 const addChat=()=>{
  const firstId = loginuser._id
  const secondId = selectedUser._id
  
  createChat(firstId, secondId)
  setSelecteduser(null)
 }
 console.log("selectedUser", selectedUser)
  return (
    <div>
      <div className="potentialusers">
        {potentialChats?.map((chat: any, index: number) => {
          return (
            <>
            <div
              key={index}
              className="potentialchatcard"
              onClick={()=>clickOnPotentialuser(chat)}
            >
              
              <Avatar></Avatar>
              <label>{chat.name}</label>
              {onlineUsers.some((user:any)=>user.userId===chat._id)?
              (
                <label className="chat-online"></label>
              ):""}
              
            </div>
            {selectedUser!==null && (
                
              <Dialougebox
                id={index}
                dialogueOpen={dialogueOpen}
                handleClick={clickOnPotentialuser}
                handleClose={potentialUserClose}
                user={selectedUser}
                addChat={addChat}
              />
            )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PotentialUsers;
