import React, { useState } from 'react';

export default function ReadingPractice({ quiz = {}, onComplete = () => {}, onExit = () => {} }) {
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const handleAnswer = (i, val) => setAnswers(a => ({ ...a, [i]: val }));

	const submit = () => {
		if (Object.keys(answers).length !== (quiz.questions||[]).length) {
			if (!confirm('You have unanswered questions. Submit anyway?')) return;
		}
		setSubmitted(true);
		let score = 0;
		(quiz.questions||[]).forEach((q,i) => {
			const correct = (q.answerOptions||[]).find(o=>o.isCorrect);
			if (correct && answers[i] === correct.text) score++;
		});
		const scaled = Math.round((score / (quiz.questions?.length || 1)) * 100);
		onComplete({ score, totalQuestions: quiz.questions.length, scaledScore: scaled, subject: quiz.subject });
	};

	return (
		<div>
			<header className="flex justify-between items-center mb-4"><button onClick={onExit}>Back</button><h3>{quiz.title}</h3><div/></header>
			<article className="prose" dangerouslySetInnerHTML={{ __html: quiz.article?.text?.join('') || '' }} />
			<div className="mt-6 space-y-4">
				{(quiz.questions||[]).map((q,i)=>(
					<div key={i} className="p-3 bg-white rounded">
						<h4 className="font-semibold">{i+1}. {q.question}</h4>
						{(q.answerOptions||[]).map((opt,idx)=>(
							<button key={idx} onClick={()=>handleAnswer(i,opt.text)} className={`block w-full text-left p-2 mt-2 ${answers[i]===opt.text?'bg-sky-100':''}`}>{opt.text}</button>
						))}
					</div>
				))}
			</div>
			<div className="mt-4"><button onClick={submit} className="px-4 py-2 bg-sky-600 text-white rounded">Submit</button></div>
		</div>
	);
}
{quiz.imageUrl && <img src={quiz.imageUrl} alt="Article supplemental image" className="my-4 mx-auto rounded-md border" />}
{quiz.article?.text?.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }}></p>)}
</article>
<section className="mt-8 pt-6 border-t">
	<h3 className="text-2xl font-bold mb-4">Questions</h3>
	<div className="space-y-6">
		{quiz.questions.map((q, i) => (
			<div key={i} className={`p-4 rounded-lg transition-colors ${isSubmitted ? (answers[i] === (q.answerOptions || []).find(o=>o.isCorrect)?.text ? 'bg-green-50' : 'bg-red-50') : 'bg-slate-50'}`}>
				<h4 className="font-semibold mb-2">{i+1}. {q.question}</h4>
				<div className="space-y-2">
					{(q.answerOptions || []).map((opt, idx) => (
						<button key={idx} onClick={() => handleAnswer(i, opt.text)} className={`w-full text-left p-2 rounded ${answers[i] === opt.text ? 'bg-sky-100' : 'bg-white'}`}>{opt.text}</button>
					))}
				</div>
			</div>
		))}
	</div>
	{!isSubmitted && <button onClick={handleSubmit} className="mt-6 w-full px-6 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700">Submit Answers</button>}
</section>
</div>
);
}

export default ReadingPractice;
