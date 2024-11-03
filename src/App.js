import { ConsolePage } from './pages/ConsolePage';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignUp';
import LoginPage from './pages/Login';
import { auth } from './firebaseConfig'; // Assuming you have a firebaseConfig file
import SubscriptionPage from './pages/SubscriptionPage';
import Success from './pages/PaymentSuccess';
import Cancel from './pages/PaymentCancel';
import { useSelector, Provider } from 'react-redux';
import store from './store';
import Contact from './pages/Contact';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Custom component to handle protected routes
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  const user = useSelector(state => state.user);
  console.log(user)
  // if (user) {
  //   setIslogined('true');
  // }

  return (
      <div data-component="App">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={user.userNmae ? "/home" : "/login"} />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<ProtectedRoute><ConsolePage /></ProtectedRoute>} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path='/contact' element = {<Contact/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;