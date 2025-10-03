import React, { useState } from "react";
import "./PersonalityTest.css";

const questions = [
  "Describe how you handle situations when multiple tasks are assigned at the same time and deadlines are tight.",
  "How do you approach working in a team where members have different working styles and opinions?",
  "Can you explain a time when you had to adapt quickly to a completely new environment or project?",
  "How do you manage stress when a project doesn’t go as planned or faces unexpected challenges?",
  "Describe your approach to learning new technical skills or tools when required for a project.",
  "How do you prioritize tasks when all of them seem equally important and urgent?",
  "Explain a situation where you had to take initiative to solve a problem without waiting for instructions.",
  "How do you handle constructive criticism and use it to improve your performance?",
  "Describe a scenario where you had to make a difficult decision under pressure, and how you went about it.",
  "How do you ensure effective communication with team members when working on complex projects?",
  "Explain a time when you had to think creatively to overcome an obstacle or find a solution.",
  "How do you reflect on past experiences to improve your work and personal development?"
];

function PersonalityTest({ onNext, setData }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (value) => {
    setAnswers({ ...answers, [currentIndex]: value });
  };

  const handleNext = () => {
    if (answers[currentIndex] === undefined) {
      alert("Please answer this question before proceeding.");
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setData(answers);
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="personality-test">
      <h2>Personality Test</h2>
      <div className="question-card">
        <p>{questions[currentIndex]}</p>
        <div className="options">
          {[1,2,3,4,5].map((val) => (
            <button
              key={val}
              className={answers[currentIndex] === val ? "selected" : ""}
              onClick={() => handleChange(val)}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentIndex > 0 && (
          <button className="prev-btn" onClick={handlePrev}>
            Previous
          </button>
        )}
        <button className="next-btn" onClick={handleNext}>
          {currentIndex === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>

      <div className="progress-text">
        Question {currentIndex + 1} of {questions.length}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default PersonalityTest;
