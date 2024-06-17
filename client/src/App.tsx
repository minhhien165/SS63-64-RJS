import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
  )
}
