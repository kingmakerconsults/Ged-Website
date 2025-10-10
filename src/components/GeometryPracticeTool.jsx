import React, { useEffect, useState } from 'react';

const SHAPE_LIBRARY = {
    rectangle: {
        questions: ['area', 'perimeter'],
        generateDims: () => ({ w: Math.floor(Math.random() * 10) + 5, h: Math.floor(Math.random() * 10) + 5 }),
        formulas: { area: (dims) => dims.w * dims.h, perimeter: (dims) => 2 * (dims.w + dims.h) },
        render: ({ w, h }) => (
            <g>
                <rect x="50" y="50" width={w*8} height={h*8} stroke="black" fill="none" strokeWidth="2" />
                <text x={50 + (w*8)/2} y={45+h*8} textAnchor="middle">{w}</text>
                <text x={55+w*8} y={50+(h*8)/2} dominantBaseline="middle">{h}</text>
            </g>
        )
    },
    triangle: {
        questions: ['area', 'perimeter'],
        generateDims: () => ({ b: Math.floor(Math.random() * 10) + 5, h: Math.floor(Math.random() * 10) + 5 }),
        formulas: { area: (dims) => 0.5 * dims.b * dims.h },
        render: ({ b, h }) => (
            <g>
                <polygon points={`50,${50+h*8} ${50+b*8},${50+h*8} ${50+b*8},50`} stroke="black" fill="none" strokeWidth="2" />
                <text x={50 + (b*8)/2} y={55+h*8} textAnchor="middle">{b}</text>
                <text x={55+b*8} y={50+(h*8)/2} dominantBaseline="middle">{h}</text>
            </g>
        )
    },
    circle: {
        questions: ['area', 'circumference'],
        generateDims: () => ({ r: Math.floor(Math.random() * 10) + 5 }),
        formulas: {
            area: (dims) => Math.round(Math.PI * dims.r * dims.r * 100) / 100,
            circumference: (dims) => Math.round(2 * Math.PI * dims.r * 100) / 100,
        },
        render: ({ r }) => (
            <g>
                <circle cx="150" cy="150" r={r * 8} stroke="black" fill="none" strokeWidth="2" />
                <line x1="150" y1="150" x2={150 + r * 8} y2="150" stroke="black" strokeDasharray="4" />
                <text x={150 + (r*8)/2} y="145">{r}</text>
            </g>
        )
    },
    rectangular_prism: {
        questions: ['volume'],
        generateDims: () => ({ l: Math.floor(Math.random() * 15) + 8, w: Math.floor(Math.random() * 10) + 5, h: Math.floor(Math.random() * 10) + 5 }),
        formulas: { volume: (dims) => dims.l * dims.w * dims.h },
        render: ({ l, w, h }) => (
            <g stroke="black" fill="none" strokeWidth="2">
                <rect x={50} y={50} width={l*8} height={h*8} />
                <path d={`M ${50},${50} l ${w*3},-${w*3}`} />
                <path d={`M ${50+l*8},${50} l ${w*3},-${w*3}`} />
                <path d={`M ${50+l*8},${50+h*8} l ${w*3},-${w*3}`} />
                <path d={`M ${50+w*3},${50-w*3} H ${50+w*3+l*8}`} />
                <path d={`M ${50+w*3+l*8},${50-w*3} V ${50-w*3+h*8}`} />
                <text x={50 + (l*8)/2} y={45+h*8} textAnchor="middle">{l}</text>
                <text x={55+l*8+(w*3)/2} y={45-w*3+(h*8)/2} >{w}</text>
                <text x={45} y={50 + (h*8)/2} textAnchor="end" dominantBaseline="middle">{h}</text>
            </g>
        )
    },
    cylinder: {
        questions: ['volume'],
        generateDims: () => ({ r: Math.floor(Math.random() * 8) + 3, h: Math.floor(Math.random() * 15) + 5 }),
        formulas: {
            volume: (dims) => Math.round(Math.PI * dims.r * dims.r * dims.h * 100) / 100,
        },
        render: ({ r, h }) => (
            <g stroke="black" fill="none" strokeWidth="2">
                <ellipse cx="150" cy="50" rx={r*5} ry={r*2} />
                <path d={`M ${150 - r*5},50 L ${150 - r*5},${50 + h*5}`} />
                <path d={`M ${150 + r*5},50 L ${150 + r*5},${50 + h*5}`} />
                <ellipse cx="150" cy={50 + h*5} rx={r*5} ry={r*2} />
                <text x="145" y={50 + (h*5)/2} textAnchor="end" dominantBaseline="middle">{h}</text>
                <text x={150} y={55+h*5} textAnchor="middle">{r}</text>
            </g>
        )
    }
};

const GeometryPracticeTool = ({ onExit = () => {} }) => {
    const [currentProblem, setCurrentProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const generateProblem = (shape) => {
        const shapeData = SHAPE_LIBRARY[shape];
        if (!shapeData) return;

        const questionType = shapeData.questions[Math.floor(Math.random() * shapeData.questions.length)];
        const dims = shapeData.generateDims();
        const correctAnswer = shapeData.formulas[questionType](dims);

        setCurrentProblem({
            shape,
            dims,
            questionType,
            correctAnswer,
            renderer: shapeData.render
        });
        setFeedback('');
        setUserAnswer('');
    };

    const checkAnswer = () => {
        const answer = parseFloat(userAnswer);
        if (isNaN(answer)) {
            setFeedback('Please enter a valid number.');
            return;
        }

        if (Math.abs(answer - currentProblem.correctAnswer) < 0.01) {
            setFeedback('Correct! Great job!');
        } else {
            setFeedback(`Not quite. The correct answer is ${currentProblem.correctAnswer}.`);
        }
    };

    useEffect(() => {
        generateProblem('rectangle');
    }, []);

    return (
        <div className="fade-in">
            <header className="flex justify-between items-center pb-4 mb-4 border-b">
                <button onClick={onExit} className="flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 font-semibold">Back</button>
                <h2 className="text-xl font-bold text-center text-slate-800">Geometry Practice Tool</h2>
                <div></div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-slate-50 rounded-lg p-4 flex flex-col items-center justify-center">
                    {currentProblem ? (
                        <>
                            <p className="text-lg font-semibold mt-4 capitalize">What is the {currentProblem.questionType} of the {currentProblem.shape.replace('_', ' ')}?</p>
                            <div className="mt-4">
                                <svg width="400" height="260" className="border rounded bg-white">
                                    {currentProblem.renderer && currentProblem.renderer(currentProblem.dims)}
                                </svg>
                            </div>
                        </>
                    ) : (
                        <p>Select a shape to begin.</p>
                    )}
                    <div className="mt-4">
                        <input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className="p-2 border rounded mr-2" placeholder="Enter answer" />
                        <button onClick={checkAnswer} className="px-3 py-2 bg-sky-600 text-white rounded">Check</button>
                        {feedback && <div className="mt-2 text-sm">{feedback}</div>}
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Shapes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(SHAPE_LIBRARY).map(shape => (
                                <button key={shape} onClick={() => generateProblem(shape)} className="p-2 bg-white border rounded hover:bg-slate-100">{shape.replace('_',' ')}</button>
                            ))}
                        </div>
                    </div>
                    {currentProblem && (
                        <div className="space-y-2">
                            <div className="bg-white p-3 border rounded">
                                <div><strong>Dimensions:</strong></div>
                                <pre className="text-sm">{JSON.stringify(currentProblem.dims)}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Shapes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(SHAPE_LIBRARY).map(shape => (
                                <button key={shape} onClick={() => generateProblem(shape)} className="p-2 bg-white border rounded hover:bg-slate-100">{shape.replace('_',' ')}</button>
                            ))}
                        </div>
                    </div>
                    {currentProblem && (
                        <div className="space-y-2">
                            <div className="bg-white p-3 border rounded">
                                <div><strong>Dimensions:</strong></div>
                                <pre className="text-sm">{JSON.stringify(currentProblem.dims)}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GeometryPracticeTool;
