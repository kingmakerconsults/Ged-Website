import React, { useState } from 'react';
import { ELECTORAL_COLLEGE_SCENARIOS } from '../data/social/electoral_college_scenarios.js';

/**
 * ElectoralCollegeSimulator - Electoral Vote Math & Scenarios
 * Students practice electoral math, winner-takes-all, and swing state scenarios
 */
export default function ElectoralCollegeSimulator({ onExit }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [numericInput, setNumericInput] = useState('');
  const [selectedMultiChoice, setSelectedMultiChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentScenario = ELECTORAL_COLLEGE_SCENARIOS[currentScenarioIndex];
  const isNumeric = currentScenario.type === 'numeric';

  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (isNumeric) {
      isCorrect = parseInt(numericInput, 10) === currentScenario.correctAnswer;
    } else {
      isCorrect =
        selectedMultiChoice ===
        ELECTORAL_COLLEGE_SCENARIOS[currentScenarioIndex].choices.find(
          (c) => c.isCorrect
        ).id;
    }

    setFeedback({ isCorrect });

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < ELECTORAL_COLLEGE_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setNumericInput('');
      setSelectedMultiChoice(null);
      setFeedback(null);
    } else {
      setSessionComplete(true);
    }
  };

  const handleResetSession = () => {
    setCurrentScenarioIndex(0);
    setCorrectCount(0);
    setNumericInput('');
    setSelectedMultiChoice(null);
    setFeedback(null);
    setSessionComplete(false);
  };

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <span>← Back</span>
          </button>
          <h1 className="text-2xl font-bold">🗳️ Electoral College Simulator</h1>
          <div className="w-20 text-right text-sm">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {currentScenarioIndex + 1}/{ELECTORAL_COLLEGE_SCENARIOS.length}
            </div>
          </div>
        </div>

        {/* Session Summary */}
        {sessionComplete && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              ✅ Round Complete!
            </h2>
            <p className="text-lg text-emerald-800 dark:text-emerald-300 mb-4">
              You answered{' '}
              <strong>
                {correctCount} out of {ELECTORAL_COLLEGE_SCENARIOS.length}
              </strong>{' '}
              correctly.
            </p>
            <button
              onClick={handleResetSession}
              className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
            >
              Start New Round
            </button>
          </div>
        )}

        {!sessionComplete && (
          <div className="space-y-6">
            {/* Scenario Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-bold">{currentScenario.title}</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    currentScenario.difficulty === 'easy'
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                      : currentScenario.difficulty === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                  }`}
                >
                  {currentScenario.difficulty.charAt(0).toUpperCase() +
                    currentScenario.difficulty.slice(1)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentScenario.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {currentScenario.prompt}
              </p>
            </div>

            {/* Answer Input Area */}
            <div className="space-y-4">
              {isNumeric ? (
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">
                    Your Answer:
                  </label>
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    disabled={feedback !== null}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-lg font-semibold disabled:bg-slate-100 dark:disabled:bg-slate-900"
                    placeholder="Enter a number"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  {currentScenario.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => setSelectedMultiChoice(choice.id)}
                      disabled={feedback !== null}
                      className={`w-full text-left p-4 rounded-lg border-2 transition font-semibold ${
                        selectedMultiChoice === choice.id
                          ? feedback?.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                          : feedback && choice.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
                      } ${feedback !== null ? 'cursor-default' : ''}`}
                    >
                      <span className="font-bold text-lg mr-3">
                        {choice.id}.
                      </span>
                      {choice.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Check / Feedback */}
            <div className="space-y-4">
              {!feedback ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    isNumeric
                      ? numericInput === ''
                      : selectedMultiChoice === null
                  }
                  className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed dark:bg-sky-500 dark:hover:bg-sky-600 dark:disabled:bg-slate-600 text-white font-semibold transition"
                >
                  Check My Answer
                </button>
              ) : (
                <>
                  <div
                    className={`rounded-lg p-4 border ${
                      feedback.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-600'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600'
                    }`}
                  >
                    <p
                      className={`font-bold mb-2 ${
                        feedback.isCorrect
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-red-900 dark:text-red-200'
                      }`}
                    >
                      {feedback.isCorrect ? '✅ Correct!' : '❌ Not Quite'}
                    </p>

                    {!feedback.isCorrect && isNumeric && (
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                        The correct answer is:{' '}
                        <strong className="text-lg">
                          {currentScenario.correctAnswer}
                        </strong>
                      </p>
                    )}

                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {currentScenario.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextScenario}
                    className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                  >
                    {currentScenarioIndex ===
                    ELECTORAL_COLLEGE_SCENARIOS.length - 1
                      ? 'See Results'
                      : 'Next Scenario'}
                  </button>
                </>
              )}
            </div>

            {/* Scenario Info Box */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <p>
                  <strong>Quick Reference:</strong> 270 electoral votes needed
                  to win the presidency. 538 total votes (435 House + 100 Senate
                  + 3 D.C.).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
