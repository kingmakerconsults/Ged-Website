import React, { useState } from 'react';
import QuizInterface from './QuizInterface.jsx';

export default function MultiPartRlaRunner({ quiz, onComplete = () => {}, onExit = () => {} }) {
	const [part, setPart] = useState(1);
	const [p1, setP1] = useState(Array(quiz.part1_reading.length).fill(null));
	const [p3, setP3] = useState(Array(quiz.part3_language.length).fill(null));
	const [essayText, setEssayText] = useState('');

	const finish = () => {
		let score = 0;
		quiz.part1_reading.forEach((q,i) => { if ((q.answerOptions||[]).find(o=>o.isCorrect)?.text === p1[i]) score++; });
		quiz.part3_language.forEach((q,i) => { if ((q.answerOptions||[]).find(o=>o.isCorrect)?.text === p3[i]) score++; });
		const total = quiz.part1_reading.length + quiz.part3_language.length;
		const perc = total ? (score/total)*100 : 0;
		const scaled = Math.round(perc < 65 ? 100 + (perc/65*44) : 145 + ((perc-65)/35*55));
		onComplete({ score, totalQuestions: total, scaledScore: scaled, subject: quiz.subject, essayScore: null });
	};

	if (part === 1) {
		return <div>
			<header className="flex justify-between items-center mb-4"><button onClick={onExit}>Back</button><h2>{quiz.title}</h2></header>
			<QuizInterface questions={quiz.part1_reading} answers={p1} setAnswers={setP1} onComplete={() => setPart(2)} buttonText="Continue to Essay" />
		</div>;
	}
	if (part === 2) {
		return (
			<div>
				<header className="flex justify-between items-center mb-4"><button onClick={() => setPart(1)}>Back</button><h2>{quiz.title} — Essay</h2></header>
				{quiz.essayPassages?.map((p,i)=><div key={i} className="mb-3 bg-slate-50 p-3 rounded"><h4>{p.title}</h4><p>{p.content}</p></div>)}
				<p className="mb-2">{quiz.essayPrompt}</p>
				<textarea value={essayText} onChange={e=>setEssayText(e.target.value)} className="w-full h-56 p-2 border rounded" />
				<div className="mt-3 flex justify-end gap-2">
					<button onClick={() => setPart(3)} className="px-3 py-2 bg-sky-600 text-white rounded">Continue to Part 3</button>
				</div>
			</div>
		);
	}
	return (
		<div>
			<header className="flex justify-between items-center mb-4"><button onClick={() => setPart(2)}>Back</button><h2>{quiz.title} — Part 3</h2></header>
			<QuizInterface questions={quiz.part3_language} answers={p3} setAnswers={setP3} onComplete={finish} buttonText="Finish Exam" />
		</div>
	);
}
