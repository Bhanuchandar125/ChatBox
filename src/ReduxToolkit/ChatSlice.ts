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
  editMessage:{},
  ReplayState:<any> {},
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
      console.log("Replay",action.payload)
      const { Id, Message } = action.payload;
      state.ReplayState=action.payload
      state.displaymessages[Id].replaymessage= Message
      
      state.ReplayClicked = true;
    },
    Edit(state, action) {
      console.log("edit", action.payload)
      state.editMode= !state.editMode
      state.editMessage = action.payload
    },
    EditSave(state, action){
      let updatedmessages= [...state.displaymessages]
      const editingIndex = state.editMessage.Id
      updatedmessages[editingIndex].Message = action.payload
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
        
      state.Message.message = action.payload;
      state.Message.type="text";
      state.Message.replaymessage = state.ReplayClicked;
    },
    sendMessages(state, action) {
      if(Array.isArray(action.payload)){
        state.displaymessages = [...state.displaymessages, ...action.payload];
      }else{
        state.displaymessages = [...state.displaymessages, action.payload];
      }
      
      state.ReplayClicked = false;
      state.Message.message="",state.Message.type ="", state.Message.replaymessage=false
      
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
