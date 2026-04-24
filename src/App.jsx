import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LeftBar from './component/LeftBar'
import Login from './component/Login'
import Signup from './component/Signup'
import RightBar from './component/RightBar'


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

      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      
      {/* Redirect any other route to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


export default App
