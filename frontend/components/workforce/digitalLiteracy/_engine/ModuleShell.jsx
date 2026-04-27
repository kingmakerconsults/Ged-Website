/**
 * ModuleShell.jsx — standard wrapper used by every Digital Literacy module.
 * Phases: intro → sim → quiz → result. Tracks score and writes to
 * progressStore on completion.
 */
import React, { useState } from 'react';
import { setModuleResult, loadProgress } from '../../progressStore.js';
import Quiz from './Quiz.jsx';
import { ModuleCertificate, PrintButton } from './Certificate.jsx';

export default function ModuleShell({
  userId,
  module, // { id, title, standardId, standardLabel, intro, learningGoals, simComponent, quiz }
  onBack,
}) {
  const [phase, setPhase] = useState('intro');
  const [simScore, setSimScore] = useState(null); // 0..100 from interactive sim
  const [quizScore, setQuizScore] = useState(null); // 0..100 from MC check
  const learnerName =
    (typeof window !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('appUser') || '{}').name) ||
    'Learner';

  const SimComponent = module.simComponent;

  function finishSim(score) {
    setSimScore(score);
    setPhase('quiz');
  }

  function finishQuiz(score) {
    setQuizScore(score);
    // Combined score: 60% sim, 40% quiz (sim is the task-based
    // task-based portion and the more demanding measure).
    const combined = Math.round((simScore || 0) * 0.6 + score * 0.4);
    setModuleResult(userId, module.id, combined);
    setPhase('result');
  }

  const proctored = loadProgress(userId).proctored;

  return (
    <div className="module-shell space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600"
        >
          ← Back to Academy
        </button>
        <div className="text-xs text-slate-500">
          Standard {module.standardId} · {phase}
        </div>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white p-5">
        <h2 className="text-2xl font-extrabold">{module.title}</h2>
        <p className="opacity-90 text-sm mt-1">{module.standardLabel}</p>
      </div>

      {phase === 'intro' && (
        <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 space-y-3">
          <p className="text-slate-700 dark:text-slate-200">{module.intro}</p>
          {module.learningGoals?.length ? (
            <>
              <h3 className="font-semibold mt-2">You will be able to:</h3>
              <ul className="list-disc ml-6 text-sm space-y-1 text-slate-700 dark:text-slate-200">
                {module.learningGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPhase('sim')}
              className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold"
            >
              Start hands-on practice →
            </button>
            <button
              type="button"
              onClick={() => setPhase('quiz')}
              className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600"
            >
              Skip to knowledge check
            </button>
          </div>
        </div>
      )}

      {phase === 'sim' && SimComponent && (
        <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
          <SimComponent onComplete={finishSim} />
        </div>
      )}

      {phase === 'quiz' && (
        <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
          <Quiz questions={module.quiz} onComplete={finishQuiz} />
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-4">
          {(() => {
            const combined = Math.round(
              (simScore || 0) * 0.6 + (quizScore || 0) * 0.4
            );
            const mastered = combined >= 85;
            return (
              <>
                <div
                  className={`rounded-xl p-5 border ${
                    mastered
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-300'
                      : 'bg-amber-50 dark:bg-amber-900/30 border-amber-300'
                  }`}
                >
                  <h3 className="text-xl font-bold">
                    {mastered ? '🎓 Mastered' : 'Not yet — keep going'}
                  </h3>
                  <div className="text-sm mt-1">
                    Hands-on score: {simScore}% · Knowledge check: {quizScore}%
                  </div>
                  <div className="text-2xl font-extrabold mt-2">
                    Combined: {combined}%
                  </div>
                  {!mastered ? (
                    <p className="text-sm mt-2">
                      Mastery requires 85%. Retake the module to improve your
                      score.
                    </p>
                  ) : null}
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('intro');
                        setSimScore(null);
                        setQuizScore(null);
                      }}
                      className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600"
                    >
                      Retake
                    </button>
                    <button
                      type="button"
                      onClick={onBack}
                      className="px-3 py-1.5 rounded-md bg-teal-600 text-white"
                    >
                      Back to Academy
                    </button>
                  </div>
                </div>
                {mastered && (
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <PrintButton label="Print this certificate" />
                    </div>
                    <ModuleCertificate
                      moduleTitle={module.title}
                      standardId={module.standardId}
                      standardLabel={module.standardLabel}
                      learnerName={learnerName}
                      score={combined}
                      proctored={proctored}
                      issuedAt={new Date().toISOString()}
                    />
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
