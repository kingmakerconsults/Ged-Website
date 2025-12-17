import React, { useState } from 'react';

export default function SuperAdminQuestionBrowser() {
  console.log('[SuperAdminQuestionBrowser] Component mounting...');

  const [selectedSubject, setSelectedSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const subjects = [
    { key: 'math', label: 'Math' },
    { key: 'science', label: 'Science' },
    { key: 'rla', label: 'Reasoning Through Language Arts (RLA)' },
    { key: 'social', label: 'Social Studies' },
  ];

  const loadQuestions = async (subject) => {
    if (!subject) return;

    setLoading(true);
    setError('');
    setSelectedSubject(subject);

    try {
      const apiBase = window.API_BASE_URL || '';
      const token = localStorage.getItem('appToken');

      const url = `${apiBase}/api/admin/questions-by-subject?subject=${encodeURIComponent(
        subject
      )}`;
      console.log('[QuestionBrowser] Fetching:', url);
      console.log('[QuestionBrowser] Token present:', !!token);

      const response = await fetch(url, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          : { 'Content-Type': 'application/json' },
      });

      console.log('[QuestionBrowser] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[QuestionBrowser] Error response:', errorText);
        throw new Error(`Failed to load questions: ${response.status}`);
      }

      const data = await response.json();
      console.log('[QuestionBrowser] Received data:', data);
      console.log('[QuestionBrowser] Questions count:', data.questions?.length);

      setQuestions(data.questions || []);
      setTotalCount(data.totalQuestions || 0);
    } catch (err) {
      console.error('[QuestionBrowser] Error loading questions:', err);
      setError(err.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (q, index) => {
    return (
      <div
        key={q.displayNumber || index}
        className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300">
            {q.displayNumber || index + 1}
          </div>
          <div className="flex-1">
            <div className="prose dark:prose-invert max-w-none mb-3">
              <p className="text-lg font-medium">
                {q.question || q.questionText || 'No question text'}
              </p>
            </div>

            {q.answerOptions && Array.isArray(q.answerOptions) && (
              <div className="space-y-2 mt-3">
                {q.answerOptions.map((option, optIdx) => (
                  <div
                    key={optIdx}
                    className={`p-3 rounded border ${
                      option.isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{option.text || option.answerText}</span>
                      {option.isCorrect && (
                        <span className="ml-auto text-green-600 dark:text-green-400 font-bold">
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {q.explanation && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Explanation:
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {q.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Question Browser
      </h1>

      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
          Select Subject Area:
        </label>
        <div className="flex flex-wrap gap-3">
          {subjects.map((subj) => (
            <button
              key={subj.key}
              onClick={() => loadQuestions(subj.key)}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedSubject === subj.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {subj.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200">
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading questions...
          </p>
        </div>
      )}

      {!loading && questions.length > 0 && (
        <>
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
            <p className="text-blue-900 dark:text-blue-100 font-medium">
              Showing {totalCount} questions from {selectedSubject}
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => renderQuestion(q, idx))}
          </div>
        </>
      )}

      {!loading && !error && questions.length === 0 && selectedSubject && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No questions found for {selectedSubject}
        </div>
      )}

      {!loading && !selectedSubject && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Select a subject to view questions
        </div>
      )}
    </div>
  );
}
