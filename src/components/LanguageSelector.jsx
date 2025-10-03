import React from 'react';

// This simplified version has no extra wrappers that could cause conflicts.
const LanguageSelector = ({ language, setLanguage, T }) => {
    return (
        <div className="language-selector-wrapper">
            <label htmlFor="language-select" className="language-label">{T('lang_label')}</label>
            <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select-dropdown"
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
            </select>
        </div>
    );
};

export default LanguageSelector;