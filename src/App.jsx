import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LeftBar from './component/LeftBar'
import Login from './component/Login'
import Signup from './component/Signup'
import RightBar from './component/RightBar'
// Explore and YourBoard removed

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen bg-white'>
      <LeftBar />
      <div className='flex-1 h-screen overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout><RightBar /></Layout>} />
  {/* Explore and YourBoard routes removed */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
