import React, { useState } from 'react';

const SignupForm = ({ onSignup, onBack, T }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        mobile: "",
        email: "",
        address: "",
        education: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSignup(formData);
    };

    return (
        <div className="login-card">
            <h2 className="login-title">{T('create_account_title')}</h2>

            <input
                name="username"
                type="text"
                placeholder={T('username_ph')}
                value={formData.username}
                onChange={handleChange}
                required
                className="login-input"
            />
            <input
                name="password"
                type="password"
                placeholder={T('password_placeholder')}
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
            />
            <input
                name="mobile"
                type="text"
                placeholder={T('mobile_ph')}
                value={formData.mobile}
                onChange={handleChange}
                required
                className="login-input"
            />
            <input
                name="email"
                type="email"
                placeholder={T('email_placeholder')}
                value={formData.email}
                onChange={handleChange}
                required
                className="login-input"
            />
            <input
                name="address"
                type="text"
                placeholder={T('address_ph')}
                value={formData.address}
                onChange={handleChange}
                required
                className="login-input"
            />
            <input
                name="education"
                type="text"
                placeholder={T('education_ph')}
                value={formData.education}
                onChange={handleChange}
                required
                className="login-input"
            />

            <button
                className="btn primary-btn"
                onClick={handleSubmit}
            >
                {T('create_account_title')}
            </button>

            <p className="signup-text">
                <span
                    onClick={onBack}
                    className="signup-link"
                >
                    {T('back_to_login')}
                </span>
            </p>
        </div>
    );
};

export default SignupForm;