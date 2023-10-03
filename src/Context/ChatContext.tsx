import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRequest, postRequest } from "../apiCalls/UserCalls";
import Config from "../Components/Config";


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [userChats, setUserChats] = useState<null | any>([]);
  const [isuserChatsLoading, setisUserChatsLoading] = useState<any>(null);
  const [userChatsError, setUserChatsError] = useState<any>(null);
  const [potentialChats, setPotentialchats] = useState<any>([]);
  const [messages, setMessages] = useState<any>(null);
  const [isMessagesLoading, setisMessagesLoading] = useState<any>(null);
  const [messagesError, setmessagesError] = useState<any>(null);
  const [currentChat, setCurrentchat] = useState<any>(null);
  const [users, setUsers] = useState<any>([]);
  const [sendTextMessageError, setSendTextMessageError] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<any>(null);

  const user: any = localStorage.getItem("user");
  const loginuser = JSON.parse(user);

  const getusers = async () => {
    const response = await getRequest(Config.usersapi);
    if (response.error) {
      return console.log("Error fetching users", response);
    }

    setUsers(response);
    const pChats = response.filter((u: any) => {
      let isChatcreated = false;
      if (loginuser._id === u._id) return false;
      if (userChats) {
        isChatcreated = (userChats as any[])?.some((chat: any) => {
          return chat?.members[0] === u._id || chat?.members[1] === u._id;
        });
      }
      return !isChatcreated;
    });
    setPotentialchats(pChats);
  };
  useEffect(() => {
    getusers();
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(`${Config.createchatapi}`, {
      firstId,
      secondId,
    });
    if (response.error) {
      console.log("Error creatingChat", response);
    }
    setUserChats([...userChats, response]);
    getUserChats();
  }, []);
  // const updateCurrentChat = useCallback(
  //   (chat: any) => {
  //     setCurrentchat(chat);
  //   },
  //   [currentChat]
  // );
const updateCurrentChat = (chat:any)=>{
  setCurrentchat(chat);
}

  const getUserChats = async () => {
    if (loginuser?._id) {
      setisUserChatsLoading(true);
      setUserChatsError(null);
      const response = await getRequest(
        `${Config.getuserchatapi}/${loginuser?._id}`
      );
      setisUserChatsLoading(false);

      if (response.error) {
        return setUserChatsError(response);
      }
      setUserChats(response);
    }
  };
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTypeMessage) => {
      if (!textMessage) return console.log("You Must type something...");
      const resp = await postRequest(
        `${Config.createmessageapi}`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender?._id,
          text: textMessage,
        })
      );
      if (resp.error) {
        return setSendTextMessageError(resp);
      }
      setNewMessage(resp);
      setTypeMessage(" ");
      setMessages((prev) => [...prev, resp]);
    },
    []
  );

  useEffect(() => {
    getUserChats();
  }, []);
  useEffect(() => {
    const getMessages = async () => {
      setisMessagesLoading(true);
      const response = await getRequest(
        `${Config.getmessagesapi}/${currentChat?._id}`
      );
      setisMessagesLoading(false);
      if (response.error) {
        return setmessagesError(response);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentChat]);
  return (
    <ChatContext.Provider
      value={{
        users,
        userChats,
        createChat,
        isuserChatsLoading,
        messages,
        getUserChats,
        userChatsError,
        potentialChats,
        updateCurrentChat,
        sendTextMessage,
        currentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
