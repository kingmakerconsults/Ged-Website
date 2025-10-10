import React, { useState, useEffect } from 'react';
import { AppData } from './app-data.js';

// Import components (must exist under src/components)
import AppHeader from './components/AppHeader.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import StartScreen from './components/StartScreen.jsx';
import QuizRunner from './components/QuizRunner.jsx';
import MultiPartRlaRunner from './components/MultiPartRlaRunner.jsx';
import ReadingPractice from './components/ReadingPractice.jsx';
import EssayGuide from './components/EssayGuide.jsx';
import GraphingTool from './components/GraphingTool.jsx';
import GeometryPracticeTool from './components/GeometryPracticeTool.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import FormulaSheetModal from './components/FormulaSheetModal.jsx';

// Helper function
const shuffleArray = (array) => {
    if (!Array.isArray(array)) return [];
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default function App() {
    const [view, setView] = useState('start'); // 'start' | 'quiz' | 'reading' | 'essay' | 'graphing_tool' | 'geometry_practice_tool' | 'results' | 'generator'
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [progress, setProgress] = useState({});
    const [showFormulaSheet, setShowFormulaSheet] = useState(false);

    useEffect(() => {
        const savedUsers = localStorage.getItem('gedUsers') || '[]';
        setUsers(JSON.parse(savedUsers));
        const savedCurrentUser = localStorage.getItem('gedCurrentUser');
        if (savedCurrentUser) {
            setCurrentUser(savedCurrentUser);
        }
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        const saved = localStorage.getItem(`gedProgress_${currentUser}`);
        const initial = {
            "Social Studies": { scores: [], total: 0 },
            "Reasoning Through Language Arts (RLA)": { scores: [], total: 0 },
            "Science": { scores: [], total: 0 },
            "Math": { scores: [], total: 0 }
        };
        setProgress(saved ? (JSON.parse(saved) || initial) : initial);
    }, [currentUser]);

    // persist progress
    useEffect(() => {
        if (!currentUser) return;
        localStorage.setItem(`gedProgress_${currentUser}`, JSON.stringify(progress));
    }, [progress, currentUser]);

    const handleLogin = (username) => {
        const name = username && username.trim();
        if (!name) return;
        if (!users.includes(name)) {
            const updated = [...users, name];
            setUsers(updated);
            localStorage.setItem('gedUsers', JSON.stringify(updated));
        }
        setCurrentUser(name);
        localStorage.setItem('gedCurrentUser', name);
        setView('start');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('gedCurrentUser');
        setView('start');
    };

    const navigateHome = () => {
        setView('start');
        setActiveQuiz(null);
        setQuizResults(null);
    };

    // Start a quiz. "topic" may be a topic object (with quizzes[]) or a generated quiz (with questions[])
    const startQuiz = (topic, subject) => {
        let quiz;
        if (!topic) return alert('No quiz/topic provided.');
        if (Array.isArray(topic.questions) && topic.questions.length) {
            quiz = topic;
        } else if (Array.isArray(topic.quizzes) && topic.quizzes.length) {
            quiz = topic.quizzes[Math.floor(Math.random() * topic.quizzes.length)];
        } else if (topic.type) {
            // tool
            setView(topic.type);
            return;
        } else {
            return alert('This topic has no quizzes.');
        }

        const prepared = {
            ...quiz,
            subject,
            questions: (quiz.questions || []).map(q => ({ ...q, answerOptions: shuffleArray(q.answerOptions || []) }))
        };
        setActiveQuiz(prepared);
        setView(prepared.type === 'multi-part-rla' ? 'quiz' : 'quiz');
    };

    const onQuizComplete = (results) => {
        setQuizResults(results);
        setView('results');
        const subject = results.subject;
        if (!subject || subject === 'Pop Quiz' || subject === 'Review') return;
        if (progress[subject]) {
            setProgress(prev => {
                const prevSubject = prev[subject] || { scores: [], total: 0 };
                return {
                    ...prev,
                    [subject]: {
                        scores: [...prevSubject.scores, results.scaledScore],
                        total: prevSubject.total + 1
                    }
                };
            });
        }
    };

    // AI generator: generate either comprehensive exam or single-topic quiz
    const handleGenerateComprehensiveExam = async (subject) => {
        setIsLoading(true);
        setLoadingMessage(`Generating comprehensive ${subject} exam...`);
        try {
            const res = await fetch('https://ged-website.onrender.com/generate-quiz', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, comprehensive: true })
            });
            if (!res.ok) throw new Error((await res.json()).error || 'Generation failed');
            const json = await res.json();
            startQuiz(json, subject);
        } catch (e) {
            alert('Failed to generate exam: ' + e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onSelectGenerator = async (subject, topic) => {
        if (!topic) return alert('Select a topic first.');
        setIsLoading(true);
        setLoadingMessage('Generating quiz...');
        try {
            const res = await fetch('https://ged-website.onrender.com/generate-quiz', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject, topic, comprehensive: false })
            });
            if (!res.ok) throw new Error((await res.json()).error || 'Generation failed');
            const generated = await res.json();
            startQuiz(generated, subject);
        } catch (e) {
            alert('Failed: ' + e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartPopQuiz = () => {
        const all = [];
        Object.entries(AppData).forEach(([subjectName, subject]) => {
            Object.values(subject.categories || {}).forEach(cat => {
                (cat.topics || []).forEach(topic => {
                    (topic.quizzes || []).forEach(qz => {
                        (qz.questions || []).forEach(q => all.push(q));
                    });
                });
            });
        });
        const shuffled = shuffleArray(all).slice(0, 5).map((q, i) => ({ ...q, questionNumber: i + 1 }));
        const pop = { id: 'pop_' + Date.now(), title: '5-Min Pop Quiz', questions: shuffled, timeLimit: 300 };
        startQuiz(pop, 'Pop Quiz');
    };

    const handleReviewMarked = (markedQuestions) => {
        const review = { id: 'review_' + Date.now(), title: 'Review Marked', questions: (markedQuestions || []).map((q, i) => ({ ...q, questionNumber: i + 1 })) };
        startQuiz(review, 'Review');
    };

    // render the current view
    const renderView = () => {
        if (!currentUser) return <LoginScreen users={users} onLogin={handleLogin} />;
        switch (view) {
            case 'quiz': return activeQuiz ? (activeQuiz.type === 'multi-part-rla' ? <MultiPartRlaRunner quiz={activeQuiz} onComplete={onQuizComplete} onExit={navigateHome} /> : <QuizRunner quiz={activeQuiz} onComplete={onQuizComplete} onExit={navigateHome} />) : <div>Loading quiz…</div>;
            case 'reading': return <ReadingPractice quiz={activeQuiz} onComplete={onQuizComplete} onExit={navigateHome} />;
            case 'essay': return <EssayGuide onExit={navigateHome} />;
            case 'graphing_tool': return <GraphingTool onExit={navigateHome} />;
            case 'geometry_practice_tool': return <GeometryPracticeTool onExit={navigateHome} setShowFormulaSheet={setShowFormulaSheet} />;
            case 'results': return <ResultsScreen results={quizResults} quiz={activeQuiz} onRestart={() => startQuiz(activeQuiz, activeQuiz?.subject)} onHome={navigateHome} onReviewMarked={handleReviewMarked} />;
            case 'generator': return <AIQuizGenerator subject={generatorConfig?.subject} onQuizGenerated={(q) => startQuiz(q, generatorConfig.subject)} onExit={navigateHome} setIsLoading={setIsLoading} setLoadingMessage={setLoadingMessage} />;
            case 'start':
            default:
                return (
                    <StartScreen
                        progress={progress}
                        onSelectQuiz={startQuiz}
                        onSelectGenerator={onSelectGenerator}
                    />
                );
        }
    };

    return (
        <>
            <AppHeader currentUser={currentUser} onLogout={handleLogout} />
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow text-center">
                        <h3 className="text-xl font-bold mb-2">Loading…</h3>
                        <p className="text-slate-600">{loadingMessage}</p>
                    </div>
                </div>
            )}
            {showFormulaSheet && <FormulaSheetModal onClose={() => setShowFormulaSheet(false)} />}
            <main className="w-full max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    {renderView()}
                </div>
            </main>
        </>
    );
}
				</div>
			)}
			{showFormulaSheet && <FormulaSheetModal onClose={() => setShowFormulaSheet(false)} />}
			<main className="w-full max-w-6xl mx-auto p-6">
				<div className="bg-white rounded-2xl shadow-xl p-6">
					{renderView()}
				</div>
			</main>
		</>
	);
}
