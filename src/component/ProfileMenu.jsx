import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const savedCurrentUser = localStorage.getItem('user');
        const savedAllUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (savedCurrentUser) {
            setCurrentUser(JSON.parse(savedCurrentUser));
        }
        setAllUsers(savedAllUsers);

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        // We keep 'user' as the last logged in user, but for Pinterest logout usually clears it
        // To be safe, we clear it so they have to login again
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSwitchAccount = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        setCurrentUser(user);
        setIsOpen(false);
        window.location.reload(); // Reload to refresh all components with new user data
    };

    const handleAddAccount = () => {
        // Just navigate to login, and they can login with another account
        // The 'users' array in localStorage will stay intact
        navigate('/login');
        setIsOpen(false);
    };

    if (!currentUser) return null;

    const firstLetter = currentUser.username ? currentUser.username.charAt(0).toUpperCase() : '?';
    const otherUsers = allUsers.filter(u => u.email !== currentUser.email);

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile Circle */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors shadow-sm"
            >
                <span className="text-white font-bold text-lg">{firstLetter}</span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-4 z-[100] border border-gray-100 overflow-hidden">
                    <div className="px-4 mb-4">
                        <p className="text-xs text-gray-500 mb-2">Currently in</p>
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
                            <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-2xl">{firstLetter}</span>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-black text-lg leading-tight truncate">{currentUser.username}</p>
                                    <span className="text-black text-xl">✓</span>
                                </div>
                                <p className="text-sm text-gray-500">Personal</p>
                                <p className="text-sm text-gray-500 break-all truncate">{currentUser.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-2">
                        <p className="px-4 text-xs font-bold text-gray-600 mb-2">Your accounts</p>
                        
                        {/* List other accounts */}
                        {otherUsers.map((user, index) => (
                            <div 
                                key={index}
                                onClick={() => handleSwitchAccount(user)}
                                className="flex items-center gap-3 p-2 mx-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-bold text-lg">{user.username.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-bold text-sm text-black truncate">{user.username}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        ))}

                        <button 
                            onClick={handleAddAccount}
                            className="w-full text-left px-4 py-2.5 font-bold text-black hover:bg-gray-100 rounded-xl transition-colors mt-1"
                        >
                            Add Pinterest account
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2.5 font-bold text-black hover:bg-gray-100 rounded-xl transition-colors mt-1"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
