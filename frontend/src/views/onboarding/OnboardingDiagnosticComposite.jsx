import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizInterface } from '../../components/quiz/QuizInterface.jsx';
import { getApiBaseUrl } from '../../utils/apiBase.js';

export default function OnboardingDiagnosticComposite() {
  const navigate = useNavigate();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiBase}/api/onboarding/diagnostic/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ mode: 'composite', size: 'standard' }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Unable to start diagnostic');
        }
        const data = await res.json();
        if (mounted) {
          setQuiz(data.quiz);
          setAnswers(
            Array.isArray(data.answers)
              ? data.answers
              : new Array(data.quiz?.questions?.length || 0).fill(null)
          );
          setSessionId(data.sessionId);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unable to start');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

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

  if (loading) return <div className="p-6">Loading diagnostic...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!quiz) return <div className="p-6">Diagnostic unavailable.</div>;

  const answeredCount = answers.filter(
    (ans) => ans !== null && ans !== undefined && ans !== ''
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Quick Composite Diagnostic</h2>
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
        timeLimit={quiz?.timeLimit || 60 * (quiz.questions?.length || 40)}
        quizConfig={quiz.config}
      />
    </div>
  );
}
