import "./App.css";
import "../src/index.css";
import AppRoutes from "./Routes/AppRoutes";
import { useContext, useState } from "react";
import {
  
  AuthUserProvider,
  Message,
  userloginstatus,
} from "../src/Components/Context";
import {
  selectedFilesArray,
  sentMessagesArray,
  openedChat,
} from "./Components/Context";

import "./index.css";
import { ChatContextProvider } from "./Context/ChatContext";

function App() {
  const [islogin, setIslogin] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sentmessages, setSentMessages] = useState([]);
  const [openChat, setOpenChat] = useState()
  const [message, setMessage] = useState<any>({
    Message: "",
    type: "",
  });

  return (
    <AuthUserProvider>
      <selectedFilesArray.Provider value={{ selectedFiles, setSelectedFiles }}>
        <userloginstatus.Provider value={{ islogin, setIslogin }}>
          <sentMessagesArray.Provider value={{ sentmessages, setSentMessages }}>
            <openedChat.Provider value={{ openChat, setOpenChat }}>
              <Message.Provider value={{ message, setMessage }}>
                <ChatContextProvider>
                  <AppRoutes />
                </ChatContextProvider>
              </Message.Provider>
            </openedChat.Provider>
          </sentMessagesArray.Provider>
        </userloginstatus.Provider>
      </selectedFilesArray.Provider>
    </AuthUserProvider>
  );
}

export default App;
