import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LeftBar from './component/LeftBar'
import Login from './component/Login'
import Signup from './component/Signup'
import RightBar from './component/RightBar'
import Explore from './component/Explore'
import Notifications from './component/Notifications'
import YourBoard from './component/YourBoard'
import ExploreCategory from './component/ExploreCategory'
import Settings from './component/Settings'
import PinDetail from './component/PinDetail'

const Layout = ({ children, onSettingsClick, isDarkMode }) => {
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'} transition-colors duration-300 relative`}>
      <LeftBar onSettingsClick={onSettingsClick} isDarkMode={isDarkMode} />
      <div className='flex-1 h-screen overflow-hidden'>
        {children}
      </div>
    </div>
  )
}

const App = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [selectedPin, setSelectedPin] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleSettings = () => setShowSettings(!showSettings)

  const handleGlobalSave = (e, src) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const saved = JSON.parse(localStorage.getItem('savedPins') || '[]');
    if (!saved.includes(src)) {
        saved.push(src);
        localStorage.setItem('savedPins', JSON.stringify(saved));
        alert('Saved to your board!');
    } else {
        alert('Already saved!');
    }
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><RightBar onPinClick={setSelectedPin} /></Layout>} />
        <Route path='/explore' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><Explore /></Layout>} />
        <Route path='/explore/:categoryId' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><ExploreCategory onPinClick={setSelectedPin} /></Layout>} />
        <Route path='/notifications' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><Notifications /></Layout>} />
        <Route path='/your-board' element={<Layout onSettingsClick={toggleSettings} isDarkMode={isDarkMode}><YourBoard onPinClick={setSelectedPin} /></Layout>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      {showSettings && (
        <Settings 
          onClose={() => setShowSettings(false)} 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {selectedPin && (
        <PinDetail 
          pin={selectedPin} 
          onClose={() => setSelectedPin(null)} 
          onSave={handleGlobalSave}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  )
}

export default App
