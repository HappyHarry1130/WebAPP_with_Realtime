import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { LogIn } from 'react-feather';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const disPatch  = useDispatch();


  const handleLogin = async () => {
    if (!email || !password) {
      console.log("please fill out all fields");
      return;
    }
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (response.user) {
        setEmail("");
        setPassword('');
        navigator('/home');
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 digonal-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;