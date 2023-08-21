import React from 'react'
import Body from '../Components/Body'
import Header from '../Components/Header'

const Home = () => {
  const user = localStorage.getItem("user")
  console.log("user", user)
  return (
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

export default Home