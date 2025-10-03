import React, { useCallback } from 'react';

const LanguageSelector = ({ language, setLanguage, T }) => {
    const handleLanguageChange = useCallback((e) => {
        setLanguage(e.target.value);
    }, [setLanguage]);

    return (
        <div className="language-selector">
            <label htmlFor="lang">{T('lang_label')}</label>
            <select id="lang" value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
                <option value="ta">தமிழ்</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
