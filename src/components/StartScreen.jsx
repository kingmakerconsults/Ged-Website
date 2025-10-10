import React, { useState } from 'react';
import { AppData } from '../app-data.js';
import ProgressDashboard from './ProgressDashboard.jsx';

const ICONS = {}; // keep small; AppHeader already shows title

export default function StartScreen({
	progress = {},
	onSelectQuiz = () => {},
	onSelectGenerator = () => {},
	onStartPopQuiz = () => {},
	onStartComprehensiveExam = () => {},
	setIsLoading = () => {},
	setLoadingMessage = () => {},
	setShowFormulaSheet = () => {}
}) {
	const [subject, setSubject] = useState(null);
	const [category, setCategory] = useState(null);

	if (subject && category) {
		const topics = AppData[subject].categories[category].topics || [];
		return (
			<div>
				<button onClick={() => setCategory(null)} className="mb-4 text-sky-600">Back</button>
				<h2 className="text-2xl font-bold mb-4">{category}</h2>
				<div className="grid md:grid-cols-2 gap-4">
					{topics.map(t => (
						<div key={t.id} className="p-4 bg-white rounded shadow">
							<h3 className="font-semibold">{t.title}</h3>
							<p className="text-sm text-slate-500">{t.description}</p>
							<div className="mt-3 flex gap-2">
								{t.quizzes?.length > 0 && <button onClick={() => onSelectQuiz(t, subject)} className="px-3 py-2 bg-sky-600 text-white rounded">Start Quiz</button>}
								{t.type === 'geometry_practice_tool' && <button onClick={() => setShowFormulaSheet(true)} className="px-3 py-2 bg-slate-200 rounded">Formulas</button>}
								<button onClick={() => onSelectGenerator(subject, t.title)} className="px-3 py-2 bg-amber-500 text-white rounded">Smith a Quiz</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (subject) {
		const cats = AppData[subject].categories || {};
		return (
			<div>
				<button onClick={() => setSubject(null)} className="mb-4 text-sky-600">Back</button>
				<h2 className="text-3xl font-bold mb-4">{subject}</h2>
				<div className="grid md:grid-cols-2 gap-4">
					{Object.entries(cats).map(([name, cat]) => (
						<button key={name} onClick={() => setCategory(name)} className="p-4 bg-white rounded shadow text-left">
							<h3 className="font-semibold">{name}</h3>
							<p className="text-sm text-slate-500">{cat.description}</p>
						</button>
					))}
				</div>
			</div>
		);
	}

	// default subject view
	return (
		<div>
			<header className="text-center mb-6">
				<h1 className="text-4xl font-bold">Mr. Smith's Learning Canvas</h1>
				<p className="text-slate-500 mt-2">Select a subject to begin</p>
			</header>

			<ProgressDashboard progress={progress} onSubjectClick={(s) => setSubject(s)} />

			<div className="grid md:grid-cols-3 gap-6">
				{Object.keys(AppData).map(s => (
					<button key={s} onClick={() => setSubject(s)} className="p-6 bg-white rounded-xl shadow text-left">
						<div className="font-bold text-lg">{s}</div>
						<p className="text-sm text-slate-500 mt-1">{AppData[s].categories ? Object.keys(AppData[s].categories).length + ' categories' : ''}</p>
					</button>
				))}
			</div>

			<div className="mt-8 text-center">
				<button onClick={onStartPopQuiz} className="px-6 py-3 bg-purple-600 text-white rounded-md">Start 5-Min Pop Quiz</button>
			</div>
		</div>
	);
}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(subject.categories).map(([categoryName, category]) => (
                        <button key={categoryName} onClick={() => handleSelectCategory(categoryName)} className="text-left border border-slate-200 rounded-lg p-4 flex flex-col justify-between bg-white transition-all duration-200 ease-in-out hover:shadow-lg hover:border-sky-300 hover:-translate-y-1">
                            <div>
                                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{categoryName}</p>
                                <p className="mt-2 text-slate-700">{category.description}</p>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-sky-600 font-semibold">Explore</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <header className="text-center pb-4 mb-4">
                <h1 className="text-4xl font-extrabold text-slate-800">Mr. Smith's Learning Canvas</h1>
                <p className="text-slate-500 mt-2">Welcome back! Please select a subject to begin.</p>
            </header>
            <ProgressDashboard progress={progress} onSubjectClick={setDetailedViewSubject} />
            <div className="my-6 text-center">
                <button
                    onClick={onStartPopQuiz}
                    className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                >
                    Start a 5-Minute Pop Quiz ⏱️
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(AppData).map(([subjectName, subject]) => {
                    const IconComponent = ICONS?.[subject.icon];
                    return (
                        <button key={subjectName} onClick={() => handleSelectSubject(subjectName)} className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="mb-4">{IconComponent ? <IconComponent /> : null}</div>
                            <h3 className="font-bold text-lg">{subjectName}</h3>
                            <p className="text-sm text-slate-500 mt-2">{subject.description}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default StartScreen;
