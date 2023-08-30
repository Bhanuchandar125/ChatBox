import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    ReplayState :[]
}
const ChatSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        Replay(state, action){
            state.ReplayState.push(action.payload)
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
