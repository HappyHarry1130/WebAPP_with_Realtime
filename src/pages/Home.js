// src/pages/Home.js

import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([
    { label: 'You:', text: 'Can you please tell me what you plan to do today?', isUser: true },
    { label: 'Assistant:', text: 'My plans for today are to be here to assist you with whatever you need and answer your questions.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { label: 'You:', text: inputValue, isUser: true }]);
      setInputValue('');
      // Simulate assistant response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { label: 'Assistant:', text: 'This is a simulated response.' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex flex-col justify-center items-center relative`}>
      <div className="w-full  p-4">
        <ChatSection messages={messages} />
        <div className="flex mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r">
            Send
          </button>
        </div>
      </div>
      <UserMenu isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <ControlButtons />
      <TalkButton />
      <PlaybackInfo />
    </div>
  );
};

const ChatSection = ({ messages }) => (
  <div className="space-y-4 h-[800px] overflow-y-auto border p-2 rounded">
    {messages.map((msg, index) => (
      <ChatBubble key={index} label={msg.label} text={msg.text} isUser={msg.isUser} />
    ))}
  </div>
);

const ChatBubble = ({ label, text, isUser }) => (
  <div className={`p-4 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} shadow-md`}>
    <div className="text-sm font-semibold mb-1">{label}</div>
    <div className="text-base">{text}</div>
  </div>
);

const UserMenu = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

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

  return (
    <div className="absolute top-4 right-4" ref={menuRef}>
      <button onClick={toggleMenu} className="bg-gray-800 text-white py-2 px-4 rounded-full flex items-center">
        Jhon Doe
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Profile and Subscription</a>
          <button onClick={toggleTheme} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
            Mode: {isDarkMode ? 'Dark' : 'Light'}
          </button>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Contact</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Log out</a>
        </div>
      )}
    </div>
  );
};

const ControlButtons = () => {
  const [isAuto, setIsAuto] = useState(true);

  return (
    <div className="absolute bottom-4 left-4 flex space-x-4">
      <button
        className={`py-2 px-4 rounded ${isAuto ? 'bg-green-600' : 'bg-gray-800'} text-white`}
        onClick={() => setIsAuto(true)}
      >
        Auto
      </button>
      <button
        className={`py-2 px-4 rounded ${!isAuto ? 'bg-green-600' : 'bg-gray-800'} text-white`}
        onClick={() => setIsAuto(false)}
      >
        Manual
      </button>
    </div>
  );
};

const TalkButton = () => (
  <button className="bg-red-600 text-white p-3 rounded-full absolute bottom-4">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8"></circle>
    </svg>
  </button>
);

const PlaybackInfo = () => (
  <div className="absolute bottom-4 right-4 text-right">
    <div>Playback speed: 1.5X</div>
    <div>Subtitles: Si</div>
  </div>
);

export default Home;