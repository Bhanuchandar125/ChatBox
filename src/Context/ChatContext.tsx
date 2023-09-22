import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../apiCalls/UserCalls";
import Config from "../Components/Config";
import {  Authuser, openedChat } from "../Components/Context";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children}) => {

  const [userChats, setUserChats] = useState<null|any>([]);
  const [isuserChatsLoading, setisUserChatsLoading] = useState<any>(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const {openChat} = useContext(openedChat)
  const {loginuser} = useContext(Authuser)
  const [potentialChats, setPotentialchats] = useState([])


  useEffect(()=>{
    const getusers =async()=>{
      const response = await getRequest(Config.usersapi)
      if(response.error){
        return console.log("Error fetching users", response)
      }
      const pChats = response.filter((u:any)=>{
        let isChatcreated = false;
        if(loginuser._id===u._id) return false;
        if (userChats){
          isChatcreated= (userChats as any[])?.some((chat:any)=>{
            return chat.members[0]===u._id||chat?.members[1]===u._id
          });
        }
        return !isChatcreated;
      });
      setPotentialchats(pChats);
    };
    getusers();
  },[userChats])

  const createChat= useCallback(async(firstID, secondId)=>{
    const response = await postRequest(`${Config.createchatapi}`, JSON.stringify({firstID, secondId}));
    if(response.error){
      console.log("Error creatingChat", response)
    };
    setUserChats((prev:any)=>[...prev, response[0]]);
    
},[])
 
useEffect(()=>{
    const getUserChats = async()=>{
        if(loginuser?._id){
          setisUserChatsLoading(true )
          setUserChatsError(null)
            const response = await getRequest(`${Config.getuserchatapi}/${loginuser?._id}`)
            setisUserChatsLoading(false )
            
            if(response.error){
              return setUserChatsError(response)

            }
            console.log(response[0])
            setUserChats(response[0])
        }
    }
    getUserChats()
},[openChat])
// console.log("userChats", userChats)
// console.log("potentialChats", potentialChats)
  return (
    <ChatContext.Provider
      value={{userChats,createChat, isuserChatsLoading, userChatsError,potentialChats}}
    >
      {children}
    </ChatContext.Provider>
  );
};
