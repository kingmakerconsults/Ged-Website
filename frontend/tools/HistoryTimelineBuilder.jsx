import React, { useState, useEffect } from 'react';
import { HISTORY_TIMELINE_SETS } from '../data/social/history_timeline_sets.js';

/**
 * HistoryTimelineBuilder - Chronology & Cause-Effect Tool
 * Students reorder historical events to practice chronological reasoning
 */
export default function HistoryTimelineBuilder({ onExit }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentSet = HISTORY_TIMELINE_SETS[currentSetIndex];

  // Initialize events when set changes
  useEffect(() => {
    // Shuffle events randomly for the student to sort
    const shuffled = [...currentSet.events].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
    setFeedback(null);
  }, [currentSetIndex]);

  const correctOrder = currentSet.events.sort((a, b) => a.year - b.year);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newEvents = [...events];
    [newEvents[index], newEvents[index - 1]] = [
      newEvents[index - 1],
      newEvents[index],
    ];
    setEvents(newEvents);
    setFeedback(null);
  };

  const handleMoveDown = (index) => {
    if (index === events.length - 1) return;
    const newEvents = [...events];
    [newEvents[index], newEvents[index + 1]] = [
      newEvents[index + 1],
      newEvents[index],
    ];
    setEvents(newEvents);
    setFeedback(null);
  };

  const handleCheckOrder = () => {
    const isCorrect = events.every(
      (event, index) => event.id === correctOrder[index].id
    );
    setFeedback({ isCorrect });

    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNextSet = () => {
    if (currentSetIndex < HISTORY_TIMELINE_SETS.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setFeedback(null);
    } else {
      setSessionComplete(true);
    }
  };

  const handleResetSession = () => {
    setCurrentSetIndex(0);
    setCorrectCount(0);
    setFeedback(null);
    setSessionComplete(false);
    const shuffled = [...HISTORY_TIMELINE_SETS[0].events].sort(
      () => Math.random() - 0.5
    );
    setEvents(shuffled);
  };

  const isMisordered = (index) => {
    if (!feedback || feedback.isCorrect) return false;
    return events[index].id !== correctOrder[index].id;
  };

  return (
    <div className="fade-in min-h-screen bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          >
            <span>← Back</span>
          </button>
          <h1 className="text-2xl font-bold">📜 History Timeline Builder</h1>
          <div className="w-20 text-right text-sm">
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {currentSetIndex + 1}/{HISTORY_TIMELINE_SETS.length}
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
              You correctly ordered{' '}
              <strong>
                {correctCount} out of {HISTORY_TIMELINE_SETS.length}
              </strong>{' '}
              timelines.
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
            {/* Set Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold">{currentSet.title}</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    currentSet.difficulty === 'easy'
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200'
                      : currentSet.difficulty === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                  }`}
                >
                  {currentSet.difficulty.charAt(0).toUpperCase() +
                    currentSet.difficulty.slice(1)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentSet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                📋 Instructions: Arrange these historical events in
                chronological order (earliest to latest). Use the arrow buttons
                to reorder the events.
              </p>
            </div>

            {/* Timeline Events */}
            <div className="space-y-3">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition ${
                    isMisordered(index)
                      ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/20'
                      : feedback?.isCorrect
                      ? 'border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600'
                  }`}
                >
                  {/* Position Number */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Event Label & Year */}
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {event.label}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {event.year}
                    </p>
                  </div>

                  {/* Up/Down Buttons */}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || feedback !== null}
                      className="px-3 py-2 rounded bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition font-bold"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={
                        index === events.length - 1 || feedback !== null
                      }
                      className="px-3 py-2 rounded bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition font-bold"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Check / Feedback */}
            <div className="space-y-4">
              {!feedback ? (
                <button
                  onClick={handleCheckOrder}
                  className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                >
                  Check Timeline Order
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
                      className={`font-bold mb-3 ${
                        feedback.isCorrect
                          ? 'text-emerald-900 dark:text-emerald-200'
                          : 'text-red-900 dark:text-red-200'
                      }`}
                    >
                      {feedback.isCorrect
                        ? '✅ Perfect Timeline!'
                        : '❌ Not Quite Right'}
                    </p>

                    {!feedback.isCorrect && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Correct Order:
                        </p>
                        <div className="space-y-2">
                          {correctOrder.map((event, index) => (
                            <div
                              key={event.id}
                              className="text-sm text-slate-700 dark:text-slate-300 p-2 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600"
                            >
                              <span className="font-bold">{index + 1}.</span>{' '}
                              {event.label}{' '}
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                ({event.year})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {currentSet.explanation}
                    </p>
                  </div>

                  <button
                    onClick={handleNextSet}
                    className="w-full px-6 py-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold transition"
                  >
                    {currentSetIndex === HISTORY_TIMELINE_SETS.length - 1
                      ? 'See Results'
                      : 'Next Timeline'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
