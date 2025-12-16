import React, { useState } from 'react';
import { CIVICS_SCENARIOS } from '../data/social/civics_scenarios.js';

const civicsStyles = `
  .civics-text {
    color: #0f172a !important;
  }
  .dark .civics-text {
    color: #e2e8f0 !important;
  }
`;

/**
 * CivicsReasoningLab - Branches & Levels of Government Tool
 * Students identify the correct branch, level, and power type for government scenarios
 */
export default function CivicsReasoningLab({ onExit }) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPowerType, setSelectedPowerType] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentScenario = CIVICS_SCENARIOS[currentScenarioIndex];

  const BRANCH_OPTIONS = [
    { id: 'legislative', label: 'Legislative' },
    { id: 'executive', label: 'Executive' },
    { id: 'judicial', label: 'Judicial' },
  ];

  const LEVEL_OPTIONS = [
    { id: 'federal', label: 'Federal' },
    { id: 'state', label: 'State' },
    { id: 'local', label: 'Local' },
  ];

  const POWER_TYPE_OPTIONS = [
    { id: 'passes_laws', label: 'Passes Laws' },
    { id: 'enforces_laws', label: 'Enforces Laws' },
    { id: 'interprets_laws', label: 'Interprets Laws' },
    { id: 'check_on_legislative', label: 'Check on Legislative' },
    { id: 'check_on_executive', label: 'Check on Executive' },
    { id: 'check_on_judicial', label: 'Check on Judicial' },
    { id: 'judicial_review', label: 'Judicial Review' },
  ];

  const handleCheckAnswer = () => {
    const isCorrect =
      selectedBranch === currentScenario.correctBranch &&
      selectedLevel === currentScenario.correctLevel &&
      selectedPowerType === currentScenario.correctPowerType;

    const partialCorrect = {
      branch: selectedBranch === currentScenario.correctBranch,
      level: selectedLevel === currentScenario.correctLevel,
      powerType: selectedPowerType === currentScenario.correctPowerType,
    };

    setFeedback({
      isCorrect,
      partialCorrect,
    });

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < CIVICS_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedBranch(null);
      setSelectedLevel(null);
      setSelectedPowerType(null);
      setFeedback(null);
    } else {
      setSessionComplete(true);
    }
  };

  const handleResetSession = () => {
    setCurrentScenarioIndex(0);
    setCorrectCount(0);
    setSelectedBranch(null);
    setSelectedLevel(null);
    setSelectedPowerType(null);
    setFeedback(null);
    setSessionComplete(false);
  };

  return (
    <>
      <style>{civicsStyles}</style>
      <div className="fade-in min-h-screen bg-white dark:bg-slate-700 civics-text">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>← Back</span>
            </button>
            <h1 className="text-2xl font-bold civics-text">
              🏛️ Civics Reasoning Lab
            </h1>
            <div className="w-20 text-right text-sm">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {currentScenarioIndex + 1}/{CIVICS_SCENARIOS.length}
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
                  {correctCount} out of {CIVICS_SCENARIOS.length}
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

              {/* Scenario Text */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <p className="text-lg font-semibold civics-text">
                  {currentScenario.text}
                </p>
              </div>

              {/* Answer Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Branch Selection */}
                <div className="space-y-3">
                  <h3 className="font-bold civics-text">
                    Branch of Government
                  </h3>
                  {BRANCH_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedBranch(option.id)}
                      disabled={feedback !== null}
                      className={`w-full text-left p-3 rounded-lg border-2 transition font-semibold ${
                        selectedBranch === option.id
                          ? feedback
                            ? feedback.partialCorrect.branch
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : feedback?.partialCorrect?.branch &&
                            option.id === currentScenario.correctBranch
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 civics-text hover:bg-slate-50 dark:hover:bg-slate-500 cursor-pointer'
                      } ${feedback !== null ? 'cursor-default' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Level Selection */}
                <div className="space-y-3">
                  <h3 className="font-bold civics-text">Level of Government</h3>
                  {LEVEL_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedLevel(option.id)}
                      disabled={feedback !== null}
                      className={`w-full text-left p-3 rounded-lg border-2 transition font-semibold ${
                        selectedLevel === option.id
                          ? feedback
                            ? feedback.partialCorrect.level
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : feedback?.partialCorrect?.level &&
                            option.id === currentScenario.correctLevel
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 civics-text hover:bg-slate-50 dark:hover:bg-slate-500 cursor-pointer'
                      } ${feedback !== null ? 'cursor-default' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {/* Power Type Selection */}
                <div className="space-y-3">
                  <h3 className="font-bold civics-text">Power Type</h3>
                  {POWER_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPowerType(option.id)}
                      disabled={feedback !== null}
                      className={`w-full text-left p-3 rounded-lg border-2 transition font-semibold text-sm ${
                        selectedPowerType === option.id
                          ? feedback
                            ? feedback.partialCorrect.powerType
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : feedback?.partialCorrect?.powerType &&
                            option.id === currentScenario.correctPowerType
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 civics-text hover:bg-slate-50 dark:hover:bg-slate-500 cursor-pointer'
                      } ${feedback !== null ? 'cursor-default' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Check Answer / Feedback */}
              <div className="space-y-4">
                {!feedback ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      !selectedBranch || !selectedLevel || !selectedPowerType
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
                          : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600'
                      }`}
                    >
                      <p
                        className={`font-bold mb-3 ${
                          feedback.isCorrect
                            ? 'text-emerald-900 dark:text-emerald-200'
                            : 'text-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {feedback.isCorrect
                          ? '✅ Perfect!'
                          : '📋 Review Your Answers'}
                      </p>

                      {!feedback.isCorrect && (
                        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-3">
                          <div className="flex items-center gap-2">
                            <span>
                              {feedback.partialCorrect.branch ? '✅' : '❌'}{' '}
                              Branch:{' '}
                              <strong>{currentScenario.correctBranch}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>
                              {feedback.partialCorrect.level ? '✅' : '❌'}{' '}
                              Level:{' '}
                              <strong>{currentScenario.correctLevel}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>
                              {feedback.partialCorrect.powerType ? '✅' : '❌'}{' '}
                              Power Type:{' '}
                              <strong>
                                {currentScenario.correctPowerType}
                              </strong>
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {currentScenario.explanation}
                      </p>
                    </div>

                    <button
                      onClick={handleNextScenario}
                      className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                    >
                      {currentScenarioIndex === CIVICS_SCENARIOS.length - 1
                        ? 'See Results'
                        : 'Next Scenario'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
