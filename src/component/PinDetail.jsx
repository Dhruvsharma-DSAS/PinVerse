import React, { useState, useEffect } from 'react';

const PinDetail = ({ pin, onClose, onSave, isDarkMode }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!pin) return null;

  const handleCommentSubmit = (e) => {
    if (e.key === 'Enter' && comment.trim()) {
      setComments([...comments, { text: comment, id: Date.now() }]);
      setComment('');
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10 overflow-y-auto">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[500px] max-h-[95vh]">
        
        {/* Left Side: Image */}
        <div className="w-full md:w-[55%] bg-[#111111] flex items-center justify-center p-6">
          <img 
            src={pin} 
            alt="Pin Detail" 
            className="max-w-full max-h-full object-contain rounded-[32px] shadow-2xl"
          />
        </div>

        {/* Right Side: Interactions */}
        <div className="w-full md:w-[45%] p-10 flex flex-col theme-bg relative">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-10 pr-12">
            <div className="flex gap-4 items-center">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-1.5 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 ${isLiked ? 'scale-110' : ''}`}
                >
                    <img 
                      src="https://i.pinimg.com/736x/bb/79/0c/bb790cee64103b8323e2f79a5c47c3a1.jpg" 
                      className="w-10 h-10 rounded-full object-cover" 
                      alt="Like" 
                    />
                </button>
                <button className="p-1.5 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800">
                    <img 
                      src="https://i.pinimg.com/736x/29/b8/61/29b861b00a58f6c07c80d34520d0490f.jpg" 
                      className="w-10 h-10 rounded-full object-cover" 
                      alt="Send" 
                    />
                </button>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                  onClick={(e) => onSave(e, pin)}
                  className="bg-[#e60023] text-white px-9 py-4 rounded-full font-black text-base hover:bg-[#ad081b] transition-all shadow-xl active:scale-95"
                >
                  Save
                </button>
            </div>
          </div>

          {/* Close Button - Positioned absolutely to avoid overlap */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full hover:theme-input transition-colors theme-text z-50"
          >
            <span className="text-3xl font-light">✕</span>
          </button>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <h1 className="text-3xl font-black theme-text mb-6 tracking-tight">Saved from Pinterest</h1>
            
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg">
                    {JSON.parse(localStorage.getItem('user'))?.username?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div>
                    <p className="font-black theme-text text-lg">Pinterest Creator</p>
                    <p className="text-sm text-zinc-500 font-bold">12.5k followers</p>
                </div>
                <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`ml-auto px-6 py-3 rounded-full font-black text-sm transition-all shadow-md ${isFollowing ? 'theme-input theme-text' : 'bg-zinc-100 text-black hover:bg-zinc-200'}`}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
            </div>

            <div className="space-y-6">
                <h3 className="font-black theme-text text-xl">Comments</h3>
                
                {comments.length === 0 ? (
                    <p className="text-base text-zinc-500 font-medium">No comments yet. Add one to start the conversation!</p>
                ) : (
                    <div className="space-y-4">
                        {comments.map((c) => (
                            <div key={c.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
                                <div className="theme-input p-3 rounded-2xl flex-1 shadow-sm">
                                    <p className="text-xs font-black theme-text mb-1">Guest</p>
                                    <p className="text-sm theme-text">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>

          {/* Comment Input */}
          <div className="pt-8 border-t theme-border mt-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
                <div className="flex-1 theme-input rounded-[24px] px-6 py-3.5 flex items-center shadow-inner">
                    <input 
                        type="text" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleCommentSubmit}
                        placeholder="Add a comment" 
                        className="bg-transparent border-none outline-none w-full text-sm theme-text placeholder-zinc-500 font-medium"
                    />
                    <span className="text-xl cursor-pointer hover:scale-125 transition-transform">😃</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
