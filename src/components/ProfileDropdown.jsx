import React from 'react';
import './ProfileDropdown.css';

// This version correctly displays the user's data and handles logout.
const ProfileDropdown = ({ userProfile, onLogout, T }) => {

    // This stops clicks inside the dropdown from closing it
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className="profile-dropdown" onClick={handleDropdownClick}>
            <div className="dropdown-header">
                <div className="dropdown-profile-pic">
                    {/* CORRECTED: Now looks for userProfile.picture */}
                    {userProfile.picture ? (
                        <img src={userProfile.picture} alt="Profile" />
                    ) : (
                        <span className="dropdown-profile-initials">
                            {/* CORRECTED: Now looks for userProfile.initial */}
                            {userProfile.initial}
                        </span>
                    )}
                </div>
                <div className="dropdown-user-info">
                    <p className="dropdown-user-name">{userProfile.name}</p>
                    <p className="dropdown-user-email">{userProfile.email}</p>
                </div>
            </div>
            <ul className="dropdown-menu">
                <li className="dropdown-item">Edit Profile</li>
                <li className="dropdown-item">Settings</li>
                {/* CORRECTED: The logout button now works */}
                <li className="dropdown-item dropdown-logout" onClick={onLogout}>
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdown;

