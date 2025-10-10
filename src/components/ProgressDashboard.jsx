import React from 'react';

export default function ProgressDashboard({ progress, onSubjectClick }) {
    const calculateAverage = (scores) => {
        if (!scores || scores.length === 0) return "N/A";
        const total = scores.reduce((acc, score) => acc + score, 0);
        return Math.round(total / scores.length);
    };

    const totalQuizzes = Object.values(progress || {}).reduce((acc, subject) => acc + (subject.total || 0), 0);
    const subjects = ["Social Studies", "Reasoning Through Language Arts (RLA)", "Science", "Math"];
    const colors = {
        "Social Studies": "text-sky-700",
        "Reasoning Through Language Arts (RLA)": "text-amber-700",
        "Science": "text-green-700",
        "Math": "text-red-700"
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-slate-100 p-4 rounded-lg text-center shadow-inner sm:col-span-3 lg:col-span-1">
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Quizzes</p>
                <p className="text-4xl font-bold text-slate-800">{totalQuizzes}</p>
            </div>
            {subjects.map(subject => (
                <button 
                    key={subject}
                    onClick={() => onSubjectClick(subject)}
                    className="bg-slate-100 p-4 rounded-lg text-center shadow-inner hover:bg-slate-200 transition"
                >
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{subject}</p>
                    <p className={`text-4xl font-bold ${colors[subject] || 'text-slate-800'}`}>{calculateAverage(progress?.[subject]?.scores)}</p>
                </button>
            ))}
        </div>
    );
}
