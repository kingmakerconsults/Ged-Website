import React, { useEffect, useMemo, useState } from 'react';

/**
 * StatsHub — student-facing analytics dashboard.
 *
 * Fetches all the /api/student/* + survey/vocab summaries and renders
 * read-only cards. Designed to be dropped inside the legacy Progress
 * panel; uses the same window-level API_BASE_URL + appToken conventions
 * as the rest of the legacy app so it has no external dependencies on
 * legacy state.
 */

function getApiBase() {
  if (typeof window !== 'undefined') {
    if (typeof window.API_BASE_URL === 'string' && window.API_BASE_URL) {
      return window.API_BASE_URL;
    }
  }
  return '';
}

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('appToken')) ||
      ''
    );
  } catch {
    return '';
  }
}

async function fetchJson(url, token) {
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error(`${url} → ${res.status}`);
  }
  return res.json();
}

const SUBJECT_LABEL = {
  Math: 'Math',
  Science: 'Science',
  'Social Studies': 'Social Studies',
  'Reasoning Through Language Arts (RLA)': 'RLA',
  RLA: 'RLA',
};

function shortSubject(s) {
  if (!s) return '';
  return SUBJECT_LABEL[s] || s;
}

function StatCard({ title, subtitle, children, accent }) {
  return (
    <div
      className="stats-card rounded-2xl shadow-sm p-5"
      style={{
        backgroundColor: 'var(--bg-surface, #ffffff)',
        border: '1px solid var(--border-strong, #e2e8f0)',
        color: 'var(--text-primary, #0f172a)',
      }}
    >
      <div
        className="text-sm font-semibold uppercase tracking-wide mb-1"
        style={{ color: accent || 'var(--text-secondary, #475569)' }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          className="text-xs mb-3"
          style={{ color: 'var(--text-secondary, #64748b)' }}
        >
          {subtitle}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

function EmptyHint({ children }) {
  return (
    <p
      className="text-sm italic"
      style={{ color: 'var(--text-secondary, #64748b)' }}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// ScoreTrendsCard
// ---------------------------------------------------------------------------
function ScoreTrendsCard({ data }) {
  const subjects = (data && data.subjects) || {};
  const entries = Object.entries(subjects);
  return (
    <StatCard
      title="Score Trends"
      subtitle="Per-subject scaled scores over time"
    >
      {entries.length === 0 ? (
        <EmptyHint>
          Take a comprehensive practice exam to see your trends.
        </EmptyHint>
      ) : (
        <div className="space-y-3">
          {entries.map(([subj, info]) => {
            const attempts = Array.isArray(info?.attempts) ? info.attempts : [];
            const passColor = info.latest >= 145 ? '#059669' : '#d97706';
            const growth = Number(info.growth) || 0;
            const growthIcon = growth > 0 ? '↑' : growth < 0 ? '↓' : '→';
            const growthColor =
              growth > 0 ? '#059669' : growth < 0 ? '#dc2626' : '#64748b';
            return (
              <div key={subj} className="border-b last:border-0 pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold capitalize">
                    {shortSubject(subj)}
                  </span>
                  <span style={{ color: passColor, fontWeight: 600 }}>
                    {info.latest}/200
                  </span>
                </div>
                <div
                  className="flex gap-3 text-xs"
                  style={{ color: '#64748b' }}
                >
                  <span>Best {info.best}</span>
                  <span>{info.attemptCount} attempts</span>
                  <span style={{ color: growthColor }}>
                    {growthIcon} {Math.abs(growth)} pts
                  </span>
                </div>
                {attempts.length > 1 && (
                  <div className="flex items-end gap-0.5 mt-1 h-6">
                    {attempts.slice(-15).map((a, i) => {
                      const score = Number(a.scaledScore) || 0;
                      const pct = Math.max(
                        8,
                        Math.min(100, ((score - 100) / 100) * 100)
                      );
                      const color = a.passed
                        ? '#34d399'
                        : score >= 135
                          ? '#fbbf24'
                          : '#f87171';
                      return (
                        <div
                          key={i}
                          title={`${score}`}
                          style={{
                            flex: 1,
                            minWidth: 4,
                            height: `${pct}%`,
                            backgroundColor: color,
                            borderRadius: 2,
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// WeakestAreasCard
// ---------------------------------------------------------------------------
function WeakestAreasCard({ data }) {
  const areas = (data && data.areas) || [];
  return (
    <StatCard
      title="Areas to Improve"
      subtitle="By challenge area (min. 3 questions answered)"
    >
      {areas.length === 0 ? (
        <EmptyHint>
          Answer more practice questions across subjects so we can spot weak
          spots.
        </EmptyHint>
      ) : (
        <div className="space-y-2">
          {areas.slice(0, 8).map((a, i) => {
            const pct = parseFloat(a.accuracy_pct) || 0;
            const color =
              pct >= 70 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171';
            return (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">
                    {a.domain || a.topic || 'General'}
                    {a.subject ? ` · ${shortSubject(a.subject)}` : ''}
                  </span>
                  <span style={{ color: '#64748b', fontFamily: 'monospace' }}>
                    {a.correct_items}/{a.total_items} ({pct}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: '#e2e8f0',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// ConfidenceCard
// ---------------------------------------------------------------------------
function ConfidenceCard({ data }) {
  const byConf = (data && data.byConfidence) || {};
  const sure = byConf['sure'] || { total: 0, correct: 0, accuracyPct: 0 };
  const guessing = byConf['guessing'] || {
    total: 0,
    correct: 0,
    accuracyPct: 0,
  };
  const calibration = data?.calibrationScore;
  const total = sure.total + guessing.total;
  return (
    <StatCard
      title="Confidence Calibration"
      subtitle="Did you know what you knew?"
    >
      {total === 0 ? (
        <EmptyHint>
          Use the “I’m sure / Just guessing” toggle while answering to unlock
          this metric.
        </EmptyHint>
      ) : (
        <>
          {calibration != null && (
            <div className="text-center mb-2">
              <div className="text-3xl font-bold">{calibration}%</div>
            </div>
          )}
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>When sure</span>
              <span>
                {sure.accuracyPct}% correct ({sure.total} Qs)
              </span>
            </div>
            <div className="flex justify-between">
              <span>When guessing</span>
              <span>
                {guessing.accuracyPct}% correct ({guessing.total} Qs)
              </span>
            </div>
          </div>
        </>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// EssayCard
// ---------------------------------------------------------------------------
function EssayCard({ data }) {
  const summary = data?.summary;
  const recent = (data && data.recent) || [];
  return (
    <StatCard title="Essay Scores" subtitle="Extended Response trait averages">
      {!summary || !summary.total ? (
        <EmptyHint>
          Submit an essay to start tracking your trait scores.
        </EmptyHint>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            <div>
              <div className="text-2xl font-bold">
                {summary.avg_total ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Avg total
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {summary.avg_trait1 ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Argument
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {summary.avg_trait2 ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Organization
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {summary.avg_trait3 ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Conventions
              </div>
            </div>
          </div>
          <div className="text-xs" style={{ color: '#64748b' }}>
            {summary.total} essay{summary.total === 1 ? '' : 's'} submitted ·
            best {summary.best_total}/6
          </div>
          {recent.length > 0 && (
            <ul className="mt-3 text-sm space-y-1">
              {recent.slice(0, 5).map((r) => (
                <li
                  key={r.id}
                  className="flex justify-between border-b last:border-0 py-1"
                >
                  <span>
                    {new Date(r.created_at).toLocaleDateString()}{' '}
                    {r.prompt_id ? `· ${r.prompt_id}` : ''}
                  </span>
                  <span style={{ fontFamily: 'monospace' }}>
                    {r.total_score}/6
                    {typeof r.word_count === 'number'
                      ? ` · ${r.word_count} words`
                      : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// VocabularyCard
// ---------------------------------------------------------------------------
function VocabularyCard({ data }) {
  const subjects = (data && data.subjects) || [];
  const struggling = (data && data.strugglingTerms) || [];
  return (
    <StatCard
      title="Vocabulary Mastery"
      subtitle="From vocabulary practice quizzes"
    >
      {subjects.length === 0 ? (
        <EmptyHint>
          Take a vocabulary quiz from any subject to start tracking term
          mastery.
        </EmptyHint>
      ) : (
        <>
          <div className="space-y-2">
            {subjects.map((s) => {
              const pct = parseFloat(s.accuracy_pct) || 0;
              const color =
                pct >= 70 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171';
              return (
                <div key={s.subject}>
                  <div className="flex justify-between text-sm">
                    <span>{shortSubject(s.subject)}</span>
                    <span style={{ color: '#64748b', fontFamily: 'monospace' }}>
                      {s.correct}/{s.total} ({pct}%) · {s.unique_terms} terms
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: '#e2e8f0',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {struggling.length > 0 && (
            <div className="mt-3">
              <div
                className="text-xs uppercase font-semibold mb-1"
                style={{ color: '#64748b' }}
              >
                Terms to review
              </div>
              <div className="flex flex-wrap gap-1">
                {struggling.slice(0, 12).map((t) => (
                  <span
                    key={`${t.subject}-${t.term}`}
                    title={`${t.accuracy_pct}% over ${t.attempts} attempts`}
                    className="text-xs rounded-full px-2 py-0.5"
                    style={{
                      background: '#fef2f2',
                      color: '#b91c1c',
                      border: '1px solid #fecaca',
                    }}
                  >
                    {t.term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// SurveyCard
// ---------------------------------------------------------------------------
function SurveyCard({ data }) {
  const overall = data?.overall;
  const recent = (data && data.recent) || [];
  return (
    <StatCard
      title="Self-Reported Feedback"
      subtitle="From your post-quiz surveys"
    >
      {!overall || !overall.total ? (
        <EmptyHint>
          Complete the optional 30-second survey after a quiz to track how you
          feel about pacing and difficulty.
        </EmptyHint>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div>
              <div className="text-xl font-bold">
                {overall.avg_difficulty ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Difficulty (1–5)
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">
                {overall.avg_confidence ?? '—'}
              </div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Confidence (1–5)
              </div>
            </div>
            <div>
              <div className="text-xs" style={{ color: '#64748b' }}>
                Pace
              </div>
              <div className="text-xs">
                slow {overall.pace_too_slow} · ok {overall.pace_just_right} ·
                fast {overall.pace_too_fast}
              </div>
            </div>
          </div>
          {recent.some((r) => r.free_text) && (
            <div>
              <div
                className="text-xs uppercase font-semibold mb-1"
                style={{ color: '#64748b' }}
              >
                Recent notes
              </div>
              <ul className="text-sm space-y-1">
                {recent
                  .filter((r) => r.free_text)
                  .slice(0, 3)
                  .map((r) => (
                    <li key={r.id} style={{ color: '#334155' }}>
                      “{r.free_text}”{' '}
                      <span style={{ color: '#94a3b8', fontSize: 11 }}>
                        — {shortSubject(r.subject) || 'Quiz'} ·{' '}
                        {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </StatCard>
  );
}

// ---------------------------------------------------------------------------
// Main StatsHub
// ---------------------------------------------------------------------------
export default function StatsHub({ refreshKey = 0 }) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    trends: null,
    weakest: null,
    confidence: null,
    essay: null,
    vocab: null,
    survey: null,
  });

  useEffect(() => {
    let cancelled = false;
    const base = getApiBase();
    const token = getAuthToken();
    if (!token) {
      setState((s) => ({ ...s, loading: false, error: 'not_authenticated' }));
      return;
    }

    const safeFetch = async (path) => {
      try {
        return await fetchJson(`${base}${path}`, token);
      } catch (err) {
        console.warn('[StatsHub] failed', path, err?.message || err);
        return null;
      }
    };

    (async () => {
      const [trends, weakest, confidence, essay, vocab, survey] =
        await Promise.all([
          safeFetch('/api/student/score-trends'),
          safeFetch('/api/student/weakest-areas'),
          safeFetch('/api/student/confidence-analysis'),
          safeFetch('/api/student/essay-summary'),
          safeFetch('/api/vocabulary-attempts/summary'),
          safeFetch('/api/student/survey-summary'),
        ]);
      if (cancelled) return;
      setState({
        loading: false,
        error: null,
        trends,
        weakest,
        confidence,
        essay,
        vocab,
        survey,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (state.loading) {
    return (
      <div className="rounded-2xl p-6 text-center" style={{ color: '#64748b' }}>
        Loading your stats…
      </div>
    );
  }
  if (state.error === 'not_authenticated') {
    return null;
  }

  return (
    <section className="mt-6">
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: 'var(--text-primary, #0f172a)' }}
      >
        Your Stats Hub
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ScoreTrendsCard data={state.trends} />
        <WeakestAreasCard data={state.weakest} />
        <ConfidenceCard data={state.confidence} />
        <EssayCard data={state.essay} />
        <VocabularyCard data={state.vocab} />
        <SurveyCard data={state.survey} />
      </div>
    </section>
  );
}
