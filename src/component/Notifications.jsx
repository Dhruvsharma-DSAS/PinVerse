import React from 'react'

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'recommendation',
      text: 'New ideas for your board: Vegetarian Recipes',
      images: [
        'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg',
        'https://i.pinimg.com/736x/4d/52/62/4d5262095f9c3b88b0292723652d3a95.jpg',
        'https://i.pinimg.com/736x/2b/b9/8e/2bb98e5473455169a941f715873918a5.jpg'
      ],
      time: '2h'
    },
    {
      id: 2,
      type: 'user_action',
      text: 'Emma saved your pin to "Chic Decor"',
      image: 'https://i.pinimg.com/1200x/f5/a7/d6/f5a7d628c7e1a3c0a1da92b22cd733dc.jpg',
      time: '5h'
    },
    {
      id: 3,
      type: 'recommendation',
      text: 'You might like these "Reading Aesthetic" pins',
      images: [
        'https://i.pinimg.com/736x/a9/a6/f3/a9a6f3c554d9fc2114217cdcdffb65f0.jpg',
        'https://i.pinimg.com/736x/72/9a/13/729a1331da87f1fe02932578d2e12117.jpg'
      ],
      time: '1d'
    },
    {
      id: 4,
      type: 'user_action',
      text: 'Someone liked your "Cute Animals" board',
      image: 'https://i.pinimg.com/736x/95/40/b1/9540b1b5148dcb258bcfb7b55d705373.jpg',
      time: '2d'
    },
    {
      id: 5,
      type: 'recommendation',
      text: 'Because you saved "Glow ups", check these out',
      images: [
        'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg',
        'https://i.pinimg.com/736x/96/52/92/965292c83e93599aa12f93a0b42a1029.jpg'
      ],
      time: '3d'
    }
  ]

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
            <h1 className="text-xl font-bold border-b-2 border-black pb-1">Updates</h1>
            <h1 className="text-xl font-bold text-zinc-400 cursor-pointer hover:text-black transition-colors">Messages</h1>
        </div>
        
        <div className="flex flex-col gap-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-2xl cursor-pointer transition-all group">
              {/* Image Layout */}
              <div className="flex-shrink-0">
                {notif.images ? (
                  <div className="flex -space-x-4">
                    {notif.images.slice(0, 2).map((img, i) => (
                      <div key={i} className="w-14 h-14 rounded-2xl border-2 border-white overflow-hidden shadow-sm">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                    <img src={notif.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-[15px] font-medium text-zinc-900 line-clamp-2">
                  {notif.text}
                </p>
                <p className="text-[13px] text-zinc-500">{notif.time}</p>
              </div>

              {/* Arrow */}
              <div className="text-zinc-300 group-hover:text-black transition-colors mr-2">
                <span className="text-xl">›</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-zinc-100 pt-8">
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">You're all caught up!</p>
        </div>
      </div>
    </div>
  )
}

export default Notifications
