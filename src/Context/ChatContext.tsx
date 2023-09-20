import { createContext, useContext, useEffect, useState } from "react";
import { getRequest, postRequest } from "../apiCalls/UserCalls";
import Config from "../Components/Config";
import { AuthUser } from "../Components/Context";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children}) => {
  // console.log("userfromContext", user)
  const [userChats, setUserChats] = useState(null);
  const [isuserChatsLoading, setisUserChatsLoading] = useState<any>(null);
  const [userChatsError, setUserChatsError] = useState(null);

  const {loginuser} = useContext(AuthUser)
  console.log("userfromContext", loginuser)
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
            setUserChats(response)
        }
    }
    getUserChats()
},[loginuser])

  return (
    <ChatContext.Provider
      value={{userChats, isuserChatsLoading, userChatsError}}
    >
      {children}
    </ChatContext.Provider>
  );
};
