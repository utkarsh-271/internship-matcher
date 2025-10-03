import React, { useState, useEffect } from 'react';

const ScoreCard = ({ personality, cv, onNext, setScore, T }) => {
    const [score, setLocalScore] = useState(0);

    useEffect(() => {
        const personalityScore = Object.values(personality).reduce((a, b) => a + b, 0);
        const cvScore = cv ? 10 : 0;
        const rawScore = personalityScore + cvScore;
        const totalScore = Math.min(Math.round((rawScore / 70) * 50), 50);

        setLocalScore(totalScore);
        setScore({ total: totalScore, cvUploaded: !!cv });
    }, [personality, cv, setScore]);

    let recommendations = [];
    if (score < 35) {
        recommendations.push(T('rec_low_1'));
        recommendations.push(T('rec_low_2'));
    }

    return (
        <div className="score-card">
            <h2>{T('compatibility_score')}</h2>
            <div className="score-circle">
                <div>{score}/50</div>
                <div className="score-info">{T('score_info')}</div>
            </div>

            {(recommendations.length > 0) && (
                <div className="recommendations">
                    <h3>{T('recommendation_title')}</h3>
                    <ul>{recommendations.map((s, i) => <li key={i}>{s}</li>)}</ul>
                </div>
            )}

            <button className="score-next-btn" onClick={onNext}>{T('view_internships')}</button>
        </div>
    );
};

export default ScoreCard;
