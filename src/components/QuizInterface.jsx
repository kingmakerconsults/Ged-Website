import React, { useState } from 'react';

export default function QuizInterface({ questions = [], answers = [], setAnswers = () => {}, onComplete = () => {}, buttonText = 'Finish' }) {
	const [index, setIndex] = useState(0);
	if (!questions || !questions.length) return <div>Loading questions...</div>;

	const q = questions[index];

	const select = (text) => {
		const a = [...answers];
		a[index] = text;
		setAnswers(a);
	};

	return (
		<div>
			<div className="mb-3 flex flex-wrap gap-2">
				{questions.map((_, i) => <button key={i} onClick={() => setIndex(i)} className={`w-8 h-8 rounded-full ${i===index?'bg-sky-600 text-white':'bg-slate-200'}`}>{i+1}</button>)}
			</div>

			{q.passage && <div className="mb-3 prose" dangerouslySetInnerHTML={{ __html: q.passage }} /> }
			{q.imageUrl && <img src={q.imageUrl} alt="" className="mb-3 max-w-full" />}
			<h3 className="font-semibold mb-3">{q.question || q.questionText}</h3>

			<div className="space-y-2">
				{(q.answerOptions || []).map((opt, idx) => (
					<button key={idx} onClick={() => select(opt.text)} className={`w-full text-left p-2 border rounded ${answers[index]===opt.text?'bg-sky-100':''}`}>
						{opt.text}
					</button>
				))}
			</div>

			<div className="mt-4 flex justify-between">
				<button onClick={() => setIndex(i => Math.max(0, i-1))} className="px-3 py-2 bg-slate-200 rounded">Previous</button>
				{index === questions.length -1 ? <button onClick={onComplete} className="px-4 py-2 bg-green-600 text-white rounded">{buttonText}</button> : <button onClick={() => setIndex(i => Math.min(questions.length-1, i+1))} className="px-3 py-2 bg-sky-500 text-white rounded">Next</button>}
			</div>
		</div>
	);
}
				)}
			</div>
		</div>
	);
}
}
                {currentQ.imageUrl && <img src={currentQ.imageUrl} alt={`Visual for question ${currentIndex + 1}`} className="my-4 mx-auto rounded-md border max-w-full h-auto" />}
                <h3 className="text-xl font-semibold mb-4">{currentIndex + 1}. {currentQ.questionText || currentQ.question}</h3>
                <div className="space-y-3">
                    {(currentQ.answerOptions || []).map((opt, i) => (
                        <button key={i} onClick={() => handleSelect(opt.text)} className={`w-full text-left p-3 rounded-lg border-2 transition ${answers[currentIndex] === opt.text ? 'bg-sky-100 border-sky-500' : 'bg-white hover:bg-sky-50 border-white'}`}>
                            {opt.text}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button onClick={() => setCurrentIndex(p => Math.max(0, p - 1))} disabled={currentIndex === 0} className="px-4 py-2 bg-slate-200 rounded-md disabled:opacity-50">Previous</button>
                <button onClick={() => setMarked(m => { const newM = [...m]; newM[currentIndex] = !newM[currentIndex]; return newM; })} className={`px-4 py-2 rounded-md ${marked[currentIndex] ? 'bg-yellow-300' : 'bg-slate-200'}`}>
                    Mark for Review
                </button>
                {currentIndex === questions.length - 1 ? (
                    <button onClick={onComplete} className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg">{buttonText}</button>
                ) : (
                    <button onClick={() => setCurrentIndex(p => Math.min(questions.length - 1, p + 1))} className="px-4 py-2 bg-sky-500 text-white rounded-md">Next</button>
                )}
            </div>
        </div>
    );
}

export default QuizInterface;
