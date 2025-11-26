import React, { useState, useEffect } from 'react';

const API_BASE_URL =
  (typeof window !== 'undefined' && window.API_BASE_URL) || '';

export function JoinOrganizationModal({ onJoin, authToken }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingOrgs, setFetchingOrgs] = useState(true);

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/organizations`);
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          throw new Error('Server returned non-JSON response');
        }
        const data = await response.json();
        if (data.ok && Array.isArray(data.organizations)) {
          setOrganizations(data.organizations);
        } else {
          setError('Failed to load organizations');
        }
      } catch (err) {
        console.error('Failed to fetch organizations:', err);
        setError('Failed to load organizations');
      } finally {
        setFetchingOrgs(false);
      }
    }
    fetchOrganizations();
  }, []);

  const selectedOrg = organizations.find(
    (org) => org.id === Number(selectedOrgId)
  );
  const requiresCode = selectedOrg?.requires_code || false;

  const handleJoin = async () => {
    if (!selectedOrgId) {
      setError('Please select an organization');
      return;
    }

    if (requiresCode && !accessCode.trim()) {
      setError('This organization requires an access code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/student/select-organization`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            organization_id: Number(selectedOrgId),
            access_code: accessCode.trim() || undefined,
          }),
        }
      );

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'access_code_required') {
          setError('This organization requires an access code');
        } else if (data.error === 'invalid_access_code') {
          setError('The access code you entered is incorrect');
        } else {
          setError(data.message || data.error || 'Failed to join organization');
        }
        setLoading(false);
        return;
      }

      if (data.ok && data.user) {
        onJoin(data.user);
      } else {
        setError('Unexpected response from server');
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to join organization:', err);
      setError('Failed to join organization. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
    >
      <div
        className="relative w-11/12 max-w-md rounded-lg p-8 shadow-2xl"
        style={{
          backgroundColor: 'var(--modal-surface)',
          color: 'var(--modal-text)',
          border: `1px solid var(--modal-border)`,
        }}
      >
        <h2
          className="mb-4 text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Welcome! Join Your Organization
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          To use this app, you need to join an organization. Please select one
          below.
        </p>

        {fetchingOrgs ? (
          <div
            className="text-center py-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Loading organizations...
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Select Organization
              </label>
              <select
                id="organization"
                value={selectedOrgId}
                onChange={(e) => {
                  setSelectedOrgId(e.target.value);
                  setAccessCode('');
                  setError('');
                }}
                className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: `1px solid var(--border-subtle)`,
                  color: 'var(--text-primary)',
                }}
                disabled={loading}
              >
                <option value="">-- Choose an organization --</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            {requiresCode && (
              <div>
                <label
                  htmlFor="accessCode"
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Access Code
                </label>
                <input
                  type="text"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => {
                    setAccessCode(e.target.value);
                    setError('');
                  }}
                  className="block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: `1px solid var(--border-subtle)`,
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter access code"
                  disabled={loading}
                />
              </div>
            )}

            {error && (
              <div
                className="rounded-md p-3 text-sm"
                style={{
                  backgroundColor: 'var(--error-bg)',
                  color: 'var(--error-text)',
                  border: `1px solid var(--error-border)`,
                }}
              >
                {error}
              </div>
            )}

            <button
              onClick={handleJoin}
              disabled={loading || !selectedOrgId}
              className="w-full rounded-lg px-6 py-3 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              data-role="primary"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-text)',
                borderColor: 'var(--accent)',
              }}
            >
              {loading ? 'Joining...' : 'Join Organization'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function NamePromptModal({ user, onSave, onDismiss }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (user && user.name) {
      const nameParts = user.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (firstName.trim() && lastName.trim()) {
      try {
        await onSave(firstName.trim(), lastName.trim());
      } catch (error) {
        console.error('Failed to save name from modal:', error);
        alert('Unable to save your name right now. Please try again.');
      }
    } else {
      alert('Please enter both a first and last name.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
    >
      <div
        className="relative w-11/12 max-w-md rounded-lg p-8 shadow-2xl"
        style={{
          backgroundColor: 'var(--modal-surface)',
          color: 'var(--modal-text)',
          border: `1px solid var(--modal-border)`,
        }}
      >
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Close name prompt"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <h2
          className="mb-4 text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Welcome! Let's set up your name.
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Please confirm your name below. This will be used to personalize your
          experience.
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: `1px solid var(--border-subtle)`,
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: `1px solid var(--border-subtle)`,
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <button
            onClick={handleSave}
            className="w-full rounded-lg px-6 py-3 font-bold transition"
            data-role="primary"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-text)',
              borderColor: 'var(--accent)',
            }}
          >
            Save Name
          </button>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="w-full rounded-lg px-6 py-3 font-semibold transition"
              data-role="secondary"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PracticeSessionModal({
  defaultMode = 'balanced',
  defaultDuration = 10,
  onStart,
  onDismiss,
}) {
  const [mode, setMode] = useState(defaultMode);
  const [duration, setDuration] = useState(defaultDuration);
  const [practiceMode, setPracticeMode] = useState('standard'); // 'standard', 'timed', 'olympics'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      await onStart({
        mode,
        durationMinutes: Number(duration),
        practiceMode,
      });
    } catch (e) {
      const msg =
        e && e.message ? e.message : 'Failed to start practice session.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--modal-overlay)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl border"
        style={{
          backgroundColor: 'var(--modal-surface)',
          color: 'var(--modal-text)',
          border: `1px solid var(--modal-border)`,
        }}
      >
        <h2 className="text-xl font-bold mb-4">Start a Practice Session</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Practice Type
            </label>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPracticeMode('standard')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  practiceMode === 'standard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                disabled={submitting}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setPracticeMode('timed')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  practiceMode === 'timed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                disabled={submitting}
              >
                Timed
              </button>
              <button
                type="button"
                onClick={() => setPracticeMode('olympics')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  practiceMode === 'olympics'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                disabled={submitting}
              >
                Olympics ⭐
              </button>
            </div>
            {practiceMode === 'olympics' && (
              <div className="mb-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Olympics Mode:</strong> No timer • 3 lives • Stop
                  anytime
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  You lose a life for each wrong answer. Session ends when you
                  run out of lives or choose to stop.
                </p>
              </div>
            )}
          </div>
          <div
            style={{ display: practiceMode === 'olympics' ? 'none' : 'block' }}
          >
            <label className="block text-sm font-medium mb-1">Duration</label>
            <select
              className="w-full rounded-md border px-3 py-2 bg-transparent"
              style={{ borderColor: 'var(--modal-border)' }}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              disabled={submitting}
            >
              {[10, 20, 30, 40, 50, 60].map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mode</label>
            <select
              className="w-full rounded-md border px-3 py-2 bg-transparent"
              style={{ borderColor: 'var(--modal-border)' }}
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              disabled={submitting}
            >
              <option value="balanced">Balanced (Mixed Subjects)</option>
              <option value="math">Math Only</option>
              <option value="rla">RLA Only</option>
              <option value="science">Science Only</option>
              <option value="social-studies">Social Studies Only</option>
            </select>
          </div>
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onDismiss}
            className="px-4 py-2 rounded-md border"
            style={{ borderColor: 'var(--modal-border)' }}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-md font-semibold ${
              submitting ? 'opacity-70' : ''
            }`}
            style={{ backgroundColor: '#2563eb', color: 'white' }}
            disabled={submitting}
          >
            {submitting
              ? 'Starting…'
              : practiceMode === 'olympics'
              ? 'Start Olympics'
              : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Attach modal components to window.Components
if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  Object.assign(window.Components, {
    JoinOrganizationModal,
    NamePromptModal,
    PracticeSessionModal,
  });
}
