import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizInterface } from '../../components/quiz/QuizInterface.jsx';
import { getApiBaseUrl } from '../../utils/apiBase.js';

export default function LocalQuizRunner() {
  const navigate = useNavigate();
  const quiz = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('current_quiz_data')) || null;
    } catch {
      return null;
    }
  }, []);
  const [answers, setAnswers] = useState(
    new Array(quiz?.questions?.length || 0).fill(null)
  );

  if (!quiz) {
    return <div className="p-6">Quiz not found.</div>;
  }

  const handleComplete = async ({ answers: submittedAnswers }) => {
    try {
      const token =
        localStorage.getItem('token') || localStorage.getItem('appToken');
      const res = await fetch(`${getApiBaseUrl()}/api/diagnostic-test/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          quiz,
          answers: submittedAnswers,
        }),
      });
      if (!res.ok) {
        console.warn('Diagnostic submission failed');
      }
    } catch (err) {
      console.warn('Diagnostic submission error:', err?.message || err);
    } finally {
      navigate('/');
    }
  };

  return (
    <div className="space-y-4">
      <QuizInterface
        questions={quiz.questions || []}
        answers={answers}
        setAnswers={setAnswers}
        onComplete={handleComplete}
        buttonText="Finish"
        quizTitle={quiz.title}
        subject={quiz.subject}
        showTimer
        quizConfig={quiz.config}
      />
    </div>
  );
}
