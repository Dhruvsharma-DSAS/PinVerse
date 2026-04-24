import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import imageData from '../../imgdata/img data'

const RightBar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const shuffledImages = useMemo(() => {
    return [...imageData].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="w-full h-screen overflow-y-auto p-4 relative">
      
    {/* Notifications removed */}

      <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white z-10 py-2">
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-2">
          <span className="text-gray-500 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>
        <div className="flex gap-4 font-semibold text-sm">
         
          {isLoggedIn ? (
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden flex items-center justify-center cursor-pointer border border-zinc-300">
               <img 
                src="https://img.freepik.com/free-photo/beautiful-shot-natural-scenery-autumn_181624-25934.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-2xl bg-[#b91010] px-4 py-2 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {shuffledImages.map((src, index) => (
          <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative">
            <img 
              src={src} 
              alt={`Pin ${index}`} 
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end">
                <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">Save</button>
              </div>
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-1 bg-white/80 rounded-full px-2 py-1 text-black text-xs font-semibold">
       
                </div>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBar
