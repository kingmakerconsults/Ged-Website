import React, { useState } from 'react';
import { AMENDMENTS_DB } from '../data/social/constitution_amendments.js';
import { PRACTICE_SCENARIOS } from '../data/social/constitution_scenarios.js';

const constitutionStyles = `
  .constitution-text {
    color: #0f172a !important;
  }
  .dark .constitution-text {
    color: #e2e8f0 !important;
  }
`;

export default function ConstitutionExplorer({ onExit, pack }) {
  const [mode, setMode] = useState('simple'); // 'simple' | 'original'
  const [search, setSearch] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedAmendmentId, setSelectedAmendmentId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const filteredAmendments = AMENDMENTS_DB.filter(
    (item) =>
      item.simple.toLowerCase().includes(search.toLowerCase()) ||
      item.topic.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const availableScenarios = PRACTICE_SCENARIOS.filter((s) =>
    pack ? s.pack === pack : true
  );

  const startScenario = (s) => {
    setSelectedScenario(s);
    setSelectedAmendmentId(null);
    setFeedback(null);
  };

  const answerScenario = (amendmentId) => {
    if (!selectedScenario) return;
    setSelectedAmendmentId(amendmentId);
    const correct = amendmentId === selectedScenario.correctAmendmentId;
    setFeedback({ correct });
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setSelectedAmendmentId(null);
    setFeedback(null);
  };

  const isHighlighted = (amendmentId) => {
    if (!feedback || feedback.correct) return false;
    return amendmentId === selectedScenario?.correctAmendmentId;
  };

  return (
    <>
      <style>{constitutionStyles}</style>
      <div className="fade-in min-h-screen bg-white dark:bg-slate-700 constitution-text">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
            >
              <span>← Back</span>
            </button>
            <h1 className="text-2xl font-bold constitution-text">
              Constitution Explorer — Rights Arbitrator
            </h1>
            <div className="w-12" />
          </div>

          {/* Practice Scenarios */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold constitution-text">
                Practice Scenarios
              </h2>
              {selectedScenario && (
                <button
                  onClick={resetScenario}
                  className="text-sm px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 constitution-text"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableScenarios.map((s) => (
                <button
                  key={s.id}
                  className={`text-left p-3 rounded-lg border transition ${
                    selectedScenario?.id === s.id
                      ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-600'
                  }`}
                  onClick={() => startScenario(s)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold constitution-text">
                      {s.prompt}
                    </span>
                    <span className="text-xs text-slate-500">
                      {s.difficulty}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {s.tags.join(', ')}
                  </div>
                </button>
              ))}
            </div>
            {selectedScenario && (
              <div className="mt-4 p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-sm mb-2 constitution-text">
                  Select the correct amendment:
                </div>
                <div className="flex flex-wrap gap-2">
                  {AMENDMENTS_DB.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => answerScenario(a.id)}
                      className={`px-3 py-1.5 rounded border text-sm transition ${
                        isHighlighted(a.id)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-200'
                          : 'border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {a.id}
                    </button>
                  ))}
                </div>
                {feedback && (
                  <div className="mt-3 space-y-2">
                    <div
                      className={`text-sm font-semibold constitution-text ${
                        feedback.correct
                          ? 'text-emerald-700 dark:text-emerald-200'
                          : 'text-red-700 dark:text-red-300'
                      }`}
                    >
                      {feedback.correct ? 'Correct!' : 'Incorrect'}
                    </div>
                    {!feedback.correct && (
                      <div className="text-sm">
                        You selected:{' '}
                        <span className="font-mono">{selectedAmendmentId}</span>
                        . Correct:{' '}
                        <span className="font-mono">
                          {selectedScenario.correctAmendmentId}
                        </span>
                        .
                      </div>
                    )}
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedScenario.explanation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <input
              type="text"
              placeholder="Search (e.g. 'speech', 'voting', '14th')"
              className="w-full sm:w-72 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-600 focus:ring-2 focus:ring-sky-500 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex bg-white dark:bg-slate-600 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setMode('simple')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                  mode === 'simple'
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Plain English
              </button>
              <button
                onClick={() => setMode('original')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
                  mode === 'original'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                Original Text
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAmendments.map((amendment) => (
              <div
                key={amendment.id}
                className="flex flex-col p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs font-bold uppercase tracking-wider constitution-text">
                    {amendment.id} Amendment
                  </span>
                  <span className="text-xs font-medium text-sky-600 dark:text-sky-400">
                    {amendment.topic}
                  </span>
                </div>
                <p
                  className={`text-base leading-relaxed flex-grow constitution-text ${
                    mode === 'original' ? 'font-serif italic' : 'font-sans'
                  }`}
                >
                  {mode === 'original'
                    ? `"${amendment.original}"`
                    : amendment.simple}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Difficulty: {amendment.difficulty}</span>
                  <span className="truncate max-w-[60%]">
                    {amendment.tags.join(', ')}
                  </span>
                </div>
              </div>
            ))}
            {filteredAmendments.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                No amendments found matching "{search}".
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
