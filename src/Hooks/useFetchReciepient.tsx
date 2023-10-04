import { useEffect, useState } from "react";
import Config from "../Components/Config";
import { getRequest } from "../apiCalls/UserCalls";


export const useFetchReciepient =(chat:any, user:any)=>{
    
    const [reciepient, setReciepient] = useState(null);
    const [error, setError] = useState(null)
    
    const reciepientId= chat?.members?.find((each:any)=>each!==user?._id);
    
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
    }, [chat]);
    return reciepient
}
