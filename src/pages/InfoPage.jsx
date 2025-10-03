import React from 'react';
import '../App.css';

// Import your images from the assets folder
import whoWeAreImage from '../assets/who-we-are.png';
import whatWeDoImage from '../assets/what-we-do.png';

const InfoPage = ({ onBack }) => {
  return (
    <div className="info-page">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Login
      </button>
      <div className="info-page-content">
        <h1 className="info-page-title">About Smart Internship Matcher</h1>

        {/* Section 1: Who We Are */}
        <div className="info-section">
          <div className="info-text">
            <h2>Who We Are</h2>
            <p>
              Smart Internship Matcher was founded by a team of passionate educators, technologists, and career counselors who noticed a significant gap between students' potential and the opportunities available to them. We are innovators dedicated to creating a more equitable and efficient way for students to launch their careers.
            </p>
          </div>
          <div className="info-graphic">
            <img src={whoWeAreImage} alt="A diverse team collaborating" />
          </div>
        </div>

        {/* Section 2: What We Do */}
        <div className="info-section">
          <div className="info-graphic">
            <img src={whatWeDoImage} alt="Diagram showing AI matching process" />
          </div>
          <div className="info-text">
            <h2>What We Do</h2>
            <p>
              Our platform uses a sophisticated AI-powered engine to match students with internships that align with their personality, skills, and career aspirations. We go beyond traditional keyword matching to consider behavioral traits, work-style preferences, and cultural fit, ensuring a rewarding experience for both students and employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;