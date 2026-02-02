import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuizInterface } from '../../components/quiz/QuizInterface.jsx';
import { getApiBaseUrl } from '../../utils/apiBase.js';

const SUBJECT_LABELS = {
  math: 'Math',
  rla: 'RLA',
  science: 'Science',
  'social-studies': 'Social Studies',
};

export default function OnboardingDiagnosticSubject() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [size, setSize] = useState('quick');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const subjectLabel = SUBJECT_LABELS[subject] || 'Subject';

  const startDiagnostic = async (selectedSize) => {
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBase}/api/onboarding/diagnostic/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          mode: 'subject',
          subject,
          size: selectedSize,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Unable to start diagnostic');
      }
      const data = await res.json();
      setQuiz(data.quiz);
      setAnswers(
        Array.isArray(data.answers)
          ? data.answers
          : new Array(data.quiz?.questions?.length || 0).fill(null)
      );
      setSessionId(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuiz(null);
    setAnswers([]);
    setSessionId(null);
  }, [subject]);

  const handleComplete = async ({ answers: submittedAnswers }) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBase}/api/onboarding/diagnostic/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          sessionId,
          answers: submittedAnswers,
          status: 'completed',
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Unable to submit diagnostic');
      }
      navigate('/onboarding/complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveExit = async () => {
    if (!sessionId) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${apiBase}/api/onboarding/diagnostic/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          sessionId,
          answers,
          status: 'in_progress',
        }),
      });
      navigate('/onboarding/diagnostic');
    } catch (_) {
      navigate('/onboarding/diagnostic');
    } finally {
      setSaving(false);
    }
  };

  if (!quiz) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{subjectLabel} Diagnostic</h2>
          <p className="text-slate-600">
            Choose a quick or standard diagnostic for this subject.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
          <div className="flex gap-2">
            {['quick', 'standard'].map((option) => (
              <button
                key={option}
                onClick={() => setSize(option)}
                className={`px-4 py-2 rounded-lg border ${
                  size === option
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {option === 'quick' ? 'Quick (6–8 Q)' : 'Standard (10–12 Q)'}
              </button>
            ))}
          </div>
          <button
            onClick={() => startDiagnostic(size)}
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            {loading ? 'Loading...' : 'Start Diagnostic'}
          </button>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
      </div>
    );
  }

  const answeredCount = answers.filter(
    (ans) => ans !== null && ans !== undefined && ans !== ''
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-slate-600 text-sm">
            Answered {answeredCount} of {quiz.questions?.length || 0}
          </p>
        </div>
        <button
          onClick={handleSaveExit}
          disabled={saving}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          Save & exit
        </button>
      </div>

      <QuizInterface
        questions={quiz.questions || []}
        answers={answers}
        setAnswers={setAnswers}
        onComplete={handleComplete}
        buttonText={saving ? 'Submitting...' : 'Finish Diagnostic'}
        quizTitle={quiz.title}
        subject={quiz.subject}
        showTimer
        timeLimit={quiz?.timeLimit || 60 * (quiz.questions?.length || 12)}
        quizConfig={quiz.config}
      />
    </div>
  );
}
