import axios from "axios";
import {userGlobalContext} from '../Components/Context';
import { useContext } from "react";
import Config from '../Components/Config';

// const { setUsers} = useContext(userGlobalContext)

export const getAllUsers = async()=>{
    try{
        const res = await axios ({
            method: "GET",
            url:Config.usersapi,
        });
        
        return res.data
        
    }catch(errors:any){
        console.log(errors)
        return errors.message
    };
}
export const loginUser = async (data:any)=>{
    try{
        const res = await axios({
            method: "Post",
            url: Config.loginapi ,
            data: data,
          });
          return res.data
    }catch(error){
        return error
    }
}
export const postRequest = async (url:any, body:any)=>{
    try{
        const response = await axios({
            method:"POST",
            url:url,
            data:body
        });
        const data = response.data
        return data
    }catch(error){
        let message = error
        return {error:true, message}
    }
} 

export const getRequest = async(url:string)=>{
    try{
        const response = await axios({
            method:"GET",
            url:url
        });
        const data = response.data
        return data
    }catch(error){
        let message = error
        return {error:true, message}
    }
}