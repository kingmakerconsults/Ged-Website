import React, { useState } from 'react';
import { MAP_SCENARIOS } from '../data/social/map_scenarios.js';

/**
 * MapExplorer - Geography & Map-Reading Tool
 * Allows students to practice interpreting maps like those in GED Social Studies
 */
export default function MapExplorer({ onExit }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentScenario = MAP_SCENARIOS[currentScenarioIndex];

  const handleChoiceSelect = (choiceId) => {
    const choice = currentScenario.choices.find((c) => c.id === choiceId);
    setSelectedChoice(choiceId);

    const isCorrect = choice.isCorrect;
    setFeedback({
      isCorrect,
      correctChoiceId: currentScenario.choices.find((c) => c.isCorrect).id,
    });

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < MAP_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedChoice(null);
      setFeedback(null);
    } else {
      // End of cycle - show summary
      setSessionComplete(true);
    }
  };

  const handleResetSession = () => {
    setCurrentScenarioIndex(0);
    setCorrectCount(0);
    setSelectedChoice(null);
    setFeedback(null);
    setSessionComplete(false);
  };

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <span>← Back</span>
          </button>
          <h1 className="text-2xl font-bold">🗺️ Map Explorer</h1>
          <div className="w-20 text-right text-sm">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {currentScenarioIndex + 1}/{MAP_SCENARIOS.length}
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
                {correctCount} out of {MAP_SCENARIOS.length}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Panel (Left) */}
            <div className="lg:col-span-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex items-center justify-center min-h-64">
              <div className="text-center">
                <div className="text-6xl mb-3">🗺️</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <p className="font-semibold mb-1">
                    Map: {currentScenario.imageKey}
                  </p>
                  <p className="text-xs">
                    (Visual maps will be displayed here in production)
                  </p>
                </div>
              </div>
            </div>

            {/* Question Panel (Right) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scenario Title & Tags */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{currentScenario.title}</h2>
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
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {currentScenario.prompt}
                </p>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {currentScenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition font-semibold ${
                      selectedChoice === choice.id
                        ? feedback?.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                        : feedback && feedback.correctChoiceId === choice.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
                    } ${feedback !== null ? 'cursor-default' : ''}`}
                  >
                    <span className="font-bold text-lg mr-3">{choice.id}.</span>
                    {choice.label}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {feedback && (
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
                    {feedback.isCorrect ? '✅ Correct!' : '❌ Not quite'}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {currentScenario.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {feedback && (
                <button
                  onClick={handleNextScenario}
                  className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                >
                  {currentScenarioIndex === MAP_SCENARIOS.length - 1
                    ? 'See Results'
                    : 'Next Map'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
