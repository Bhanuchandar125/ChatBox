import React from 'react'
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom"
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Home from '../Pages/Home'

const AppRoutes = () => {
  const user = localStorage.getItem("user")
  
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes