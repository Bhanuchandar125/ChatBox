import React from 'react';
import { BsChatRightText } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { BiVideoPlus } from 'react-icons/bi';
import ChatContainer from './ChatContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Body = () => {
  return (
    <div>
      <div className='appContainer'>
        <div className='sideSection'>
          <div className="sideSection_item">
            <BsChatRightText className="sideSection_icon" /> 
            <span className='sideSection_text'>Chat</span><ExpandMoreIcon className="expandmore"/>
            
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
        <div className='mainSection'>
            <ChatContainer/>
        </div>
      </div>
    </div>
  );
}

export default Body;
