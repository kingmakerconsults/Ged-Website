// StudentClassView: read-only curriculum view for a class the student is
// enrolled in. Shows ordered items with covered / live / upcoming markers.
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getApiBaseUrl } from '../utils/apiBase.js';

function getToken() {
  return (
    localStorage.getItem('token') || localStorage.getItem('appToken') || ''
  );
}

export default function StudentClassView() {
  const { id } = useParams();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/classes/${id}/curriculum`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setData(await res.json());
      setError(null);
    } catch (_) {
      setError('Failed to load class');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 20000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const join = async () => {
    const res = await fetch(
      `${apiBase}/api/classes/${id}/join-current-session`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    if (res.ok) {
      const d = await res.json();
      navigate(`/collab/${d.roomCode}`);
    } else {
      alert('No live session right now.');
    }
  };

  if (loading) return <div>Loading class…</div>;
  if (error) return <div className="text-red-700">{error}</div>;
  if (!data) return null;

  const items = data.items || [];
  const liveItem = items.find((it) => it.liveRoomCode);
  const coveredCount = items.filter(
    (it) => it.coverage || it.manuallyMarkedCovered
  ).length;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-2">
        <Link to="/" className="text-sm text-purple-700 underline">
          ← Back to dashboard
        </Link>
      </div>
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="text-2xl font-bold">{data.className}</h2>
        {liveItem && (
          <button
            onClick={join}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded"
          >
            Join live session
          </button>
        )}
      </div>
      <div className="text-sm text-gray-600 mb-4">
        {coveredCount} of {items.length} topics covered
      </div>

      {items.length === 0 ? (
        <div className="text-gray-600">
          Your instructor hasn't added any curriculum items yet.
        </div>
      ) : (
        <ol className="space-y-2">
          {items.map((it, idx) => {
            const covered = !!(it.coverage || it.manuallyMarkedCovered);
            const live = !!it.liveRoomCode;
            return (
              <li
                key={it.id}
                className="p-3 border rounded bg-white flex items-start gap-3"
              >
                <div className="text-gray-400 font-mono text-sm pt-0.5 w-6 text-right">
                  {idx + 1}
                </div>
                <div className="pt-1">
                  {covered ? (
                    <span className="text-green-600" title="Covered">
                      ✓
                    </span>
                  ) : live ? (
                    <span
                      className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"
                      title="Live now"
                    />
                  ) : (
                    <span
                      className="inline-block w-2 h-2 rounded-full bg-gray-300"
                      title="Upcoming"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {it.subject && (
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {it.subject}
                      </span>
                    )}
                    {it.categoryName && (
                      <span className="text-xs text-gray-600">
                        {it.categoryName}
                      </span>
                    )}
                    {covered && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">
                        Covered
                      </span>
                    )}
                    {live && (
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 animate-pulse">
                        Live now
                      </span>
                    )}
                    {it.plannedDate && !covered && (
                      <span className="text-xs text-gray-500">
                        {new Date(it.plannedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="font-medium mt-0.5">{it.title}</div>
                </div>
                {live && (
                  <button
                    onClick={join}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded"
                  >
                    Join
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
