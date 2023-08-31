import {createSlice} from '@reduxjs/toolkit'
import { useState } from 'react'



const initialState ={
    ReplayState :[],
    ReplayClicked:false
}
const ChatSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        Replay(state, action){
            state.ReplayState.push(action.payload)
            state.ReplayClicked = true
        },
        Edit(state, action){
            console.log("Edit")
        },
        Forward(state, action){
            console.log("Forward")
        },
        Delete(state, action){
            console.log("Delete")
        }
        
    }
})

export const {Replay, Edit, Forward, Delete } = ChatSlice.actions
export default ChatSlice.reducer
