import React from 'react';
import { ArrowLeftIcon } from './Icons.jsx';

function DetailedProgressView({ subject, progressData, onBack }) {
    const calculateAverage = (scores) => {
        if (!scores || scores.length === 0) return "N/A";
        const total = scores.reduce((acc, score) => acc + score, 0);
        return Math.round(total / scores.length);
    };

    return (
        <div className="fade-in">
            <header className="flex items-center pb-4 mb-4 border-b">
                <button onClick={onBack} className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-semibold"><ArrowLeftIcon /> Back to Dashboard</button>
            </header>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4">{subject} Progress Details</h2>
            <div className="space-y-4">
                <div className="bg-slate-100 p-4 rounded-lg shadow-inner">
                    <p className="text-slate-500 font-semibold">Overall Average</p>
                    <p className="text-3xl font-bold text-slate-800">{calculateAverage(progressData.scores)}</p>
                </div>
                <h3 className="text-xl font-bold pt-4">Recent Scores:</h3>
                <ul className="list-disc pl-5">
                    {progressData.scores.slice(-10).reverse().map((score, index) => (
                        <li key={index} className="text-lg">Score: <span className="font-bold">{score}</span></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DetailedProgressView;
