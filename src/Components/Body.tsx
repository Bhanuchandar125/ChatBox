import React, { useContext, useEffect, useState } from "react";
import { BsChatRightText } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { BiVideoPlus } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import ChatContainer from "./ChatContainer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ChatList } from "react-chat-elements";
import data from "../assets/UserData.json";
import "simplebar-react/dist/simplebar.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Authuser, openedChat, userloginstatus } from "./Context";
import Form from "react-bootstrap/Form";
import InitialChatcontainer from "./InitialChatcontainer";
import { ChatContext } from "../Context/ChatContext";
import PotentialUsers from "./PotentialUsers";
import Chat from "./chat";

const Body = () => {
  const [chatClicked, setChatClicked] = useState<boolean>(false);
  const { openChat, setOpenChat } = useContext(openedChat);
  const [chatList, setChatlist] = useState(data);
  const [search, setSearch] = useState("");
  const { loginuser, setLoginuser } = useContext(Authuser);
  const [addbtnclicked, setAddbtnclicked] = useState(false);

  const { users, getUserChats, userChats,messages, isuserChatsLoading, updateCurrentChat, potentialChats } =
    useContext(ChatContext);
 const {islogin, setIslogin}= useContext(userloginstatus);

 const user= localStorage.getItem("user")
 


  const handleopenchat = (chat: any) => {
    setOpenChat(chat);
    localStorage.setItem("openedchat",JSON.stringify(chat));
    setChatlist(data);
    setSearch("");
    updateCurrentChat(chat)
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    const filteredData = data.filter((each) =>
      each?.name.toLowerCase().includes(e.target.value)
    );
    
    setChatlist(filteredData);
    setChatClicked(true);
  };
  useEffect(()=>{
    
    if(user){
      const parseUser =JSON.parse(user)
      const loginuser= users.filter((each:any)=>each._id===parseUser._id)
      setLoginuser(...loginuser)
      
    }
  },[])
  useEffect(() => {
    getUserChats();
  }, [loginuser, addbtnclicked]);

  const scrollableNodeRef = React.createRef();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="appContainer  ">
          <div className="col-md-3  sideSection ">
            <Form>
              <Form.Control
                type="search"
                placeholder="Find People, Spaces and meets"
                className="searchbar me-2"
                aria-label="Search"
                onChange={handleSearch}
                value={search}
              />
            </Form>
            <div
              className={
                chatClicked ? "sideSection_item_clicked" : "sideSection_item"
              }
            >
              <div onClick={() => setChatClicked(!chatClicked)}>
                <BsChatRightText className="sideSection_icon" />
                <span className="sideSection_text">Chat</span>
                <ExpandMoreIcon className="expandmore" />

                {chatClicked
                  ?isuserChatsLoading && <p>ChatList Loading...</p> || userChats?.map((chat: any, index: number) => (
                    <Chat key={index} chat={chat} user={loginuser} handleopenchat={()=>handleopenchat(chat)}/>
                      
                    ))
                  : null}
              </div>
              <GrAdd
                className="addIcon"
                onClick={() => setAddbtnclicked(!addbtnclicked)}
              />
            </div>
            {addbtnclicked && <PotentialUsers />}
            <div className="sideSection_item">
              <div>
                <GoPeople className="sideSection_icon" />
                <span className="sideSection_text">spaces</span>
              </div>
            </div>
            <div className="sideSection_item">
              <div>
                <BiVideoPlus className="sideSection_icon" />
                <span className="sideSection_text">Meet</span>
              </div>
            </div>
          </div>
          <div className=" col-md-9 mainSection ">
            {localStorage.getItem("openedchat") ? (
              <ChatContainer user={loginuser} chat={userChats} />
            ) : (
              <div>
                <InitialChatcontainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
