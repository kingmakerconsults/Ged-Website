import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiBaseUrl } from '../../utils/apiBase.js';

export default function OnboardingAccountView({ user }) {
  const navigate = useNavigate();
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [displayName, setDisplayName] = useState(user?.display_name || '');
  const [organizationId, setOrganizationId] = useState(
    user?.organization_id || ''
  );
  const [joinCode, setJoinCode] = useState('');
  const [pictureUrl, setPictureUrl] = useState(user?.picture_url || '');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/organizations`);
        const data = await res.json();
        if (mounted) {
          setOrgs(Array.isArray(data?.organizations) ? data.organizations : []);
        }
      } catch (_) {
        if (mounted) setOrgs([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  const selectedOrg = orgs.find(
    (org) => String(org.id) === String(organizationId)
  );
  const requiresCode = Boolean(selectedOrg?.requires_code);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required.');
      return;
    }
    if (requiresCode && !String(joinCode || '').trim()) {
      setError('Join code is required for this organization.');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiBase}/api/onboarding/account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          displayName,
          organizationId: organizationId ? Number(organizationId) : null,
          joinCode: requiresCode ? joinCode : null,
          pictureUrl: pictureUrl || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to save account info');
      }

      navigate('/onboarding/diagnostic');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save account');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading account setup...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Account Setup</h2>
        <p className="text-slate-600">
          Let’s finish your profile so we can personalize your learning plan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            First name
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
            />
          </label>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Last name
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
            />
          </label>
        </div>

        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Display name (shown in your dashboard)
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Optional"
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Organization
          <select
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
          >
            <option value="">Select organization (optional)</option>
            {orgs.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </label>

        {requiresCode && (
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Organization join code
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
            />
          </label>
        )}

        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Profile picture URL (optional)
          <input
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            placeholder="https://"
            className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Contact email
          <input
            value={user?.email || ''}
            readOnly
            className="mt-1 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-2 text-slate-500"
          />
        </label>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
