import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  Message: {
    message: "",
    type: "",
    replaymessage: false,
    prevMessage:""
  },
  editMode:false,
  editIndex:null,
  ReplayMessage:<any> {},
  ReplayClicked: false,
  EmojiOpen: false,
  EmojiSelect: null,
  displaymessages: <any>[],
};
const ChatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Replay(state, action) {
      // console.log("Replay",action.payload)
      const { Id, Message } = action.payload;
      state.ReplayMessage=action.payload
      
      
      state.ReplayClicked = true;
    },
    Edit(state, action) {
      state.editMode= true
      state.editIndex= action.payload.Id     
      state.Message.message =  action.payload.Message
    },
    EditSave(state, action){
      const {message,editIndex} = action.payload;
      console.log(message, editIndex)
      state.displaymessages[editIndex].message = message.message;
      state.editMode = false
      
      state.Message.message=""
      
    },
    Forward(state, action) {
      console.log("Forward");
    },
    Delete(state, action) {
      
      state.displaymessages.splice(action.payload.Id, 1)
      
    },
    EmojiClick(state, action) {
      state.EmojiOpen = action.payload;
    },
    EmojiSelect(state, action) {
      state.EmojiSelect = action.payload;
      state.Message.message = state.Message.message + action.payload;
    },
    setMessage(state, action) {
      
      
        if(state.ReplayClicked){
          // console.log("ab", action.payload)
          const {message, prevmessage} = action.payload
          
          state.Message.message= message
          state.Message.prevMessage= prevmessage
          state.Message.replaymessage=true 

        }else{
          console.log("abcd")
          state.Message.message =  action.payload
          state.Message.type="text";
          state.Message.replaymessage = state.ReplayClicked;
        }
      
    },
    sendMessages(state, action) {
      if(Array.isArray(action.payload)){
        state.displaymessages = [...state.displaymessages, ...action.payload];
      }else{
        state.displaymessages = [...state.displaymessages, action.payload];
      }
      
      state.ReplayClicked = false;
      state.Message.message="",state.Message.type ="", state.Message.replaymessage=false,
      state.Message.prevMessage=""
      state.ReplayMessage={}
      state.ReplayClicked=false
    },
    
  },
  
});

export const {
  Replay,
  Edit,
  Forward,
  Delete,
  EmojiClick,
  EmojiSelect,
  setMessage,
  sendMessages,
  EditSave
} = ChatSlice.actions;
export default ChatSlice.reducer;
