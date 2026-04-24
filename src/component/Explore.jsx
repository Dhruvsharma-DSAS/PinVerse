import React from 'react'

const Explore = () => {
  const exploreItems = [
    {
      id: 1,
      title: 'Vegetarian recipes to make on repeat',
      subtitle: 'On the menu',
      image: 'https://i.pinimg.com/736x/63/ee/89/63ee89f3e840c57193b8f92fe60ba85d.jpg' 
    },
    {
      id: 2,
      title: 'Chic decor ideas inspired by animal prints',
      subtitle: 'Statement pieces',
      image: 'https://i.pinimg.com/1200x/f5/a7/d6/f5a7d628c7e1a3c0a1da92b22cd733dc.jpg'
    },
    {
      id: 3,
      title: 'Secondhand glow ups',
      subtitle: 'Thrift it',
      image: 'https://i.pinimg.com/736x/72/9a/13/729a1331da87f1fe02932578d2e12117.jpg'
    },
    {
      id: 4,
      title: 'Reading aesthetic',
      subtitle: 'For the love of books',
      image: 'https://i.pinimg.com/736x/a9/a6/f3/a9a6f3c554d9fc2114217cdcdffb65f0.jpg'
    },
    {
      id: 5,
      title: 'How to draw cute animals',
      subtitle: 'Aww-dorable art',
      image: 'https://i.pinimg.com/736x/95/40/b1/9540b1b5148dcb258bcfb7b55d705373.jpg'
    },
    {
      id: 6,
      title: 'Good things are happening',
      subtitle: 'All about hopecore',
      image: 'https://i.pinimg.com/736x/96/52/92/965292c83e93599aa12f93a0b42a1029.jpg'
    }
  ]

  return (
    <div className="w-full h-screen overflow-y-auto bg-white p-8 scroll-smooth">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-12 max-w-5xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-20 py-4">
        <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 py-3 border border-transparent focus-within:border-blue-400 transition-all">
          <span className="text-gray-500 mr-2 text-xl">🔍</span>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none w-full text-lg"
          />
        </div>
        <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-zinc-300 transition-colors">
            <img 
                src="https://img.freepik.com/free-photo/beautiful-shot-natural-scenery-autumn_181624-25934.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
            />
        </div>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight">Stay inspired</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
        {exploreItems.map((item) => (
          <div 
            key={item.id} 
            className="relative h-[550px] rounded-[40px] overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <p className="text-base font-bold mb-2 uppercase tracking-widest opacity-90">{item.subtitle}</p>
              <h2 className="text-3xl md:text-4xl font-black leading-[1.1] max-w-[80%] drop-shadow-md">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore
