import React, { useState, useEffect, useCallback, useRef } from "react";
// Firebase Imports
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithCustomToken,
    signInAnonymously,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import RoleSelection from './components/RoleSelection';
import PersonalityTest from './components/PersonalityTest';
import CVUpload from './components/CVUpload';
import ScoreCard from './components/ScoreCard';
import InternshipList from './components/InternshipList';
import WhoWeArePage from './pages/WhoWeArePage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import ProfileDropdown from './components/ProfileDropdown';

// Import CSS
import './App.css';
import './components/CVUpload.css';
import './components/Footer.css';
import './components/InternshipList.css';
import './components/LanguageSelector.css';
import './components/LoginForm.css';
import './components/PersonalityTest.css';
import './components/ProgressBar.css';
import './components/ScoreCard.css';
import './components/ProfileDropdown.css'; 

import translations from './translation.js';

// --- FIREBASE HELPER ---
const useFirebase = () => {
    // This logic remains the same
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    useEffect(() => {
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (Object.keys(firebaseConfig).length === 0) { console.error("Firebase config is missing."); setIsAuthReady(true); return; }
        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);
        const authenticate = async () => {
            try {
                if (initialAuthToken) { await signInWithCustomToken(authInstance, initialAuthToken); } else { await signInAnonymously(authInstance); }
            } catch (error) { console.error("Firebase authentication failed:", error);
            } finally { setAuth(authInstance); setIsAuthReady(true); }
        };
        authenticate();
    }, []);
    return { auth, isAuthReady };
};

const App = () => {
    const { auth, isAuthReady } = useFirebase();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [homeView, setHomeView] = useState('login');
    const [userProfile, setUserProfile] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const nodeRef = useRef(null);

    const toggleProfileDropdown = () => setIsProfileOpen(prev => !prev);

    // This effect is now only for closing the dropdown, which is correct.
    useEffect(() => {
        const closeDropdown = () => setIsProfileOpen(false);
        if (isProfileOpen) { window.addEventListener('click', closeDropdown); }
        return () => window.removeEventListener('click', closeDropdown);
    }, [isProfileOpen]);

    const [language, setLanguage] = useState('en');
    const T = (key) => (translations[language] && translations[language][key]) || translations['en'][key] || key;

    const [step, setStep] = useState(1);
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

    // Dummy state for other components
    const [personalityData, setPersonalityData] = useState({});
    const [cvData, setCvData] = useState(null);
    const [scoreData, setScoreData] = useState(null);

    // THIS FUNCTION IS NOW CORRECTED
    const handleLogin = async (method) => {
        if (!auth) { return; }
        try {
            let userCredential;
            if (method === 'google') {
                const provider = new GoogleAuthProvider();
                userCredential = await signInWithPopup(auth, provider);
            }
            
            // KEY FIX: Set the user profile DIRECTLY after login
            const user = userCredential.user;
            setUserProfile({
                name: user.displayName || "User",
                email: user.email || "No email provided",
                picture: user.photoURL || null,
                initial: (user.displayName || "U").charAt(0).toUpperCase()
            });

            setIsLoggedIn(true);
            setStep(1);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    
    // THIS FUNCTION IS NOW CORRECTED
    const handleSignup = (data) => {
        // In a real signup, you'd get user data from your auth system.
        // We'll simulate it here.
        setUserProfile({
            name: data.username || "User",
            email: data.email,
            picture: null,
            initial: (data.username || "U").charAt(0).toUpperCase()
        });
        setIsLoggedIn(true);
        setStep(1);
    };

    const handleLogout = () => {
        if (auth) { auth.signOut(); }
        setIsLoggedIn(false);
        setUserProfile(null);
        setIsProfileOpen(false);
        setStep(1);
        setHomeView('login');
    };
    
    const renderHomeView = () => (
        <div className="home-container">
            <Header T={T} language={language} setLanguage={setLanguage} toggleProfileDropdown={toggleProfileDropdown} userProfile={userProfile} />
            {/* The main content of the home page is now wrapped for the blur effect */}
            <main className={`home-content ${isProfileOpen ? 'content-blur' : ''}`}>
                <div className="hero">
                    {showSignup ? (
                        <SignupForm onSignup={handleSignup} onBack={() => setShowSignup(false)} T={T} />
                    ) : (
                        <LoginForm onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} T={T} />
                    )}
                </div>
                <div className="info-section">
                    <div className="info-card" onClick={() => setHomeView('whoWeAre')}><h3>{T('who_we_are')}</h3><p>{T('who_we_are_desc')}</p></div>
                    <div className="info-card" onClick={() => setHomeView('whatWeDo')}><h3>{T('what_we_do')}</h3><p>{T('what_we_do_desc')}</p></div>
                </div>
            </main>
            <Footer T={T} />
        </div>
    );

    const LoggedInView = () => (
        <div className="app-container">
            <Header 
                T={T} 
                userProfile={userProfile} 
                toggleProfileDropdown={toggleProfileDropdown}
                language={language}
                setLanguage={setLanguage}
            />
            {isProfileOpen && (
                <ProfileDropdown 
                    userProfile={userProfile} 
                    onLogout={handleLogout}
                    T={T}
                />
            )}
            <ProgressBar step={step} totalSteps={5} T={T} />
            {/* The blur class is now applied directly to the main content area */}
            <main className={`main-content ${isProfileOpen ? 'content-blur' : ''}`}>
                <div className="back-button-wrapper">
                    {step > 1 && (<button onClick={prevStep} className="back-btn">{T('prev_btn').split('< ')[1]}</button>)}
                </div>
                <div ref={nodeRef}>
                    {step === 1 && <RoleSelection onNext={nextStep} T={T} />}
                    {step === 2 && <PersonalityTest onNext={nextStep} setData={setPersonalityData} T={T} />}
                    {step === 3 && <CVUpload onNext={nextStep} setData={setCvData} T={T} />}
                    {step === 4 && <ScoreCard personality={personalityData} cv={cvData} onNext={nextStep} setScore={setScoreData} T={T} />}
                    {step === 5 && <InternshipList scoreData={scoreData} T={T} />}
                </div>
            </main>
            <Footer T={T} />
        </div>
    );

    const MainContent = () => {
        if (homeView === 'whoWeAre') return <WhoWeArePage onBack={() => setHomeView('login')} />;
        if (homeView === 'whatWeDo') return <WhatWeDoPage onBack={() => setHomeView('login')} />;
        return !isLoggedIn ? renderHomeView() : <LoggedInView />;
    };

    // The outer wrapper no longer controls the blur
    return (
        <div className="app-wrapper">
            <MainContent />
        </div>
    );
};

export default App;

