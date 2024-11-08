import React, { useState, useRef, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebaseConfig';
const UserMenu = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState('');
  const menuRef = useRef(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser('');
      }
    });
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSubscription = () => {
    navigate('/subscription');
  };
  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div className="absolute top-4 right-4" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="bg-gray-800 text-white py-2 px-4 rounded-full flex items-center"
      >
        {user ? user.displayName || 'User' : 'Guest'}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          <button
            onClick={handleSubscription}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Profile & Subscription
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Log out
          </button>
          <button
            onClick={handleContact}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Contact
          </button>
          <button
            onClick={toggleTheme}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Mode: {isDarkMode ? 'Dark' : 'Light'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
