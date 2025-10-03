// src/pages/WhatWeDoPage.jsx

import React from 'react';
import '../App.css';

// Make sure you have this image in your src/assets folder
import whatWeDoImage from '../assets/what-we-do.png';

const WhatWeDoPage = ({ onBack }) => {
  return (
    <div className="info-page">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Login
      </button>
      <div className="info-page-content">
        <h1 className="info-page-title">What We Do</h1>

        <div className="info-section">
          <div className="info-graphic">
            <img src={whatWeDoImage} alt="Diagram showing AI matching process" />
          </div>
          <div className="info-text">
            <h2>Our Process</h2>
            <p>
              Our platform uses a sophisticated AI-powered engine to match students with internships that align with their personality, skills, and career aspirations. We go beyond traditional keyword matching to consider behavioral traits, work-style preferences, and cultural fit, ensuring a rewarding experience for both students and employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoPage;