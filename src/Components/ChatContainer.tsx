import React from 'react'
import './ChatContainer.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ExpandMore } from '@mui/icons-material';
import { BiVideo } from 'react-icons/bi';




const ChatContainer = () => {
  return (
    <div className='chatContainer'>
        <div className='chatHeader'>
            
                <div>
                    <ArrowBackIcon className='backbutton'/>
                </div>
                <div className='userTag'>
                    <div className='userProfileIcon'><p>BC</p></div>
                    <span className='userTitle'>Bhanu Chandar</span>
                    <ExpandMore/>
                </div>
                        
                <BiVideo className="videoIcon"/>
            
        </div>
        <hr/>
        

    </div>
  )
}

export default ChatContainer