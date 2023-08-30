import React, { useState } from 'react';
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


const Body = () => {
 
  const [chatClicked, setChatClicked] = useState<boolean>(false)
  const [openChat, setOpenChat] = useState({})

  const handleopenchat = (chat:any)=>{
    setOpenChat(chat) 
  }
  const scrollableNodeRef = React.createRef();
  return (
    <div className='container-fluid'>
      <div className='row'>
      <div className='appContainer  '>
        <div className='col-md-3  sideSection '>
          <div className={chatClicked?"sideSection_item_clicked":"sideSection_item"} onClick={()=>setChatClicked(!chatClicked)}>
            <BsChatRightText className="sideSection_icon" /> 
            <span className='sideSection_text'>Chat</span><ExpandMoreIcon className="expandmore"/>
            {chatClicked ? (
            data.map((each: any, index:number) => (
              
              <ChatList
                key={index} 
                className='chat-list'
                dataSource={[
                  {
                    avatar: each.profile_image,
                    alt: 'kursat_avatar',
                    title: each.name,
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
            <ChatContainer
            user={openChat}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Body;
