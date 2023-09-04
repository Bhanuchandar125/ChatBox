import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState = {
  Message: {
    message: "",
    type: "",
    replaymessage: false,
  },
  ReplayState: {},
  ReplayClicked: false,
  EmojiOpen: false,
  EmojiSelect: null,
  displaymessages: [],
};
const ChatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Replay(state, action) {
      state.ReplayState = action.payload;
      state.ReplayClicked = true;
    },
    Edit(state, action) {
      console.log("Edit");
    },
    Forward(state, action) {
      console.log("Forward");
    },
    Delete(state, action) {
      console.log("Delete");
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
      state.displaymessages.push(action.payload);
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
} = ChatSlice.actions;
export default ChatSlice.reducer;
