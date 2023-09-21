import React, { useContext, useState } from 'react';
import { BsChatRightText } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { BiVideoPlus } from 'react-icons/bi';
import ChatContainer from './ChatContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatList } from 'react-chat-elements';
import  data from '../assets/UserData.json';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Authuser, openedChat } from './Context';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InitialChatcontainer from './InitialChatcontainer';
import { ChatContext } from '../Context/ChatContext';
import { useFetchReciepient } from '../Hooks/useFetchReciepient';


const Body = () => {
 
  const [chatClicked, setChatClicked] = useState<boolean>(false)
  const {openChat, setOpenChat} = useContext(openedChat)
  const [chatList, setChatlist] = useState(data)
  const [search, setSearch] = useState ("")
  const {loginuser} = useContext(Authuser)

  const {userChats, isuserChatsLoading, userChatsError, potentialChats} = useContext(ChatContext)
  
  
  const {reciepient} = useFetchReciepient(userChats, loginuser)

  console.log(potentialChats)
  console.log("reciepient",reciepient)

  const handleopenchat = (chat:any)=>{
   
    setOpenChat(chat) 
    localStorage.setItem("openedchat", JSON.stringify(chat))
    setChatlist(data)
    setSearch("")
  }
  const handleSearch=(e:any)=>{
    setSearch(e.target.value)
    const filteredData = data.filter((each)=>each.name.toLowerCase().includes(e.target.value))
    console.log(filteredData)
    setChatlist(filteredData)
    setChatClicked(true)
  }
  const scrollableNodeRef = React.createRef();
  return (
    <div className='container-fluid'>
      <div className='row'>
      <div className='appContainer  '>
        <div className='col-md-3  sideSection '>
        <Form >
            <Form.Control
              type="search"
              placeholder="Find People, Spaces and meets"
              className="searchbar me-2"
              aria-label="Search"
              onChange={handleSearch}
              value={search}
            />
           
          </Form>
          <div className={chatClicked?"sideSection_item_clicked":"sideSection_item"} onClick={()=>setChatClicked(!chatClicked)}>
            <BsChatRightText className="sideSection_icon" /> 
            <span className='sideSection_text'>Chat</span><ExpandMoreIcon className="expandmore"/>
            {chatClicked ? (
            chatList.map((each: any, index:number) => (
             
              <ChatList
                key={index} 
                className='chat-list'
                dataSource={[
                  {
                    avatar: each.profile_image,
                    alt: reciepient.name,
                    title: reciepient.name,
                    subtitle: each.recent_message,
                    date: each.last_message_Date,
                    unread: 3,
                  }
                  
                ]}
                onClick={()=>handleopenchat(each)}
              />
              
            ))
          ) : null}
          </div>
          
          <div className="sideSection_item">
            <GoPeople className="sideSection_icon" />
            <span className='sideSection_text'>spaces</span>
            
          </div>
          <div className="sideSection_item">
            <BiVideoPlus className="sideSection_icon" />
            <span className='sideSection_text'>Meet</span>
            
          </div>
        </div>
        <div className=' col-md-9 mainSection '>
          {localStorage.getItem("openedchat")?(
            <ChatContainer
            user={loginuser}
            chat= {userChats}/>
          ):(
            <div>
              <InitialChatcontainer/>
            </div>
          )}
            
        </div>
      </div>
      </div>
    </div>
  );
}

export default Body;
