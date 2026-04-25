import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Notifications = () => {
  const navigate = useNavigate()
  
  const [updates, setUpdates] = useState([
    { id: 1, slug: 'vegetarian-recipes', type: 'recommendation', text: 'New ideas for your board: Vegetarian Recipes', images: ['https:
    { id: 2, slug: 'chic-decor', type: 'user_action', text: 'Emma saved your pin to "Chic Decor"', image: 'https:
    { id: 3, slug: 'reading-aesthetic', type: 'recommendation', text: 'You might like these "Reading Aesthetic" pins', images: ['https:
    { id: 4, slug: 'cute-animals', type: 'user_action', text: 'Someone liked your "Cute Animals" board', image: 'https:
    { id: 5, slug: 'secondhand-glow-ups', type: 'recommendation', text: 'Because you saved "Glow ups", check these out', images: ['https:
  ])
  const handleNotificationClick = (notif) => {
    setUpdates(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))
    if (notif.slug) navigate(`/explore/${notif.slug}`)
  }
  return (
    <div className="w-full h-screen overflow-y-auto theme-bg p-6 sm:p-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-12 text-center">
            <h1 className="text-2xl font-bold border-b-2 theme-border theme-text inline-block pb-1 px-4 transition-colors">Updates</h1>
        </div>
        <div className="flex flex-col gap-2">
            {updates.map((notif) => (
                <div 
                    key={notif.id} 
                    onClick={() => handleNotificationClick(notif)}
                    className={`flex items-center gap-4 p-4 hover:theme-input rounded-[24px] cursor-pointer transition-all group relative`}
                >
                    {!notif.read && <div className="absolute left-1 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" />}
                    
                    <div className="flex-shrink-0">
                    {notif.images ? (
                        <div className="flex -space-x-6">
                        {notif.images.slice(0, 2).map((img, i) => (
                            <div key={i} className={`w-16 h-16 rounded-[20px] border-[3px] theme-border overflow-hidden shadow-sm transition-colors`}>
                            <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-[20px] overflow-hidden shadow-sm">
                        <img src={notif.image} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className={`text-[15px] leading-snug ${notif.read ? 'text-zinc-400' : 'theme-text font-semibold'} line-clamp-2 transition-colors`}>
                        {notif.text}
                    </p>
                    <p className="text-[13px] text-zinc-400 mt-1 font-medium">{notif.time}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default Notifications
