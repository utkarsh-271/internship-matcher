import React from 'react';
import LanguageSelector from './LanguageSelector'; // We will render this inside the header

const Header = ({
    T,
    userProfile,
    toggleProfileDropdown,
    language,     // Now receives language props
    setLanguage   // Now receives language props
}) => {
    
    const handleProfileClick = (e) => {
        e.stopPropagation(); // Prevents the click from closing the dropdown instantly
        toggleProfileDropdown();
    };

    return (
        <header className="app-header">
            <div className="header-logo">{T('header_title')}</div>
            
            {/* This div now wraps BOTH controls for proper alignment */}
            <div className="header-controls">
                <LanguageSelector 
                    language={language}
                    setLanguage={setLanguage}
                    T={T}
                />

                {userProfile && (
                    <div 
                        className="profile-container" 
                        onClick={handleProfileClick}
                    >
                        <div className="profile-pic">
                            {userProfile.picture ? (
                                <img src={userProfile.picture} alt="Profile" />
                            ) : (
                                <span>{userProfile.initial}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;