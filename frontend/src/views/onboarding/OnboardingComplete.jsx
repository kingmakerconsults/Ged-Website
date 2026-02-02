import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PREMADE_QUIZ_CATALOG } from '../../../utils/quizProgress.js';
import { getApiBaseUrl } from '../../utils/apiBase.js';

const SUBJECT_LABELS = {
  math: 'Math',
  rla: 'RLA',
  science: 'Science',
  social_studies: 'Social Studies',
};

const AREA_KEYWORDS = {
  algebra: ['algebra'],
  geometry: ['geometry'],
  data: ['data', 'probability', 'statistics'],
  number_ops: ['number', 'ratio', 'percent'],
  main_idea: ['main idea'],
  inference: ['inference'],
  evidence: ['evidence'],
  argument: ['argument', 'rhetoric'],
  life_science: ['life'],
  physical_science: ['physical', 'chemistry', 'physics'],
  earth_space: ['earth', 'space'],
  data_interpretation: ['data', 'graph', 'chart'],
  civics: ['civics', 'constitution', 'government'],
  us_history: ['history'],
  economics: ['economics'],
  geography: ['geography', 'map'],
};

function findPracticeQuiz(subjectLabel, areaKey) {
  const catalog = PREMADE_QUIZ_CATALOG?.[subjectLabel] || [];
  const keywords = AREA_KEYWORDS[areaKey] || [];
  if (!keywords.length) return catalog[0] || null;
  return (
    catalog.find((quiz) =>
      keywords.some((kw) =>
        String(quiz.title || quiz.quizId || quiz.quizCode)
          .toLowerCase()
          .includes(kw)
      )
    ) ||
    catalog[0] ||
    null
  );
}

export default function OnboardingComplete() {
  const navigate = useNavigate();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiBase}/api/onboarding/state`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Unable to load onboarding state');
        }
        const data = await res.json();
        if (mounted) setState(data);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unable to load');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  useEffect(() => {
    const shouldComplete =
      state &&
      !state.onboarding_completed &&
      state?.onboarding_payload?.diagnostic?.status === 'completed';
    if (!shouldComplete) return;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${apiBase}/api/onboarding/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({
            diagnostic: state.onboarding_payload?.diagnostic,
          }),
        });
      } catch (_) {
        // no-op
      }
    })();
  }, [apiBase, state]);

  const diagnostic = state?.onboarding_payload?.diagnostic || {};
  const subjectScores = diagnostic?.subjects || {};
  const scoredSubjects = Object.entries(subjectScores).map(([key, value]) => ({
    key,
    score: value.score || 0,
    weakestAreas: value.weakest_areas || [],
  }));

  const strongest = scoredSubjects.sort((a, b) => b.score - a.score)[0];
  const weakest = scoredSubjects.sort((a, b) => a.score - b.score)[0];

  const weakestArea = weakest?.weakestAreas?.[0] || null;
  const weakestSubjectLabel = SUBJECT_LABELS[weakest?.key] || 'Math';
  const practiceQuiz = weakestArea
    ? findPracticeQuiz(weakestSubjectLabel, weakestArea)
    : null;

  const handlePractice = () => {
    if (!practiceQuiz) {
      navigate('/');
      return;
    }
    localStorage.setItem('current_quiz_data', JSON.stringify(practiceQuiz));
    navigate('/quiz/local-diagnostic');
  };

  if (loading) return <div className="p-6">Loading summary...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">You’re all set!</h2>
        <p className="text-slate-600">
          Here’s a quick snapshot of your diagnostic results.
        </p>
      </div>

      {diagnostic.status === 'skipped' ? (
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
          <p className="text-slate-700">
            You skipped the diagnostic for now. You can always take it later to
            refine your learning plan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="text-sm text-slate-500">Strongest subject</div>
            <div className="text-xl font-semibold">
              {SUBJECT_LABELS[strongest?.key] || '—'}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="text-sm text-slate-500">Focus area</div>
            <div className="text-xl font-semibold">
              {SUBJECT_LABELS[weakest?.key] || '—'}
            </div>
            <div className="text-sm text-slate-500 mt-2">
              {weakest?.weakestAreas?.slice(0, 2).join(', ') || '—'}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePractice}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Start my recommended practice
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  );
}
