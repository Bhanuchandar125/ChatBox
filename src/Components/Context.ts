import {createContext} from 'react';

export const userloginstatus = createContext<any>(null);
export const Message = createContext<any>({})

export const selectedFilesArray = createContext<any>([]);
export const sentMessagesArray = createContext<any>([]);
export const openedChat = createContext<any|null>(null)

