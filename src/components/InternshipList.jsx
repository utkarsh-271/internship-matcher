import React from 'react';

const InternshipList = ({ T }) => {
    const internships = [
        { company: "Google", role: "ML Intern", location: "Bengaluru", match: "90%" },
        { company: "Microsoft", role: "Data Science Intern", location: "Hyderabad", match: "85%" },
        { company: "Amazon", role: "AI Intern", location: "Lucknow", match: "80%" }
    ];

    return (
        <div className="internship-list">
            <h2>{T('internship_title')}</h2>
            <div className="cards">
                {internships.map((intern, idx) => (
                    <div key={idx} className="internship-card">
                        <h3>{intern.role}</h3>
                        <p><strong>{T('company')}</strong> {intern.company}</p>
                        <p><strong>{T('location')}</strong> {intern.location}</p>
                        <p><strong>{T('match')}</strong> {intern.match}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InternshipList;