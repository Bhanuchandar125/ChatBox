import React, { useContext } from 'react'
import Body from '../Components/Body'
import Header from '../Components/Header'
import { AuthUser } from '../Components/Context'

const Home = () => {
  const user = localStorage.getItem("user")
  const {userChats, isuserChatsLoading, userChatsError} = useContext(AuthUser)
  console.log(userChats)

  return (
    <div className='homeBg'>
        <Header/>
        <Body/>
    </div>
  )
}

export default Home