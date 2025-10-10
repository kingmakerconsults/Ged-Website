import React, { useState, useEffect, useRef, useCallback } from 'react';
import QuizInterface from './QuizInterface.jsx';
import MultiPartRlaRunner from './MultiPartRlaRunner.jsx';

export default function QuizRunner({ quiz = { questions: [] }, onComplete = () => {}, onExit = () => {} }) {
	if (!quiz) return <div>Loading...</div>;
	if (quiz.type === 'multi-part-rla') return <MultiPartRlaRunner quiz={quiz} onComplete={onComplete} onExit={onExit} />;

	const questions = quiz.questions || [];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState(Array(questions.length).fill(null));
	const [marked, setMarked] = useState(Array(questions.length).fill(false));
	const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || questions.length * 90);
	const [view, setView] = useState('quiz');
	const [essayText, setEssayText] = useState('');
	const [essayScore, setEssayScore] = useState(null);
	const handleSubmitRef = useRef();

	useEffect(() => {
		const t = setInterval(() => {
			setTimeLeft(prev => {
				if (prev <= 1) { clearInterval(t); if (view === 'quiz') handleSubmitRef.current && handleSubmitRef.current(); return 0; }
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(t);
	}, [view]);

	const handleSubmit = useCallback(() => {
		if (quiz.essayPrompt && view === 'quiz') { setView('essay'); return; }
		let score = 0;
		questions.forEach((q, i) => {
			const correct = (q.answerOptions || []).find(o => o.isCorrect);
			if (correct && answers[i] === correct.text) score++;
		});
		const percentage = questions.length ? (score / questions.length) * 100 : 0;
		const scaled = Math.round(percentage < 65 ? 100 + (percentage / 65 * 44) : 145 + ((percentage - 65) / 35 * 55));
		onComplete({ score, totalQuestions: questions.length, scaledScore: scaled, answers, subject: quiz.subject, marked, essayScore });
	}, [answers, questions, onComplete, quiz, marked, view, essayScore]);

	useEffect(() => { handleSubmitRef.current = handleSubmit; }, [handleSubmit]);

	const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

	if (view === 'essay') {
		return (
			<div>
				<header className="flex justify-between items-center mb-4">
					<button onClick={onExit} className="text-sm">Back</button>
					<h2 className="text-lg font-bold">{quiz.title} — Essay</h2>
					<div />
				</header>
				{quiz.essayPassages?.map((p,i)=>(<div key={i} className="mb-3 bg-slate-50 p-3 rounded"><h4 className="font-semibold">{p.title}</h4><p>{p.content}</p></div>))}
				<p className="mb-2">{quiz.essayPrompt}</p>
				<textarea value={essayText} onChange={e=>setEssayText(e.target.value)} className="w-full h-56 p-2 border rounded" />
				<div className="mt-3 flex justify-end gap-2">
					<button onClick={() => setView('quiz')} className="px-4 py-2 bg-slate-200 rounded">Back</button>
					<button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Finish Exam</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<header className="flex justify-between items-center mb-4">
				<button onClick={onExit} className="text-sm">Back</button>
				<h2 className="text-lg font-bold">{quiz.title}</h2>
				<div className="font-bold text-red-600">{formatTime(timeLeft)}</div>
			</header>

			<QuizInterface questions={questions} answers={answers} setAnswers={setAnswers} onComplete={handleSubmit} buttonText={quiz.essayPrompt ? 'Continue to Essay' : 'Finish'} />

			<div className="mt-4 flex justify-between">
				<button onClick={() => setMarked(m => { const c=[...m]; c[currentIndex]=!c[currentIndex]; return c; })} className="px-3 py-2 bg-yellow-200 rounded">Mark</button>
			</div>
		</div>
	);
}

        setIsScoringEssay(true);
        try {
            const response = await fetch('https://ged-website.onrender.com/score-essay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ essayText })
            });
            if (!response.ok) throw new Error('Failed to score essay.');
            const result = await response.json();
            let jsonText = result.candidates[0].content.parts[0].text;
            jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsedScore = JSON.parse(jsonText);
            setEssayScore(parsedScore);
        } catch (error) {
            console.error("Error scoring essay in QuizRunner:", error);
            setEssayScore({ error: "Sorry, could not score essay." });
        } finally {
            setIsScoringEssay(false);
        }
    };

    const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

    if (view === 'essay') {
        return (
             <div className="fade-in">
                <header className="flex justify-between items-center pb-4 mb-4 border-b">
                     <h2 className="text-xl font-bold text-center text-slate-800">{quiz.title} - Essay Section</h2>
                     <div className="font-bold text-red-600">{formatTime(timeLeft)}</div>
                </header>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="prose max-w-none bg-slate-50 p-4 rounded-lg">
                        <h3>{quiz.essayPassages?.[0]?.title}</h3>
                        <p>{quiz.essayPassages?.[0]?.content}</p>
                    </div>
                    <div className="prose max-w-none bg-slate-50 p-4 rounded-lg">
                        <h3>{quiz.essayPassages?.[1]?.title}</h3>
                        <p>{quiz.essayPassages?.[1]?.content}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold text-lg">Essay Prompt:</h3>
                    <p className="mb-2">{quiz.essayPrompt}</p>
                    <textarea
                        className="w-full h-64 p-2 border rounded"
                        value={essayText}
                        onChange={(e) => setEssayText(e.target.value)}
                        placeholder="Type your essay response here..."
                    />
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <button onClick={handleScoreEssay} disabled={isScoringEssay} className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-slate-400">
                        {isScoringEssay ? 'Scoring...' : 'Score My Essay'}
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">Finish Exam</button>
                </div>
                {essayScore && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-bold">AI Essay Score:</h4>
                        {essayScore.error ? <p className="text-red-500">{essayScore.error}</p> : <pre>{JSON.stringify(essayScore, null, 2)}</pre>}
                    </div>
                )}
            </div>
        )
    }

    const currentQ = questions[currentIndex];
    
    return (
        <div className="fade-in">
            <header className="flex justify-between items-center pb-4 mb-4 border-b">
                 <button onClick={onExit} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold">Back</button>
                 <h2 className="text-xl font-bold text-center text-slate-800">{quiz.title}</h2>
                 <div className="font-bold text-red-600">{formatTime(timeLeft)}</div>
            </header>

            <div className="mb-4 flex flex-wrap gap-2 quiz-nav">
                {questions.map((_, i) => (
                    <button key={i} onClick={() => setCurrentIndex(i)} className={`w-8 h-8 rounded-full font-bold text-sm ${i === currentIndex ? 'bg-sky-600 text-white' : answers[i] !== null ? 'bg-sky-200' : 'bg-slate-200'} ${marked[i] ? 'ring-2 ring-yellow-400' : ''}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg">
                {currentQ.passage && (
                    <div className="mb-4 prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: currentQ.passage && currentQ.passage.includes('<table') ? currentQ.passage : currentQ.passage }} />
                    </div>
                )}
                {currentQ.imageUrl && <img src={currentQ.imageUrl} alt={`Visual for question ${currentQ.questionNumber}`} className="my-4 mx-auto rounded-md border max-w-full h-auto" />}
                <h3 className="text-xl font-semibold mb-4">{currentQ.questionNumber}. {currentQ.questionText || currentQ.question}</h3>
                <div className="space-y-3">
                    {(currentQ.answerOptions || []).map((opt, i) => (
                        <button key={i} onClick={() => handleSelect(opt.text)} className={`w-full text-left p-3 rounded-lg border-2 transition ${answers[currentIndex] === opt.text ? 'bg-sky-100 border-sky-500' : 'bg-white hover:bg-sky-50 border-white'}`}>
                            {opt.text}
                        </button>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold text-slate-600 mb-2 text-center">How confident are you?</h4>
                    <div className="flex justify-center gap-2">
                        {['Guessing', 'Unsure', 'Confident'].map(level => (
                            <button key={level} onClick={() => handleConfidenceSelect(level)} className={`px-3 py-1 border rounded ${confidence[currentIndex] === level ? 'bg-sky-100' : ''}`}>{level}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button onClick={() => setCurrentIndex(p => Math.max(0, p - 1))} disabled={currentIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md disabled:opacity-50">Previous</button>
                <button onClick={() => setMarked(m => { const newM = [...m]; newM[currentIndex] = !newM[currentIndex]; return newM; })} className={`px-4 py-2 rounded-md ${marked[currentIndex] ? 'bg-yellow-300' : 'bg-slate-200'}`}>
                    Mark for Review
                </button>
                {currentIndex === questions.length - 1 ? (
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">{quiz.essayPrompt ? 'Continue to Essay' : 'Finish'}</button>
                ) : (
                    <button onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))} className="px-4 py-2 bg-sky-500 text-white rounded-md">Next</button>
                )}
            </div>
        </div>
    );
}
