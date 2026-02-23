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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {student.name || 'Unnamed Student'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {student.email}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
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

      {/* Quiz Attempt History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b dark:border-gray-700 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-lg font-semibold">Quiz Attempt History</h2>
          <div className="flex gap-2">
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

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                <th className="text-left px-4 py-2 font-medium">Date</th>
                <th className="text-left px-4 py-2 font-medium">Subject</th>
                <th className="text-left px-4 py-2 font-medium">Quiz</th>
                <th className="text-left px-4 py-2 font-medium">Type</th>
                <th className="text-center px-3 py-2 font-medium">Raw Score</th>
                <th className="text-center px-3 py-2 font-medium">Scaled</th>
                <th className="text-center px-3 py-2 font-medium">Pass</th>
              </tr>
            </thead>
            <tbody>
              {attemptsLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : attempts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
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
