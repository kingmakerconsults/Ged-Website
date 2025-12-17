import React, { useEffect, useState } from 'react';

export default function SuperAdminAllQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [catalogKeys, setCatalogKeys] = useState([]);

  // Build question list from the available catalog structure (flat arrays or nested categories)
  const rebuildFromCatalog = (catalog) => {
    if (!catalog || typeof catalog !== 'object') return [];

    let list = [];

    const addQuizQuestions = (subject, categoryLabel, quiz, quizIndex) => {
      const questionsSources = [];
      if (Array.isArray(quiz?.questions)) questionsSources.push(quiz.questions);
      if (Array.isArray(quiz?.items)) questionsSources.push(quiz.items);
      if (Array.isArray(quiz?.questionBank?.questions))
        questionsSources.push(quiz.questionBank.questions);

      const merged = questionsSources.flat();
      if (!Array.isArray(merged) || merged.length === 0) return;

      merged.forEach((q, questionIndex) => {
        const qObj = typeof q === 'object' ? q : { questionText: String(q) };
        list.push({
          id: `${subject}-${categoryLabel}-${quizIndex}-${questionIndex}`,
          subject,
          category: categoryLabel || quiz.category || 'General',
          quizTitle: quiz.title || `Quiz ${quizIndex + 1}`,
          source: 'premade',
          ...qObj,
        });
      });
    };

    Object.entries(catalog).forEach(([subject, subjData]) => {
      if (Array.isArray(subjData)) {
        subjData.forEach((quiz, quizIndex) => {
          addQuizQuestions(
            subject,
            quiz.category || 'General',
            quiz,
            quizIndex
          );
        });
        return;
      }

      // Also support root-level quizzes under the subject
      if (Array.isArray(subjData?.quizzes)) {
        subjData.quizzes.forEach((quiz, quizIndex) => {
          addQuizQuestions(
            subject,
            quiz.category || 'General',
            quiz,
            quizIndex
          );
        });
      }

      const categories = subjData?.categories || {};
      Object.entries(categories).forEach(([categoryName, catData]) => {
        catData?.quizzes?.forEach((quiz, quizIndex) => {
          addQuizQuestions(subject, categoryName, quiz, quizIndex);
        });

        catData?.topics?.forEach((topic, topicIndex) => {
          if (Array.isArray(topic?.quizzes)) {
            topic.quizzes.forEach((quiz, quizIndex) => {
              addQuizQuestions(
                subject,
                topic.title || categoryName,
                quiz,
                quizIndex
              );
            });
          }

          if (Array.isArray(topic?.questions)) {
            topic.questions.forEach((q, questionIndex) => {
              list.push({
                id: `${subject}-${categoryName}-topic-${topicIndex}-${questionIndex}`,
                subject,
                category: topic.title || categoryName,
                quizTitle: topic.title || `Topic ${topicIndex + 1}`,
                source: 'premade',
                ...q,
              });
            });
          }
        });
      });
    });

    return list;
  };

  useEffect(() => {
    const catalog =
      window.PREMADE_QUIZ_CATALOG ||
      window.AppData ||
      window.ExpandedQuizData ||
      {};
    console.log('[SuperAdminAllQuestions] catalog on mount:', catalog);
    console.log(
      '[SuperAdminAllQuestions] Sample Math structure:',
      catalog?.Math
    );
    try {
      setCatalogKeys(Object.keys(catalog || {}));
    } catch {}

    let list = rebuildFromCatalog(catalog);
    console.log(
      '[SuperAdminAllQuestions] Extracted questions:',
      list.length,
      list.slice(0, 2)
    );

    // If nothing yet, wait for quizDataLoaded event then rebuild once
    if (list.length === 0 && typeof window !== 'undefined') {
      const onQuizDataLoaded = (evt) => {
        const nextCatalog =
          window.PREMADE_QUIZ_CATALOG || window.AppData || evt?.detail || {};
        console.log(
          '[SuperAdminAllQuestions] quizDataLoaded event catalog:',
          nextCatalog
        );
        try {
          setCatalogKeys(Object.keys(nextCatalog || {}));
        } catch {}
        const rebuilt = rebuildFromCatalog(nextCatalog);
        console.log(
          '[SuperAdminAllQuestions] Premade questions after event:',
          rebuilt.length
        );
        setAllQuestions((prev) => {
          // Only replace if still empty to avoid overwriting fetched AI
          if (prev.length > 0) return prev;
          return rebuilt;
        });
      };
      window.addEventListener('quizDataLoaded', onQuizDataLoaded, {
        once: true,
      });
    }

    console.log(
      '[SuperAdminAllQuestions] Premade questions count:',
      list.length
    );

    // Fetch AI-generated questions
    const apiBase = window.API_BASE_URL || '';
    const token = localStorage.getItem('appToken');
    console.log('[SuperAdminAllQuestions] Token present:', !!token);
    console.log(
      '[SuperAdminAllQuestions] API URL:',
      `${apiBase}/api/admin/all-questions`
    );

    fetch(`${apiBase}/api/admin/all-questions`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch AI questions: ${res.status}`);
        }
        return res.json();
      })
      .then((aiRows) => {
        console.log('[SuperAdminAllQuestions] AI questions response:', aiRows);
        const aiQuestions = Array.isArray(aiRows)
          ? aiRows.map((row, idx) => ({
              id: `ai-${row.id || idx}`,
              subject: row.subject || 'AI Generated',
              category: row.topic || 'AI Bank',
              quizTitle: 'AI Generated',
              source: 'ai',
              ...row.question_json,
            }))
          : [];

        console.log(
          '[SuperAdminAllQuestions] Total questions:',
          list.length + aiQuestions.length
        );
        setAllQuestions([...list, ...aiQuestions]);
      })
      .catch((err) => {
        console.error('Failed to fetch AI questions:', err);
        setError(err.message);
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
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          All Questions (Master List)
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">
        All Questions (Master List)
      </h1>
      <div className="mb-4 text-xs text-slate-600 dark:text-slate-300 p-3 border-l-4 border-blue-500 bg-white dark:bg-slate-800">
        <div>Debug: Questions Catalog component mounted.</div>
        <div>
          Catalog subjects seen:{' '}
          {catalogKeys.length ? catalogKeys.join(', ') : 'none'}
        </div>
        <div>
          Premade count:{' '}
          {allQuestions.filter((q) => q.source === 'premade').length}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
          Warning: {error}
        </div>
      )}

      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Total Loaded: {allQuestions.length} questions ({filtered.length} shown)
      </p>

      {allQuestions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No questions found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Debug: subjects detected:{' '}
            {catalogKeys.length ? catalogKeys.join(', ') : 'none'}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Filter by subject, category, or question text..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border rounded dark:border-slate-600 dark:text-white"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                color: '#000000',
              }}
            />
          </div>

          <div className="space-y-4">
            {filtered.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i + 1} />
            ))}
          </div>
        </>
      )}
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
