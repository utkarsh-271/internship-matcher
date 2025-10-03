// src/pages/WhoWeArePage.jsx

import React from 'react';
import '../App.css';

// Make sure you have this image in your src/assets folder
import whoWeAreImage from '../assets/who-we-are.png';

const WhoWeArePage = ({ onBack }) => {
  return (
    <div className="info-page">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Login
      </button>
      <div className="info-page-content">
        <h1 className="info-page-title">Who We Are</h1>

        <div className="info-section">
          <div className="info-text">
            <h2>Our Mission</h2>
            <p>
              Smart Internship Matcher was founded by a team of passionate educators, technologists, and career counselors who noticed a significant gap between students' potential and the opportunities available to them. We are innovators dedicated to creating a more equitable and efficient way for students to launch their careers.
            </p>
          </div>
          <div className="info-graphic">
            <img src={whoWeAreImage} alt="A diverse team collaborating" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeArePage;