import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import heroImg from '../../public/hero-bg.png';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (method) => {
    console.log('Logged in via:', method);
    // CHANGE: Navigate to the new role selection page
    navigate('/select-role');
  };

  const handleSignup = (data) => {
    console.log('Account created:', data);
    setShowSignup(false);
    // CHANGE: Also navigate to role selection after signing up
    navigate('/select-role');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img src={heroImg} alt="Hero" className="w-full h-64 object-cover mb-6"/>
      {showSignup ? (
        <SignupForm onSignup={handleSignup} onBack={() => setShowSignup(false)} />
      ) : (
        <LoginForm onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} />
      )}
    </div>
  );
}
