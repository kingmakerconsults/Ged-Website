import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { loadMathQuestions } from '../loaders/questions.js';

const QuizInterface = React.lazy(() =>
  import('../../components/quiz/QuizInterface.jsx').then((m) => ({
    default: m.QuizInterface,
  }))
);

export default function QuizDemo() {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const bank = await loadMathQuestions();
        // Bank shape: { Math: { categories: { name: [q, q2, ...] } } }
        const subject =
          bank?.Math || bank?.math || Object.values(bank || {})[0] || {};
        const cats = subject?.categories || {};
        const list = [];
        for (const arr of Object.values(cats)) {
          if (Array.isArray(arr)) {
            for (const q of arr) {
              if (q && typeof q === 'object') list.push(q);
              if (list.length >= 5) break;
            }
          }
          if (list.length >= 5) break;
        }
        if (mounted) {
          setQuestions(list);
          setAnswers(Array(list.length).fill(null));
        }
      } catch (e) {
        console.error('Failed to load math questions:', e);
        if (mounted) setQuestions([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onComplete = (result) => {
    console.log('Quiz complete:', result);
    alert(
      `Completed! You answered ${result.answers.filter(Boolean).length}/${
        questions?.length || 0
      }.`
    );
  };

  if (!questions) return <div>Loading quiz…</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Quick Math Quiz (5 questions)</h2>
      <Suspense fallback={<div>Loading quiz UI…</div>}>
        <QuizInterface
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          onComplete={onComplete}
          buttonText="Submit"
          quizTitle="Quick Math Quiz"
          subject="Math"
          timeLimit={questions.length * 90}
          showTimer={true}
          quizConfig={{}}
        />
      </Suspense>
    </div>
  );
}
