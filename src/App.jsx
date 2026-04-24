import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LeftBar from './component/LeftBar'
import Login from './component/Login'
import SignUp from './component/SignUp'
import RightBar from './component/RightBar'
import Notifications from './component/Notifications'
import YourBoard from './component/YourBoard'

const Layout = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a small notification after 1 second
    const timer = setTimeout(() => {
        setShowNotification(true);
        // Hide it after 4 seconds
        setTimeout(() => setShowNotification(false), 4000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex h-screen bg-white'>
      <LeftBar />
      <div className='flex-1 h-screen overflow-hidden relative'>
        {children}
        
        {/* Toast Notification */}
        {showNotification && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-bounce">
              <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-zinc-700">
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                      <img src="https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-bold">New ideas waiting for you!</span>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout><RightBar /></Layout>} />
      <Route path='/notifications' element={<Layout><Notifications /></Layout>} />
      <Route path='/your-board' element={<Layout><YourBoard /></Layout>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
