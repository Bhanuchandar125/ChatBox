import { useEffect, useState } from "react";
import Config from "../Components/Config";
import { getRequest } from "../apiCalls/UserCalls";


export const useFetchReciepient =(chat:any, user:any)=>{
   console.log(chat, user)
    const [reciepient, setReciepient] = useState(null);
    const [error, setError] = useState(null)
    
    const reciepientId= chat?.members.find((id:any)=>id!==user?._id);

    useEffect(()=>{
        const getuser = async ()=>{
            if(!reciepientId) return null
            const response = await getRequest (`${Config.finduserapi}/${reciepientId}`)

            if(response.error){
                return setError(error)
            };
            setReciepient(response)
        }
        getuser();
    }, []);
console.log(reciepient)
    return {reciepient}
}