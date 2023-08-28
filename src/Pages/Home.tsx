import React from 'react'
import Body from '../Components/Body'
import Header from '../Components/Header'

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