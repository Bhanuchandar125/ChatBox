import { createContext, useState } from 'react';

export const userloginstatus = createContext<any>(null);
export const Message = createContext<any>({});
export const selectedFilesArray = createContext<any>([]);
export const sentMessagesArray = createContext<any>([]);
export const openedChat = createContext<any | null>(null);
export const Authuser = createContext<any>(null)



export const AuthUserProvider = ({ children }) => {
  const [loginuser, setLoginuser] = useState({});
  return (
    <Authuser.Provider value={{ loginuser, setLoginuser }}>
      {children}
    </Authuser.Provider>
  );
};
