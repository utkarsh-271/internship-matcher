import React from 'react';

// This is the new, compatible component for the "Student" / "Employer" choice.
const RoleSelection = ({ onNext, T }) => {
    const handleRoleSelect = (role) => {
        console.log(`Role selected: ${role}`);
        // This function tells the main App to move to the next step
        onNext(); 
    };

    return (
        <div className="role-selection-container">
            <h2 className="role-selection-title">{T('YOU ARE:')}</h2>
            <div className="role-buttons">
                <button className="btn primary-btn" onClick={() => handleRoleSelect('student')}>
                    {T('student')}
                </button>
                <button className="btn primary-btn" onClick={() => handleRoleSelect('employer')}>
                    {T('employer')}
                </button>
            </div>
        </div>
    );
};

export default RoleSelection;

