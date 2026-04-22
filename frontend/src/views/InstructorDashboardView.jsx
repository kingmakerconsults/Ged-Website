// InstructorDashboardView: lists the instructor's classes and lets them
// create a new one. Each class card links into InstructorClassView for
// roster + curriculum management.
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';

function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('appToken') || ''
  );
}

export default function InstructorDashboardView() {
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/classes`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setClasses(data.classes || []);
      setError(null);
    } catch (e) {
      setError('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(`${apiBase}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) throw new Error('failed');
      setNewName('');
      await load();
    } catch (_) {
      setError('Failed to create class');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Teach</h2>
      </div>

      <div className="mb-6 p-4 border rounded bg-white shadow-sm">
        <h3 className="font-semibold mb-2">Create a class</h3>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Period 3 GED Math"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={create}
            disabled={creating || !newName.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded font-semibold"
          >
            Create
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 border border-red-300 bg-red-50 text-red-800 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div>Loading classes…</div>
      ) : classes.length === 0 ? (
        <div className="text-gray-600">
          No classes yet. Create one above to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => (
            <Link
              key={c.id}
              to={`/instructor/classes/${c.id}`}
              className="block p-4 border rounded bg-white hover:shadow-md transition no-underline text-inherit"
            >
              <div className="text-lg font-semibold">{c.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                {c.member_count != null
                  ? `${c.member_count} student${c.member_count === 1 ? '' : 's'}`
                  : ''}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Join code:{' '}
                <span className="font-mono font-semibold">{c.join_code}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
