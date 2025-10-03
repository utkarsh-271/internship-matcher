import React, { useState, useEffect, useCallback, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
import LanguageSelector from './components/LanguageSelector';
import ProgressBar from './components/ProgressBar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PersonalityTest from './components/PersonalityTest';
import CVUpload from './components/CVUpload';
import ScoreCard from './components/ScoreCard';
import InternshipList from './components/InternshipList';

// Import CSS
import './App.css';
import './components/CVUpload.css';
import './components/Footer.css';
import './components/Header.css';
import './components/InternshipList.css';
import './components/LanguageSelector.css';
import './components/LoginForm.css';
import './components/PersonalityTest.css';
import './components/ProgressBar.css';
import './components/ScoreCard.css';
// Note: SignupForm uses LoginForm.css, and SocialLoginButton.jsx doesn't have its own CSS file.

// Inside src/App.jsx, near the other imports:
import translations from './translation.js'; // FIX: Ensure .js extension is present

// --- FIREBASE HELPER (moved outside App) ---
const useFirebase = () => {
    // ... (rest of the firebase logic you provided)
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        if (Object.keys(firebaseConfig).length === 0) {
            console.error("Firebase config is missing. Authentication disabled.");
            setIsAuthReady(true);
            return;
        }

        const app = initializeApp(firebaseConfig);
        const authInstance = getAuth(app);

        const authenticate = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(authInstance, initialAuthToken);
                } else {
                    await signInAnonymously(authInstance);
                }
            } catch (error) {
                console.error("Firebase authentication failed:", error);
            } finally {
                setAuth(authInstance);
                setIsAuthReady(true);
            }
        };

        authenticate();
    }, []);

    return { auth, isAuthReady };
};


const App = () => {
    // ... (rest of your state and handlers)
    const { auth, isAuthReady } = useFirebase();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    
    // 1. CREATE REF
    const nodeRef = useRef(null); 

    useEffect(() => {
        if (isAuthReady && auth?.currentUser) {
            setIsLoggedIn(true);
        }
    }, [isAuthReady, auth]);

    const [language, setLanguage] = useState('en');

    const T = (key) => {
        const translated = translations[language][key];
        return translated || translations['en'][key] || key;
    };

    const [step, setStep] = useState(1);
    const [personalityData, setPersonalityData] = useState({});
    const [cvData, setCvData] = useState(null);
    const [scoreData, setScoreData] = useState(null);

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

    const handleLogin = async (method) => {
        if (!auth) {
            console.error("Authentication system not initialized.");
            setIsLoggedIn(true);
            return;
        }

        try {
            if (method === 'google') {
                const provider = new GoogleAuthProvider();
                provider.setCustomParameters({ prompt: 'select_account' });
                const result = await signInWithPopup(auth, provider);
                console.log("Google login successful:", result.user.uid);
                setIsLoggedIn(true);
            } else if (method === 'apple') {
                console.log("Apple login simulated successfully.");
                setIsLoggedIn(true);
            } else if (method === 'email') {
                console.log("Email login simulated successfully.");
                setIsLoggedIn(true);
            }
            setStep(1);
        } catch (error) {
            console.error("Login failed:", error.code, error.message);
        }
    };

    const handleSignup = (data) => {
        console.log("Account created via form:", data);
        setShowSignup(false);
        setIsLoggedIn(true);
        setStep(1);
    };

    return (
        <>
            <div className="style-container">
                {/* All CSS styles from the original StyleBlock component should be here */}
            </div>

            {!isLoggedIn ? (
                <div className="home-container">
                    <Header />
                    <LanguageSelector language={language} setLanguage={setLanguage} T={T} />
                    <div className="hero">
                        {showSignup ? (
                            <SignupForm onSignup={handleSignup} onBack={() => setShowSignup(false)} T={T} />
                        ) : (
                            <LoginForm onLogin={handleLogin} onShowSignup={() => setShowSignup(true)} T={T} />
                        )}
                    </div>
                    <div className="info-section">
                        <div className="info-card">
                            <h3>{T('who_we_are')}</h3>
                            <p>{T('who_we_are_desc')}</p>
                        </div>
                        <div className="info-card">
                            <h3>{T('what_we_do')}</h3>
                            <p>{T('what_we_do_desc')}</p>
                        </div>
                    </div>
                    <Footer T={T} />
                </div>
            ) : (
                <div className="app-container">
                    <Header />
                    <LanguageSelector language={language} setLanguage={setLanguage} T={T} />
                    <ProgressBar step={step} T={T} />
                    <main className="main-content">
                        <div className="back-button-wrapper">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="back-btn"
                                >
                                    {T('prev_btn').split('< ')[1]}
                                </button>
                            )}
                        </div>

                        <TransitionGroup className="main-transition-group">
                            <CSSTransition 
                                key={step} 
                                timeout={300} 
                                classNames="fade" 
                                unmountOnExit
                                // 2. PASS THE REF TO CSSTRANSITION
                                nodeRef={nodeRef} 
                            >
                                <div ref={nodeRef}> {/* 3. ATTACH REF TO WRAPPING DIV */}
                                    {step === 1 && (
                                        <PersonalityTest onNext={nextStep} setData={setPersonalityData} T={T} />
                                    )}
                                    {step === 2 && <CVUpload onNext={nextStep} setData={setCvData} T={T} />}
                                    {step === 3 && (
                                        <ScoreCard
                                            personality={personalityData}
                                            cv={cvData}
                                            onNext={nextStep}
                                            setScore={setScoreData}
                                            T={T}
                                        />
                                    )}
                                    {step === 4 && <InternshipList scoreData={scoreData} T={T} />}
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    </main>
                    <Footer T={T} />
                </div>
            )}
        </>
    );
};

export default App;
