import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';

const SUBJECTS = [
  'Math',
  'Science',
  'Reasoning Through Language Arts (RLA)',
  'Social Studies',
];
const SUBJECT_SHORT = {
  Math: 'Math',
  Science: 'Science',
  'Reasoning Through Language Arts (RLA)': 'RLA',
  'Social Studies': 'Social Studies',
};

function ScoreCard({ label, score }) {
  const passed = score != null && score >= 145;
  const almost = score != null && score >= 135 && score < 145;
  return (
    <div
      className={`rounded-lg p-4 text-center border ${
        passed
          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
          : almost
            ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
            : score != null
              ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
      }`}
    >
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold">{score != null ? score : '—'}</div>
      {score != null && (
        <div
          className={`text-xs mt-1 font-semibold ${passed ? 'text-green-700 dark:text-green-300' : almost ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-300'}`}
        >
          {passed ? 'PASSING' : almost ? 'ALMOST' : 'NEEDS STUDY'}
        </div>
      )}
    </div>
  );
}

export default function AdminStudentDetailView() {
  const { id } = useParams();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  const [student, setStudent] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [attemptsTotal, setAttemptsTotal] = useState(0);
  const [attemptsPage, setAttemptsPage] = useState(1);
  const [attemptsTotalPages, setAttemptsTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [attemptsLoading, setAttemptsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [quizTypeFilter, setQuizTypeFilter] = useState('');
  const [domainMastery, setDomainMastery] = useState([]);
  const [selectedAttemptId, setSelectedAttemptId] = useState(null);
  const [attemptItems, setAttemptItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  // Fetch student profile
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/admin/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [apiBase, token, id]);

  // Fetch domain mastery for this student
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${apiBase}/api/admin/students/${id}/domain-mastery`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setDomainMastery(data.domains || []);
        }
      } catch (_) {}
    })();
  }, [apiBase, token, id]);

  // Fetch attempt items when drilling down
  useEffect(() => {
    if (!selectedAttemptId) {
      setAttemptItems([]);
      return;
    }
    (async () => {
      setItemsLoading(true);
      try {
        const res = await fetch(
          `${apiBase}/api/admin/students/${id}/attempt/${selectedAttemptId}/items`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setAttemptItems(data.items || []);
        }
      } catch (_) {
      } finally {
        setItemsLoading(false);
      }
    })();
  }, [apiBase, token, id, selectedAttemptId]);

  // Fetch quiz attempts
  useEffect(() => {
    (async () => {
      setAttemptsLoading(true);
      try {
        const params = new URLSearchParams({
          limit: '25',
          page: String(attemptsPage),
        });
        if (subjectFilter) params.set('subject', subjectFilter);
        if (quizTypeFilter) params.set('quizType', quizTypeFilter);

        const res = await fetch(
          `${apiBase}/api/admin/students/${id}/quiz-attempts?${params}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAttempts(data.attempts || []);
        setAttemptsTotal(data.total || 0);
        setAttemptsTotalPages(data.totalPages || 1);
      } catch (err) {
        console.warn('Failed to load attempts:', err);
        setAttempts([]);
      } finally {
        setAttemptsLoading(false);
      }
    })();
  }, [apiBase, token, id, attemptsPage, subjectFilter, quizTypeFilter]);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-400">Loading student...</div>
    );
  if (error)
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
        <Link
          to="/admin/students"
          className="text-blue-600 hover:underline text-sm"
        >
          &larr; Back to Students
        </Link>
      </div>
    );
  if (!student) return null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          to="/admin/students"
          className="text-blue-600 hover:underline text-sm"
        >
          &larr; Back to Students
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {student.name || 'Unnamed Student'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {student.email}
            </p>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
              {student.className && (
                <span>
                  Class: <strong>{student.className}</strong>
                </span>
              )}
              {student.phone && <span>Phone: {student.phone}</span>}
              {student.testDate && (
                <span>
                  Test Date: {new Date(student.testDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="text-right text-xs text-gray-400">
            <div>
              Joined:{' '}
              {student.createdAt
                ? new Date(student.createdAt).toLocaleDateString()
                : '—'}
            </div>
            <div>
              Last Login:{' '}
              {student.lastLogin
                ? new Date(student.lastLogin).toLocaleDateString()
                : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Score Cards */}
      <h2 className="text-lg font-semibold mb-3">Highest Scores by Subject</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ScoreCard label="Math" score={student.highestScores?.Math} />
        <ScoreCard label="Science" score={student.highestScores?.Science} />
        <ScoreCard
          label="RLA"
          score={
            student.highestScores?.['Reasoning Through Language Arts (RLA)'] ||
            student.highestScores?.RLA
          }
        />
        <ScoreCard
          label="Social Studies"
          score={student.highestScores?.['Social Studies']}
        />
      </div>

      {/* Domain Mastery */}
      {domainMastery.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Domain Mastery</h2>
          <div className="space-y-2">
            {domainMastery.map((d) => {
              const pct =
                d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0;
              const color =
                pct >= 70
                  ? 'bg-green-500'
                  : pct >= 45
                    ? 'bg-yellow-500'
                    : 'bg-red-500';
              return (
                <div key={d.domain} className="flex items-center gap-3">
                  <div
                    className="w-40 text-sm font-medium truncate"
                    title={d.domain}
                  >
                    {d.domain}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`${color} h-4 rounded-full transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-semibold">
                    {pct}%
                  </div>
                  <div className="w-20 text-right text-xs text-gray-500">
                    {d.correct}/{d.total}
                  </div>
                  {d.misconception_count > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                      {d.misconception_count} misc.
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Attempt Detail Panel */}
      {selectedAttemptId && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Attempt Detail</h2>
            <button
              onClick={() => setSelectedAttemptId(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Close
            </button>
          </div>
          {itemsLoading ? (
            <div className="text-center py-6 text-gray-400">
              Loading items...
            </div>
          ) : attemptItems.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              No per-question data available for this attempt.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {attemptItems.filter((i) => i.is_correct).length}/
                    {attemptItems.length}
                  </div>
                  <div className="text-xs text-gray-500">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {attemptItems.length > 0
                      ? Math.round(
                          (attemptItems.filter((i) => i.is_correct).length /
                            attemptItems.length) *
                            100
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-xs text-gray-500">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {attemptItems.reduce(
                      (s, i) => s + (i.time_spent_ms || 0),
                      0
                    ) >= 1000
                      ? `${Math.round(
                          attemptItems.reduce(
                            (s, i) => s + (i.time_spent_ms || 0),
                            0
                          ) / 1000
                        )}s`
                      : '—'}
                  </div>
                  <div className="text-xs text-gray-500">Total Time</div>
                </div>
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {attemptItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3 rounded-lg border ${
                      item.is_correct
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800'
                        : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                            item.is_correct ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {item.question_index + 1}
                        </span>
                        <span className="text-sm font-medium">
                          {item.domain || 'Unknown Domain'}
                          {item.topic ? ` › ${item.topic}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        {item.confidence === 'sure' && item.is_correct && (
                          <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            Confident ✓
                          </span>
                        )}
                        {item.confidence === 'sure' && !item.is_correct && (
                          <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                            Misconception
                          </span>
                        )}
                        {item.confidence === 'guessing' && item.is_correct && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Lucky Guess
                          </span>
                        )}
                        {item.time_spent_ms > 0 && (
                          <span className="text-gray-500">
                            {(item.time_spent_ms / 1000).toFixed(1)}s
                          </span>
                        )}
                      </div>
                    </div>
                    {!item.is_correct && (
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="text-red-600">
                          Answered: {item.user_answer || '—'}
                        </span>
                        {' · '}
                        <span className="text-green-600">
                          Correct: {item.correct_answer || '—'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Quiz Attempt History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold">Quiz Attempt History</h2>
          <div className="flex flex-wrap gap-2">
            <select
              value={subjectFilter}
              onChange={(e) => {
                setSubjectFilter(e.target.value);
                setAttemptsPage(1);
              }}
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">All Subjects</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="Reasoning Through Language Arts (RLA)">RLA</option>
              <option value="Social Studies">Social Studies</option>
            </select>
            <select
              value={quizTypeFilter}
              onChange={(e) => {
                setQuizTypeFilter(e.target.value);
                setAttemptsPage(1);
              }}
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">All Types</option>
              <option value="comprehensive">Comprehensive</option>
              <option value="topic">Topic Quiz</option>
              <option value="diagnostic">Diagnostic</option>
              <option value="pop_quiz">Pop Quiz</option>
              <option value="practice">Practice</option>
              <option value="practice_test">Practice Test</option>
            </select>
            <span className="text-xs text-gray-500 self-center">
              {attemptsTotal} attempt{attemptsTotal !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto overscroll-x-contain">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <th className="text-left px-4 py-2 font-medium">Date</th>
                <th className="text-left px-4 py-2 font-medium">Subject</th>
                <th className="text-left px-4 py-2 font-medium">Quiz</th>
                <th className="text-left px-4 py-2 font-medium">Type</th>
                <th className="text-center px-3 py-2 font-medium">Raw Score</th>
                <th className="text-center px-3 py-2 font-medium">Scaled</th>
                <th className="text-center px-3 py-2 font-medium">Pass</th>
                <th className="text-center px-3 py-2 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {attemptsLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : attempts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400">
                    No quiz attempts found
                  </td>
                </tr>
              ) : (
                attempts.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="px-4 py-2 text-gray-500 text-xs">
                      {a.attemptedAt
                        ? new Date(a.attemptedAt).toLocaleString()
                        : '—'}
                    </td>
                    <td className="px-4 py-2">{a.subject}</td>
                    <td
                      className="px-4 py-2 max-w-[200px] truncate"
                      title={a.quizTitle}
                    >
                      {a.quizTitle || a.quizCode}
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {a.quizType || 'unknown'}
                      </span>
                    </td>
                    <td className="text-center px-3 py-2">
                      {a.score != null && a.totalQuestions != null
                        ? `${a.score}/${a.totalQuestions}`
                        : '—'}
                    </td>
                    <td className="text-center px-3 py-2 font-semibold">
                      {a.scaledScore != null ? a.scaledScore : '—'}
                    </td>
                    <td className="text-center px-3 py-2">
                      {a.passed === true ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : a.passed === false ? (
                        <span className="text-red-500">✗</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="text-center px-3 py-2">
                      <button
                        onClick={() =>
                          setSelectedAttemptId(
                            selectedAttemptId === a.id ? null : a.id
                          )
                        }
                        className={`text-xs px-2 py-0.5 rounded ${
                          selectedAttemptId === a.id
                            ? 'bg-blue-600 text-white'
                            : 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        }`}
                      >
                        {selectedAttemptId === a.id ? 'Viewing' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {attemptsTotalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 border-t dark:border-gray-700">
            <button
              onClick={() => setAttemptsPage((p) => Math.max(1, p - 1))}
              disabled={attemptsPage <= 1}
              className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {attemptsPage} of {attemptsTotalPages}
            </span>
            <button
              onClick={() =>
                setAttemptsPage((p) => Math.min(attemptsTotalPages, p + 1))
              }
              disabled={attemptsPage >= attemptsTotalPages}
              className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
