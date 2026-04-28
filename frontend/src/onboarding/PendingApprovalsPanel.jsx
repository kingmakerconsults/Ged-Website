/**
 * Pending membership requests panel (2026-04-28).
 * Shown in OrgAdminDashboard and SuperAdminDashboard.
 *
 * Props:
 *   - token: bearer token
 *   - role: 'super_admin' | 'org_admin'
 *   - organizationIds?: number[]  (super admin can pass to scope; defaults to all)
 */

import React, { useCallback, useEffect, useState } from 'react';

const API =
  (typeof window !== 'undefined' &&
    typeof window.API_BASE_URL === 'string' &&
    window.API_BASE_URL) ||
  '';

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function PendingApprovalsPanel({ token, role, organizationId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ status: 'pending' });
      if (role === 'super_admin' && organizationId) {
        params.set('organization_id', String(organizationId));
      }
      const r = await fetch(`${API}/api/org/membership-requests?${params}`, {
        headers: authHeaders(token),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'load_failed');
      setRequests(Array.isArray(data?.requests) ? data.requests : []);
    } catch (e) {
      setError(e.message || 'Could not load requests');
    } finally {
      setLoading(false);
    }
  }, [token, role, organizationId]);

  useEffect(() => {
    load();
  }, [load]);

  async function decide(id, decision) {
    setBusyId(id);
    try {
      const r = await fetch(`${API}/api/org/membership-requests/${id}/decide`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
        body: JSON.stringify({ decision }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || 'decide_failed');
      }
      await load();
    } catch (e) {
      setError(e.message || 'Could not save decision');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="pending-approvals">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">
          Pending Approvals
        </h2>
        <button
          type="button"
          onClick={load}
          className="rounded-full btn-ghost px-3 py-1.5 text-xs font-semibold"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-sm text-muted">Loading...</p>}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-3">
          {error}
        </div>
      )}
      {!loading && !error && !requests.length && (
        <p className="text-sm text-muted">No pending requests.</p>
      )}
      {!!requests.length && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr>
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Program</th>
                <th className="py-2 pr-4">Requested</th>
                <th className="py-2 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-subtle">
                  <td className="py-2 pr-4 text-primary">
                    {r.name || '\u2014'}
                  </td>
                  <td className="py-2 pr-4 text-secondary">{r.email}</td>
                  <td className="py-2 pr-4 text-secondary">
                    {r.organization_name}
                  </td>
                  <td className="py-2 pr-4 text-muted">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleString()
                      : ''}
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => decide(r.id, 'approve')}
                        className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {busyId === r.id ? '...' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => decide(r.id, 'deny')}
                        className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
                      >
                        Deny
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
