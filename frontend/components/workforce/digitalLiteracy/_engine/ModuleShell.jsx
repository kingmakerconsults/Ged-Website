/**
 * ModuleShell.jsx — standard wrapper used by every Digital Literacy module.
 * Phases: intro -> tutorial -> sim -> quiz -> result. Tracks score and writes to
 * progressStore on completion.
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  setModuleResult,
  loadProgress,
  recordTutorialCompletion,
} from '../../progressStore.js';
import { hasWorkforceAuth, logWorkforceActivity } from '../../workforceApi.js';
import Quiz from './Quiz.jsx';
import { ModuleCertificate, PrintButton } from './Certificate.jsx';

function quizFocusText(question, fallbackGoal) {
  if (question?.rationale) return question.rationale;
  if (fallbackGoal) return fallbackGoal;
  return 'Look for the safest, most useful action before choosing an answer.';
}

function buildTutorial(module) {
  if (Array.isArray(module.tutorial) && module.tutorial.length) {
    return module.tutorial;
  }

  const goals = Array.isArray(module.learningGoals) ? module.learningGoals : [];
  const quiz = Array.isArray(module.quiz) ? module.quiz : [];
  const questionPatterns = quiz.slice(0, 4).map((question, index) => ({
    title: `Question pattern ${index + 1}`,
    prompt: question.q,
    focus: quizFocusText(question, goals[index % Math.max(goals.length, 1)]),
  }));

  return [
    {
      title: 'Skill briefing',
      body:
        module.intro ||
        'Review the core skill, then practice choosing the best workplace action.',
      bullets: goals,
    },
    {
      title: 'How the quiz will ask it',
      body: 'The knowledge check uses workplace multiple-choice questions. Read the situation first, name the task, then compare each answer to the goal of the module.',
      patterns: questionPatterns,
    },
    {
      title: 'Before you practice',
      body: 'Use the hands-on activity to apply the same decisions the quiz will ask about. Complete the tutorial when these steps feel familiar.',
      bullets: [
        'Identify what the user or worker is trying to do.',
        'Choose the option that is secure, accurate, and efficient.',
        'Check any warning signs before you click or submit.',
      ],
    },
  ];
}

export default function ModuleShell({
  userId,
  module, // { id, title, standardId, standardLabel, intro, learningGoals, simComponent, quiz }
  onBack,
}) {
  const [phase, setPhase] = useState('intro');
  const [simScore, setSimScore] = useState(null); // 0..100 from interactive sim
  const [quizScore, setQuizScore] = useState(null); // 0..100 from MC check
  const [tutorialDone, setTutorialDone] = useState(() => {
    const progress = loadProgress(userId);
    return !!(
      progress.tutorials?.[module.id]?.completed ||
      progress.dl?.[module.id]?.tutorialCompleted
    );
  });
  const learnerName =
    (typeof window !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('appUser') || '{}').name) ||
    'Learner';

  const SimComponent = module.simComponent;
  const tutorial = useMemo(() => buildTutorial(module), [module]);
  const nextPracticePhase = SimComponent ? 'sim' : 'quiz';

  useEffect(() => {
    const progress = loadProgress(userId);
    setTutorialDone(
      !!(
        progress.tutorials?.[module.id]?.completed ||
        progress.dl?.[module.id]?.tutorialCompleted
      )
    );
    setPhase('intro');
    setSimScore(null);
    setQuizScore(null);
  }, [module.id, userId]);

  function logActivity(payload) {
    if (!hasWorkforceAuth()) return;
    logWorkforceActivity(payload).catch(() => {});
  }

  function finishTutorial() {
    recordTutorialCompletion(userId, module.id, {
      title: module.title,
      standardId: module.standardId,
      standardLabel: module.standardLabel,
      quizQuestionCount: Array.isArray(module.quiz) ? module.quiz.length : 0,
    });
    setTutorialDone(true);
    logActivity({
      sectionId: 'digital-literacy',
      toolId: module.id,
      activityType: 'tutorial_completed',
      status: 'completed',
      score: 100,
      evidence: {
        moduleId: module.id,
        moduleTitle: module.title,
        standardId: module.standardId,
      },
      metadata: {
        standardLabel: module.standardLabel,
        quizQuestionCount: Array.isArray(module.quiz) ? module.quiz.length : 0,
        learningGoals: module.learningGoals || [],
      },
    });
    setPhase(nextPracticePhase);
  }

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
    logActivity({
      sectionId: 'digital-literacy',
      toolId: module.id,
      activityType: 'module_completed',
      status: combined >= 85 ? 'mastered' : 'needs_practice',
      score: combined,
      evidence: {
        moduleId: module.id,
        moduleTitle: module.title,
        standardId: module.standardId,
        simScore: simScore || 0,
        quizScore: score,
      },
      metadata: {
        standardLabel: module.standardLabel,
        mastered: combined >= 85,
        tutorialCompleted: tutorialDone,
      },
    });
    setPhase('result');
  }

  const proctored = loadProgress(userId).proctored;

  return (
    <div className="module-shell space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold px-3 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
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
        <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-3 text-slate-900 shadow-sm">
          <p className="text-slate-700">{module.intro}</p>
          {tutorialDone ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
              Tutorial completed. Your instructor can review this progress when
              workforce tracking is enabled.
            </div>
          ) : null}
          {module.learningGoals?.length ? (
            <>
              <h3 className="font-semibold mt-2 text-slate-900">
                You will be able to:
              </h3>
              <ul className="list-disc ml-6 text-sm space-y-1 text-slate-700">
                {module.learningGoals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setPhase('tutorial')}
              className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold"
            >
              Start tutorial
            </button>
            <button
              type="button"
              onClick={() => setPhase(nextPracticePhase)}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
            >
              Skip to practice
            </button>
          </div>
        </div>
      )}

      {phase === 'tutorial' && (
        <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-4 text-slate-900 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-bold">Tutorial</h3>
              <p className="text-sm text-slate-600">
                Practice the same decisions that appear in this module's
                knowledge check.
              </p>
            </div>
            {tutorialDone ? (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                Completed
              </span>
            ) : null}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {tutorial.map((step, index) => (
              <section
                key={`${step.title}-${index}`}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-xs font-bold uppercase tracking-wide text-teal-700">
                  Step {index + 1}
                </div>
                <h4 className="mt-1 font-bold text-slate-900">{step.title}</h4>
                <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                {step.bullets?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {step.bullets.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {step.patterns?.length ? (
                  <ol className="mt-3 space-y-2 text-sm text-slate-700">
                    {step.patterns.map((pattern, patternIndex) => (
                      <li
                        key={`${pattern.title}-${patternIndex}`}
                        className="rounded-md border border-slate-200 bg-white p-3"
                      >
                        <div className="font-semibold text-slate-900">
                          {pattern.prompt}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                          Focus: {pattern.focus}
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </section>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={finishTutorial}
              className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold"
            >
              Complete tutorial and practice
            </button>
            <button
              type="button"
              onClick={() => setPhase('intro')}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {phase === 'sim' && SimComponent && (
        <div className="rounded-xl bg-white border border-slate-200 p-5 text-slate-900 shadow-sm">
          <SimComponent onComplete={finishSim} />
        </div>
      )}

      {phase === 'quiz' && (
        <div className="rounded-xl bg-white border border-slate-200 p-5 text-slate-900 shadow-sm">
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
                      ? 'bg-green-50 border-green-300 text-slate-900'
                      : 'bg-amber-50 border-amber-300 text-slate-900'
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
                      className="px-3 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
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
