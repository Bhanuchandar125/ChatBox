import {configureStore} from '@reduxjs/toolkit'
import ChatSlice from './ChatSlice'


const Store = configureStore({
    reducer:{
        ChatSlice:ChatSlice,
    }
})

export default Store