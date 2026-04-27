import React, { useEffect, useMemo, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import { SCENARIOS } from './data/workplaceScenarios.js';

function bestScoresKey(userId) {
  return `workforce:sims:${userId || 'anon'}:bestScores`;
}
function loadBestScores(userId) {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(window.localStorage.getItem(bestScoresKey(userId)) || '{}'); } catch { return {}; }
}
function saveBestScore(userId, scenarioId, score) {
  if (typeof window === 'undefined') return;
  try {
    const cur = loadBestScores(userId);
    if (!cur[scenarioId] || score > cur[scenarioId]) {
      cur[scenarioId] = score;
      window.localStorage.setItem(bestScoresKey(userId), JSON.stringify(cur));
    }
  } catch {}
}

function ScenarioRunner({ scenario, userId, onExit }) {
  const [nodeId, setNodeId] = useState(scenario.startNode);
  const [transcript, setTranscript] = useState([]);
  const [score, setScore] = useState(0);

  const node = scenario.nodes[nodeId];
  const isTerminal = !node.choices || node.choices.length === 0;

  useEffect(() => {
    if (isTerminal) saveBestScore(userId, scenario.id, score);
  }, [isTerminal, userId, scenario.id, score]);

  function pick(choice) {
    setTranscript((t) => [...t, { scene: node.scene, choice: choice.label, feedback: choice.feedback, score: choice.score }]);
    setScore((s) => s + (choice.score || 0));
    setNodeId(choice.next);
  }

  function replay() {
    setNodeId(scenario.startNode);
    setTranscript([]);
    setScore(0);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{scenario.title}</h3>
        <button type="button" onClick={onExit} className="text-sm text-slate-600 hover:underline">Back to scenarios</button>
      </div>
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-4">
        <p className="text-base whitespace-pre-wrap">{node.scene}</p>
        {!isTerminal ? (
          <div className="mt-4 space-y-2">
            {node.choices.map((c, i) => (
              <button key={i} type="button" onClick={() => pick(c)} className="w-full text-left px-4 py-2 rounded-lg border hover:border-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                {c.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <div className="rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300">
              <div className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 font-bold">Outcome</div>
              <div className="text-base font-semibold mt-1">Score: {score}</div>
              {node.summary ? <p className="text-sm mt-2">{node.summary}</p> : null}
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" onClick={replay} className="px-4 py-2 rounded bg-teal-600 text-white text-sm font-semibold">Replay scenario</button>
              <button type="button" onClick={onExit} className="px-4 py-2 rounded bg-slate-200 dark:bg-slate-700 text-sm font-semibold">Pick another</button>
            </div>
          </div>
        )}
      </div>
      {transcript.length > 0 ? (
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">Transcript ({transcript.length} steps)</summary>
          <ol className="mt-2 list-decimal pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            {transcript.map((t, i) => (
              <li key={i}>
                <div className="italic">{t.scene}</div>
                <div className="font-semibold">→ You chose: {t.choice} (+{t.score})</div>
                {t.feedback ? <div className="text-xs text-slate-500">{t.feedback}</div> : null}
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}

export default function WorkplaceSkillsSims({ onBack, userId = 'anon' }) {
  const [activeId, setActiveId] = useState(null);
  const bestScores = useMemo(() => loadBestScores(userId), [userId, activeId]);
  const active = SCENARIOS.find((s) => s.id === activeId);

  if (active) {
    return (
      <WorkforceSectionFrame title="Workplace Skills Sims" onBack={onBack}>
        <div className="px-4 pb-6">
          <ScenarioRunner scenario={active} userId={userId} onExit={() => setActiveId(null)} />
        </div>
      </WorkforceSectionFrame>
    );
  }

  return (
    <WorkforceSectionFrame title="Workplace Skills Sims" subtitle="Branching scenarios on conflict, customers, ethics, and feedback. Choices have consequences." onBack={onBack}>
      <div className="px-4 pb-6">
        <div className="grid sm:grid-cols-2 gap-3">
          {SCENARIOS.map((s) => (
            <button key={s.id} type="button" onClick={() => setActiveId(s.id)} className="text-left rounded-xl border bg-white dark:bg-slate-900 p-4 hover:border-teal-400 hover:shadow-lg transition">
              <div className="font-bold">{s.title}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{s.intro}</p>
              {bestScores[s.id] != null ? (
                <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-2 font-semibold">Best score: {bestScores[s.id]}</div>
              ) : (
                <div className="text-xs text-slate-500 mt-2 italic">Not played yet</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </WorkforceSectionFrame>
  );
}
