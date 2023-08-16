import React from 'react';
import { BsChatRightText } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { BiVideoPlus } from 'react-icons/bi';
import Sidebar from './Sidebar';


const Body = () => {
  return (
    <div>
      <div className='appContainer'>
        <div className='sideSection'>
          <div className="sideSection_item">
            <BsChatRightText className="sideSection_icon" /> 
            <span className='sideSection_text'>Chat</span>
            <div className='dropdown_content'>
              <p>Bhanu</p>
              <p>Vasudev</p>
            </div>
          </div>
          <div className="sideSection_item">
            <GoPeople className="sideSection_icon" />
            <span className='sideSection_text'>spaces</span>
            <div className='dropdown_content'>
              {/* Dropdown content for Spaces */}
              {/* Add your content here */}
            </div>
          </div>
          <div className="sideSection_item">
            <BiVideoPlus className="sideSection_icon" />
            <span className='sideSection_text'>Meet</span>
            <div className='dropdown_content'>
              {/* Dropdown content for Meet */}
              {/* Add your content here */}
            </div>
          </div>
        </div>
        <div className='mainSection'>
            
        </div>
      </div>
    </div>
  );
}

export default Body;
