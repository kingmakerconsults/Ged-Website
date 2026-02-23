import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';

const SUBJECTS = ['Math', 'Science', 'RLA', 'Social Studies'];

function ScoreBadge({ score }) {
  if (score == null) return <span className="text-gray-400 text-xs">—</span>;
  const passed = score >= 145;
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
        passed
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : score >= 135
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}
    >
      {score}
    </span>
  );
}

export default function AdminStudentsView() {
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  const [searchParams, setSearchParams] = useSearchParams();

  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const [classFilter, setClassFilter] = useState(
    searchParams.get('classId') || ''
  );
  const [classes, setClasses] = useState([]);
  const page = parseInt(searchParams.get('page') || '1');

  // Fetch classes for filter dropdown
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/admin/classes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setClasses(Array.isArray(data) ? data : data.classes || []);
        }
      } catch (_) {}
    })();
  }, [apiBase, token]);

  // Fetch students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: '25', page: String(page) });
      if (nameFilter.trim()) params.set('name', nameFilter.trim());
      if (classFilter) params.set('classId', classFilter);

      const res = await fetch(
        `${apiBase}/api/admin/students/search?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStudents(data.results || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiBase, token, page, nameFilter, classFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (nameFilter.trim()) params.set('name', nameFilter.trim());
    if (classFilter) params.set('classId', classFilter);
    params.set('page', '1');
    setSearchParams(params);
  };

  const goToPage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(p));
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <span className="text-sm text-gray-500">
          {total} student{total !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm flex-1 min-w-[200px] bg-white dark:bg-gray-800 dark:border-gray-600"
        />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">
          Failed to load students: {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Class</th>
              <th className="text-center px-3 py-3 font-medium">Math</th>
              <th className="text-center px-3 py-3 font-medium">Science</th>
              <th className="text-center px-3 py-3 font-medium">RLA</th>
              <th className="text-center px-3 py-3 font-medium">Social St.</th>
              <th className="text-left px-4 py-3 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-400">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr
                  key={s.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/students/${s.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {s.name || 'Unnamed'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {s.email}
                  </td>
                  <td className="px-4 py-3">{s.className || '—'}</td>
                  <td className="text-center px-3 py-3">
                    <ScoreBadge score={s.highestScores?.Math} />
                  </td>
                  <td className="text-center px-3 py-3">
                    <ScoreBadge score={s.highestScores?.Science} />
                  </td>
                  <td className="text-center px-3 py-3">
                    <ScoreBadge score={s.highestScores?.RLA} />
                  </td>
                  <td className="text-center px-3 py-3">
                    <ScoreBadge score={s.highestScores?.['Social Studies']} />
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {s.lastLoginAt
                      ? new Date(s.lastLoginAt).toLocaleDateString()
                      : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
