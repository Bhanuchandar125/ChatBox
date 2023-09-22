import React, { useCallback, useContext, useState } from "react";
import { Avatar } from "@mui/material";
import { ChatContext } from "../Context/ChatContext";
import Dialougebox from "./Dialougebox";
import { postRequest } from "../apiCalls/UserCalls";
import Config from "./Config";
import { Authuser } from "./Context";

const PotentialUsers = () => {
  const { userChats,createChat, potentialChats } = useContext(ChatContext);
  const [dialogueOpen, setDialogueopen] = useState(false);
  const [selectedUser, setSelecteduser] = useState(null)
  const {loginuser} = useContext(Authuser)

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
 console.log("userChats", userChats)
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
