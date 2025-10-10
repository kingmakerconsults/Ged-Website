import React, { useState } from 'react';
import { AppData } from '../app-data.js';
import { ArrowLeftIcon } from '../components/Icons.jsx'; // Assuming you create an Icons.jsx component

export default function AIQuizGenerator({ subject, onQuizGenerated, onExit, setIsLoading, setLoadingMessage }) {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [error, setError] = useState(null);

    const availableTopics = (AppData[subject]?.categories)
        ? Object.values(AppData[subject].categories).flatMap(category => category.topics?.map(topic => topic.title) || [])
        : [];

    const handleGenerate = async () => {
        if (!selectedTopic) {
            setError("Please select a topic first.");
            return;
        }
        setLoadingMessage("Please give us a moment to smith this for you...");
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://ged-website.onrender.com/generate-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, topic: selectedTopic, comprehensive: false })
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.error || `Request failed with status ${response.status}`);
            }

            const generatedQuiz = await response.json();
            onQuizGenerated(generatedQuiz);

        } catch (err) {
            console.error("Error generating quiz:", err);
            setError(`Sorry, something went wrong. ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fade-in text-center">
            <header className="flex justify-between items-center pb-4 mb-4 border-b">
                 <button onClick={onExit} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold"><ArrowLeftIcon /> Back</button>
                 <h2 className="text-xl font-bold text-center text-slate-800">Smith a Quiz</h2>
                 <div></div>
            </header>
            <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-slate-800">Create a New Quiz</h3>
                <p className="text-slate-500 mt-2 mb-6">Select a topic from {subject} to generate a unique 15-question practice exam.</p>
                
                <select 
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full p-3 border border-sky-300 rounded-md mb-4 text-lg"
                >
                    <option value="">-- Select a Topic --</option>
                    {availableTopics.map(topic => topic && <option key={topic} value={topic}>{topic}</option>)}
                </select>

                <button 
                    onClick={handleGenerate} 
                    className="w-full px-8 py-4 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 transition-colors"
                >
                    Generate Quiz
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}
