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
  const [messages, setMessages] = useState<any>(null)
  const [isMessagesLoading, setisMessagesLoading] = useState<any>(null)
  const [messagesError, setmessagesError]= useState<any>(null)
  const [currentChat, setCurrentchat]= useState<any>(null)


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
            return chat?.members[0]===u._id||chat?.members[1]===u._id
          });
        }
        return !isChatcreated;
      });
      setPotentialchats(pChats);
    };
    getusers();
  },[])

  const createChat= useCallback(async(firstId, secondId)=>{
    
    const response = await postRequest(`${Config.createchatapi}`, ({firstId, secondId}));
    if(response.error){
      console.log("Error creatingChat", response)
    };
    console.log(response)
    setUserChats([...userChats, response]);
    getUserChats()
    
},[])
const updateCurrentChat= useCallback((chat)=>{
  setCurrentchat(chat)
}, [currentChat])
const getUserChats = async()=>{
  if(loginuser?._id){
    setisUserChatsLoading(true )
    setUserChatsError(null)
      const response = await getRequest(`${Config.getuserchatapi}/${loginuser?._id}`)
      setisUserChatsLoading(false)
      
      if(response.error){
        return setUserChatsError(response)

      }
      console.log(response)
      setUserChats(response)
  }
}

useEffect(()=>{
    getUserChats()
},[])
useEffect(()=>{
  const getMeassages = async()=>{
    setisMessagesLoading(true)
    const response = await getRequest(`${Config.getmessagesapi}/${currentChat?._id}`)
    setisMessagesLoading(false)
    if(response.error){
      return setmessagesError(response)
    }
    setMessages(response)
  };
  getMeassages()
},[])
// console.log("potentialChats", potentialChats)
  return (
    <ChatContext.Provider
      value={{userChats,createChat, isuserChatsLoading,messages, userChatsError,potentialChats, updateCurrentChat}}
    >
      {children}
    </ChatContext.Provider>
  );
};
