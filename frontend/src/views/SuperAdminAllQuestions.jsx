import React, { useEffect, useState } from 'react';

export default function SuperAdminAllQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const catalog = window.AppData || {};

    let list = [];

    // Extract ALL questions from ALL subjects/categories/quizzes
    Object.entries(catalog).forEach(([subject, subjData]) => {
      if (!subjData?.categories) return;

      Object.entries(subjData.categories).forEach(([category, catData]) => {
        catData.quizzes?.forEach((quiz, quizIndex) => {
          quiz.questions?.forEach((q, questionIndex) => {
            list.push({
              id: `${subject}-${category}-${quizIndex}-${questionIndex}`,
              subject,
              category,
              quizTitle: quiz.title || `Quiz ${quizIndex + 1}`,
              source: 'premade',
              ...q,
            });
          });
        });
      });
    });

    // Fetch AI-generated questions
    const apiBase = window.API_BASE_URL || '';
    fetch(`${apiBase}/api/admin/all-questions`)
      .then((res) => res.json())
      .then((aiRows) => {
        const aiQuestions = aiRows.map((row, idx) => ({
          id: `ai-${row.id || idx}`,
          subject: row.subject || 'AI Generated',
          category: row.topic || 'AI Bank',
          quizTitle: 'AI Generated',
          source: 'ai',
          ...row.question_json,
        }));

        setAllQuestions([...list, ...aiQuestions]);
      })
      .catch((err) => {
        console.error('Failed to fetch AI questions:', err);
        setAllQuestions(list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = allQuestions.filter(
    (q) =>
      q.subject?.toLowerCase().includes(filter.toLowerCase()) ||
      q.category?.toLowerCase().includes(filter.toLowerCase()) ||
      q.question?.toLowerCase().includes(filter.toLowerCase()) ||
      q.questionText?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">All Questions (Master List)</h1>
        <p className="text-gray-500">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Questions (Master List)</h1>
      <p className="text-gray-500 mb-6">
        Total Loaded: {allQuestions.length} questions ({filtered.length} shown)
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by subject, category, or question text..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i + 1} />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ question, index }) {
  const questionText =
    question.question || question.questionText || 'No question text';
  const passage = question.passage || '';
  const answerOptions = question.answerOptions || [];
  const correctAnswer = question.correctAnswer;
  const rationale = question.rationale || question.explanation || '';

  return (
    <div className="border rounded p-4 bg-white dark:bg-slate-800 shadow">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        #{index} • {question.source} • {question.subject} → {question.category}{' '}
        → {question.quizTitle}
      </div>

      {passage && (
        <div
          className="mb-3 text-sm opacity-80 dark:opacity-70"
          dangerouslySetInnerHTML={{ __html: passage }}
        />
      )}

      <div
        className="font-semibold mb-3 dark:text-white"
        dangerouslySetInnerHTML={{ __html: questionText }}
      />

      {answerOptions.length > 0 ? (
        <div className="ml-4 mb-3">
          {answerOptions.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isCorrect = opt.isCorrect;
            return (
              <div
                key={i}
                className={`mb-1 ${
                  isCorrect
                    ? 'text-green-600 dark:text-green-400 font-semibold'
                    : 'dark:text-gray-300'
                }`}
              >
                {letter}. {opt.text}
              </div>
            );
          })}
        </div>
      ) : null}

      {correctAnswer !== undefined && (
        <div className="mt-2 text-blue-600 dark:text-blue-400 text-sm">
          Correct Answer: {correctAnswer}
        </div>
      )}

      {rationale && (
        <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
          <strong>Rationale:</strong> {rationale}
        </div>
      )}
    </div>
  );
}
