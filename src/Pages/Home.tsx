import React, { useContext } from 'react'
import Body from '../Components/Body'
import Header from '../Components/Header'
import { ChatContext } from '../Context/ChatContext'

const Home = () => {
  const user = localStorage.getItem("user")
  
  return (
    <div className='homeBg'>
        <Header/>
        <Body/>
    </div>
  )
}

export default Home