import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../../utils/apiBase.js';

const SUBJECTS = [
  { id: 'math', label: 'Math' },
  { id: 'rla', label: 'RLA' },
  { id: 'science', label: 'Science' },
  { id: 'social-studies', label: 'Social Studies' },
];

export default function OnboardingDiagnosticSelector() {
  const navigate = useNavigate();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [showSubjects, setShowSubjects] = useState(false);
  const [error, setError] = useState('');
  const [skipping, setSkipping] = useState(false);

  const handleSkip = async () => {
    setError('');
    setSkipping(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBase}/api/onboarding/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          diagnostic: { status: 'skipped' },
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Unable to skip diagnostic');
      }
      navigate('/onboarding/complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to skip');
    } finally {
      setSkipping(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Diagnostic Check-In</h2>
        <p className="text-slate-600">
          We recommend a quick diagnostic to pinpoint your strengths and growth
          areas. It’s short and helps us tailor your practice plan.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
        <button
          onClick={() => navigate('/onboarding/diagnostic/composite')}
          className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Start Quick Diagnostic (Recommended)
        </button>
        <button
          onClick={() => setShowSubjects((prev) => !prev)}
          className="w-full px-6 py-3 rounded-lg border border-indigo-200 text-indigo-700 font-semibold hover:bg-indigo-50"
        >
          Choose subjects instead
        </button>
        <button
          onClick={handleSkip}
          disabled={skipping}
          className="w-full px-6 py-3 rounded-lg text-slate-500 hover:text-slate-700"
        >
          {skipping ? 'Skipping...' : 'Skip for now'}
        </button>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </div>

      {showSubjects && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70 p-4 space-y-3"
            >
              <div className="text-lg font-semibold">{subject.label}</div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/onboarding/diagnostic/subject/${subject.id}`)
                  }
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                >
                  Choose
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
