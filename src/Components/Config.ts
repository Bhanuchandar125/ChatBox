
const Config:any={
    registerapi : import.meta.env.VITE_APP_REGISTERAPI,
    loginapi : import.meta.env.VITE_APP_LOGINAPI,
    usersapi : import.meta.env.VITE_APP_USERSAPI,
    finduserapi : import.meta.env.VITE_APP_FINDUSER,
    createchatapi: import.meta.env.VITE_APP_CREATECHAT,
    getuserchatapi: import.meta.env.VITE_APP_GETUSERCHAT,
    getchatsapi:import.meta.env.VITE_APP_GETCHAT,
    getmessagesapi:import.meta.env.VITE_APP_GETMESSAGES,
    createmessageapi:import.meta.env.VITE_APP_CREATEMESSAGE
}

export default Config