import React from 'react';

const ProgressBar = ({ step, T }) => {
    const steps = [
        T("step_personality"),
        T("step_cv_upload"),
        T("step_score"),
        T("step_internships")
    ];

    return (
        <div className="progress-container">
            {steps.map((label, index) => (
                <div key={index} className="progress-step">
                    <div className={`circle ${step > index ? "active" : ""}`}>{index + 1}</div>
                    <div className="label">{label}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;