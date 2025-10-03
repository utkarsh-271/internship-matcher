import React, { useState } from 'react';
import GoogleIcon from './GoogleIcon.jsx';
import AppleIcon from './AppleIcon.jsx';
import translations from '../translation.js';

const LoginForm = ({ onLogin, onShowSignup, T }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin("email"); // Simulated email/password login
    };

    return (
        <div className="login-card">
            {/* The title is now back to "Welcome Back!" */}
            <h2 className="login-title">{T('welcome_back')}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder={T('email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder={T('password_placeholder')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="btn primary-btn">
                    {T('login_btn')}
                </button>
            </form>

            <div className="social-login">
                <button className="btn google-btn" onClick={() => onLogin("google")}>
                    <GoogleIcon /> {T('login_google')}
                </button>
                <button className="btn apple-btn" onClick={() => onLogin("apple")}>
                    <AppleIcon /> {T('login_apple')}
                </button>
            </div>

            <p className="signup-text">
                {T('new_user')}{" "}
                <span onClick={onShowSignup} className="signup-link">
                    {T('create_account')}
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
