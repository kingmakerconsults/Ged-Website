import React from 'react';

export default function ResultsScreen({ results = {}, quiz = {}, onRestart = () => {}, onHome = () => {}, onReviewMarked = () => {} }) {
	const getPerf = (score=0) => {
		if (score >= 175) return { level: "College Ready + Credit", color: "text-purple-600" };
		if (score >= 165) return { level: "College Ready", color: "text-blue-600" };
		if (score >= 145) return { level: "Passing", color: "text-green-600" };
		return { level: "Keep studying", color: "text-amber-600" };
	};
	const perf = getPerf(results.scaledScore);
	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
			<p className={`text-5xl font-bold ${perf.color}`}>{results.scaledScore}</p>
			<p className="mb-4">{perf.level}</p>
			<div className="flex justify-center gap-3 mt-6">
				<button onClick={onHome} className="px-4 py-2 bg-slate-600 text-white rounded">Home</button>
				<button onClick={onRestart} className="px-4 py-2 bg-sky-600 text-white rounded">Retry</button>
			</div>
		</div>
	);
}

function DetailedResults({ results, quiz, onReviewMarked, onHome, onRestart }) {
	const performance = getPerf(results.scaledScore);
	const performanceByCategory = (quiz.questions || []).reduce((acc, question, index) => {
		const userAnswer = results.answers ? results.answers[index] : null;
		const correctAnswer = (question.answerOptions || []).find(opt => opt.isCorrect);
		const isCorrect = correctAnswer && userAnswer === correctAnswer.text;

		const type = question.type || 'text';
		if (!acc[type]) {
			acc[type] = { correct: 0, total: 0 };
		}
		acc[type].total++;

		if (results.answers && results.answers[index] === correctAnswer) {
			acc[type].correct++;
		}
		return acc;
	}, {});

	const categoryNames = {
		'text': 'Text Analysis',
		'image': 'Image/Map Interpretation',
		'knowledge': 'Knowledge-Based',
		'quote': 'Quote Analysis',
		'cause-effect': 'Cause & Effect',
		'multi-source': 'Multi-Source Analysis',
		'analysis': 'Paired Passage Analysis',
		'chart': 'Chart/Data Analysis'
	};

	return (
		<div className="text-center fade-in">
			<h2 className="text-3xl font-bold text-slate-800">Results: {quiz.title}</h2>
			<div className="my-6">
				<p className="text-lg text-slate-600">Your estimated GED® Score is:</p>
				<p className={`text-6xl font-bold my-2 ${performance.color}`}>{results.scaledScore}</p>
				<p className={`text-2xl font-semibold mb-2 ${performance.color}`}>{performance.level}</p>
				<p className="text-lg text-slate-500">{results.score} / {results.totalQuestions} Correct</p>
			</div>

			<div className="mt-8 pt-6 border-t max-w-lg mx-auto">
				<h3 className="text-xl font-bold text-slate-700 mb-4">Performance by Category</h3>
				<div className="space-y-3 text-left">
					{Object.entries(performanceByCategory).map(([type, data]) => (
						<div key={type} className="bg-slate-100 p-3 rounded-lg">
							<div className="flex justify-between">
								<div className="font-semibold">{categoryNames[type] || type}</div>
								<div>{data.correct} / {data.total}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			 <div className="mt-8 flex justify-center gap-4">
				 <button onClick={onHome} className="px-6 py-2 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700">Go Home</button>
				 {markedQuestions.length > 0 && (
					<button onClick={() => onReviewMarked && onReviewMarked(markedQuestions)} className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600">
						Review Marked
					</button>
				 )}
				 <button onClick={onRestart} className="px-6 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700">Try Again</button>
			</div>

			<div className="mt-8 pt-6 border-t">
				<h3 className="text-xl font-bold text-slate-700 mb-4">Detailed Question Review</h3>
				<div className="space-y-4 text-left">
					{(quiz.questions || []).map((question, index) => {
						const userAnswer = results.answers ? results.answers[index] : null;
						const correctAnswer = (question.answerOptions || []).find(opt => opt.isCorrect);
						const isCorrect = correctAnswer && userAnswer === correctAnswer.text;
						const confidenceLevel = results.confidence ? results.confidence[index] : null;

						return (
							<div key={index} className="p-4 bg-white rounded-lg shadow-sm">
								<div className="flex justify-between items-start">
									<div>
										<div className="font-semibold">{index + 1}. {question.question || question.questionText}</div>
										<div className="text-sm text-slate-600 mt-1">{question.passage ? <div dangerouslySetInnerHTML={{ __html: question.passage }} /> : null}</div>
									</div>
									<div className="text-right">
										<div className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? 'Correct' : 'Incorrect'}</div>
									</div>
								</div>
								<div className="mt-3">
									<div className="text-sm">Your answer: <span className="font-semibold">{userAnswer || '—'}</span></div>
									<div className="text-sm">Correct answer: <span className="font-semibold">{correctAnswer?.text || '—'}</span></div>
									{question.rationale && <div className="text-sm mt-2 text-slate-500">{question.rationale}</div>}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
