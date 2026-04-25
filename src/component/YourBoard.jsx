import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const YourBoard = ({ onPinClick }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('saved')
  const [savedPins, setSavedPins] = useState([])
  const [likedPins, setLikedPins] = useState([])
  const [following, setFollowing] = useState([])
  const [viewingAllPins, setViewingAllPins] = useState(false)

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn')
    const savedUser = localStorage.getItem('user')
    if (status === 'true' && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }

    const saved = JSON.parse(localStorage.getItem('savedPins') || '[]')
    const liked = JSON.parse(localStorage.getItem('likedPins') || '[]')
    const followList = JSON.parse(localStorage.getItem('following') || '[]')
    
    setSavedPins(saved)
    setLikedPins(liked)
    setFollowing(followList)
  }, [])

  const handleUnsave = (e, src) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = savedPins.filter(pin => pin !== src);
    setSavedPins(updated);
    localStorage.setItem('savedPins', JSON.stringify(updated));
  };

  const handleUnlike = (e, src) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = likedPins.filter(pin => pin !== src);
    setLikedPins(updated);
    localStorage.setItem('likedPins', JSON.stringify(updated));
  };

  const handleUnfollow = (username) => {
    const updated = following.filter(f => f !== username);
    setFollowing(updated);
    localStorage.setItem('following', JSON.stringify(updated));
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center theme-bg p-8 transition-colors duration-300">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 theme-input rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 theme-text">Log in to see your boards</h1>
          <p className="text-zinc-500 mb-8">Save your favorite ideas and organize them into boards.</p>
          <Link to="/login" className="inline-block bg-[#e60023] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ad081b] transition-colors">Log in</Link>
        </div>
      </div>
    )
  }

  const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : '?';

  return (
    <div className="w-full h-screen overflow-y-auto theme-bg p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {viewingAllPins ? (
            <div className="pb-32">
                <div className="flex items-center gap-6 mb-12 sticky top-0 theme-header z-20 py-4">
                    <button 
                        onClick={() => setViewingAllPins(false)}
                        className="p-3 hover:theme-input rounded-full transition-colors theme-text"
                    >
                        <span className="text-2xl">←</span>
                    </button>
                    <h1 className="text-3xl font-black theme-text">All Pins</h1>
                </div>

                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {savedPins.map((src, index) => (
                        <div 
                          key={index} 
                          onClick={() => onPinClick(src)}
                          className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <img src={src} alt="Saved" className="w-full h-auto object-cover" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                                <div className="flex justify-end">
                                    <button 
                                        onClick={(e) => handleUnsave(e, src)}
                                        className="bg-zinc-100 text-black px-4 py-2 rounded-full font-bold text-xs hover:bg-white transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <>
                {/* Profile */}
                <div className="flex flex-col items-center mb-12">
                    <div className="w-28 h-28 rounded-full bg-[#E60023] flex items-center justify-center text-4xl font-black text-white mb-4 border-2 theme-border shadow-xl">
                        {firstLetter}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight theme-text transition-colors">{user?.username || 'Pinterest User'}</h1>
                    <p className="text-zinc-500 mt-1 font-medium text-sm">@{user?.username?.toLowerCase().replace(/\s+/g, '') || 'user'}</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-8 mb-12 border-b theme-border pb-2 transition-colors">
                    <button 
                        onClick={() => setActiveTab('saved')}
                        className={`pb-4 text-sm font-black transition-all relative ${activeTab === 'saved' ? 'theme-text' : 'text-zinc-400'}`}
                    >
                        Saved
                        {activeTab === 'saved' && <div className="absolute bottom-0 left-0 w-full h-[2px] theme-text bg-current rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('liked')}
                        className={`pb-4 text-sm font-black transition-all relative ${activeTab === 'liked' ? 'theme-text' : 'text-zinc-400'}`}
                    >
                        Liked
                        {activeTab === 'liked' && <div className="absolute bottom-0 left-0 w-full h-[2px] theme-text bg-current rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('following')}
                        className={`pb-4 text-sm font-black transition-all relative ${activeTab === 'following' ? 'theme-text' : 'text-zinc-400'}`}
                    >
                        Following
                        {activeTab === 'following' && <div className="absolute bottom-0 left-0 w-full h-[2px] theme-text bg-current rounded-full" />}
                    </button>
                </div>

                {/* Content */}
                <div className="pb-32">
                    {activeTab === 'saved' && (
                        <div>
                            {savedPins.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    <div 
                                        onClick={() => setViewingAllPins(true)}
                                        className="cursor-pointer group"
                                    >
                                        <div className="h-56 rounded-[24px] overflow-hidden theme-input mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300 relative border theme-border">
                                            <div className="grid grid-cols-2 h-full gap-[2px]">
                                                {savedPins.slice(0, 4).map((src, i) => (
                                                    <img key={i} src={src} className="w-full h-full object-cover" alt="Saved" />
                                                ))}
                                                {savedPins.length < 4 && <div className="bg-zinc-100 dark:bg-zinc-800" />}
                                            </div>
                                        </div>
                                        <div className="px-2">
                                            <h3 className="font-bold text-lg theme-text">All Pins</h3>
                                            <p className="text-xs text-zinc-500 font-medium">{savedPins.length} Pins</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-zinc-500 mb-4 font-medium">Nothing saved yet!</p>
                                    <Link to="/" className="text-[#e60023] font-black hover:underline">Start Exploring</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'liked' && (
                        <div>
                            {likedPins.length > 0 ? (
                                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                    {likedPins.map((src, index) => (
                                        <div 
                                          key={index} 
                                          onClick={() => onPinClick(src)}
                                          className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-300"
                                        >
                                            <img src={src} alt="Liked" className="w-full h-auto object-cover" />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                                                <button 
                                                    onClick={(e) => handleUnlike(e, src)}
                                                    className="bg-white text-black px-4 py-2 rounded-full font-black text-xs hover:bg-zinc-100 transition-colors w-fit"
                                                >
                                                    Unlike
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-zinc-500 font-medium">You haven't liked any Pins yet.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'following' && (
                        <div className="max-w-2xl mx-auto space-y-4">
                            {following.length > 0 ? (
                                following.map((name, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 theme-input rounded-2xl shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-black text-white text-lg">
                                                {name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-black theme-text text-lg">{name}</p>
                                                <p className="text-xs text-zinc-500 font-bold">Creator</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleUnfollow(name)}
                                            className="px-6 py-2.5 rounded-full font-black text-sm bg-zinc-200 text-black hover:bg-zinc-300 transition-all shadow-sm"
                                        >
                                            Unfollow
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-zinc-500 font-medium">You aren't following anyone yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        )}
      </div>
    </div>
  )
}

export default YourBoard
