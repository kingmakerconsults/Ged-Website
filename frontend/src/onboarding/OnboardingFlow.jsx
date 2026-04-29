/**
 * Fresh-start onboarding (2026-04-28).
 *
 * Renders the post-login flow when a student's account_status is not
 * yet 'active'. Three stages:
 *   1. ProgramSelectWizard      \u2014 search & request to join an org
 *   2. AwaitingApprovalScreen   \u2014 polled status while org_admin reviews
 *   3. DeniedScreen             \u2014 admin rejected; allow re-pick
 *   4. OnboardingTour           \u2014 first-active session welcome / test dates
 *
 * The tour is also re-shown to any active student whose
 * onboarding_state.tour_completed !== true. Persisted via PATCH /api/me/onboarding.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';

const POLL_MS = 30000;
const SEARCH_DEBOUNCE_MS = 250;

function getStoredToken() {
  try {
    if (typeof localStorage === 'undefined') return null;
    return (
      localStorage.getItem('appToken') ||
      localStorage.getItem('authToken') ||
      null
    );
  } catch {
    return null;
  }
}

function authFetch(url, token, opts = {}) {
  const effectiveToken = token || getStoredToken();
  return fetch(url, {
    credentials: 'include',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(effectiveToken ? { Authorization: `Bearer ${effectiveToken}` } : {}),
      ...(opts.headers || {}),
    },
  });
}

// ---------------------------------------------------------------------------
// ProgramSelectWizard
// ---------------------------------------------------------------------------

function ProgramSelectWizard({ token, onSubmitted }) {
  const [query, setQuery] = useState('');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ region: 'NYC' });
        if (query.trim()) params.set('q', query.trim());
        const r = await fetch(`/api/programs?${params}`);
        const data = await r.json();
        setPrograms(Array.isArray(data?.programs) ? data.programs : []);
      } catch (e) {
        setError('Could not load programs.');
      } finally {
        setLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [query]);

  async function submit() {
    if (!selectedId) return;
    setSubmitting(true);
    setError(null);
    try {
      const r = await authFetch('/api/me/membership-request', token, {
        method: 'POST',
        body: JSON.stringify({ organization_id: selectedId }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        const detail = [j.error, j.reason].filter(Boolean).join(': ');
        throw new Error(detail || `Request failed (${r.status})`);
      }
      const data = await r.json().catch(() => ({}));
      onSubmitted?.(data);
    } catch (e) {
      setError(e.message || 'Could not submit request.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card">
        <h1>Find your GED program</h1>
        <p className="muted">
          Pick the program you attend. Your program admin will confirm and grant
          access.
        </p>
        <input
          className="program-search"
          autoFocus
          placeholder="Search NYC GED programs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {error && <div className="onboarding-error">{error}</div>}
        <div className="program-list" role="listbox">
          {loading && <div className="muted">Loading...</div>}
          {!loading && !programs.length && (
            <div className="muted">No matching programs found.</div>
          )}
          {programs.map((p) => (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={selectedId === p.id}
              className={`program-item${selectedId === p.id ? ' selected' : ''}`}
              onClick={() => setSelectedId(p.id)}
            >
              <div className="program-name">{p.name}</div>
              {p.region && (
                <div className="program-meta">
                  {p.region} \u00b7 {p.program_type}
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="onboarding-actions">
          <button
            type="button"
            className="btn-primary"
            disabled={!selectedId || submitting}
            onClick={submit}
          >
            {submitting ? 'Sending...' : 'Request access'}
          </button>
        </div>
        <p className="muted" style={{ marginTop: 16, fontSize: 13 }}>
          Don't see your program? Contact your instructor or
          <a href="mailto:support@kingmaker.consulting">
            {' '}
            support@kingmaker.consulting
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// AwaitingApprovalScreen
// ---------------------------------------------------------------------------

function AwaitingApprovalScreen({
  token,
  pendingOrgName,
  onCancelled,
  onApproved,
  onLogout,
}) {
  const [error, setError] = useState(null);
  useEffect(() => {
    let alive = true;
    async function poll() {
      try {
        const r = await authFetch('/api/me/membership-request', token);
        const data = await r.json();
        if (!alive) return;
        if (data.account_status === 'active') onApproved?.(data);
        else if (data.account_status === 'denied') onApproved?.(data);
      } catch (e) {
        if (alive) setError('Could not check status.');
      }
    }
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [token, onApproved]);

  async function cancel() {
    try {
      await authFetch('/api/me/membership-request', token, {
        method: 'DELETE',
      });
      onCancelled?.();
    } catch (e) {
      setError('Could not cancel request.');
    }
  }

  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card">
        <h1>Waiting for approval</h1>
        <p>
          Your request to join{' '}
          <strong>{pendingOrgName || 'your program'}</strong> has been sent. The
          program admin will review and approve your access.
        </p>
        <p className="muted">
          We refresh your status every 30 seconds. You can leave this page open.
        </p>
        {error && <div className="onboarding-error">{error}</div>}
        <div className="onboarding-actions">
          <button type="button" className="btn-secondary" onClick={cancel}>
            Pick a different program
          </button>
          <button type="button" className="btn-link" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeniedScreen / ArchivedScreen
// ---------------------------------------------------------------------------

function DeniedScreen({ token, onRetry, onLogout }) {
  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card">
        <h1>Access not granted</h1>
        <p>
          Your access request was not approved. If you believe this is a
          mistake, contact your program coordinator.
        </p>
        <div className="onboarding-actions">
          <button type="button" className="btn-primary" onClick={onRetry}>
            Request a different program
          </button>
          <button type="button" className="btn-link" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function ArchivedScreen({ onLogout }) {
  return (
    <div className="onboarding-wrap">
      <div className="onboarding-card">
        <h1>This account has been archived</h1>
        <p>
          Your previous account data has been securely archived as part of our
          program upgrade. To regain access, please contact
          <a href="mailto:support@kingmaker.consulting">
            {' '}
            support@kingmaker.consulting
          </a>
          .
        </p>
        <div className="onboarding-actions">
          <button type="button" className="btn-link" onClick={onLogout}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OnboardingTour \u2014 4 modal steps for newly-active students
// ---------------------------------------------------------------------------

const TOUR_STEPS = [
  {
    title: 'Welcome to your GED prep workspace',
    body: 'You\u2019re in! This walkthrough takes about a minute. We\u2019ll cover test dates, your diagnostic, and where to find each subject.',
  },
  {
    title: 'When are you testing?',
    body: 'Add any test dates you already know. We use these to pace your study plan.',
    custom: 'test-dates',
  },
  {
    title: 'Start with the diagnostic',
    body: 'A short adaptive diagnostic gives us your starting strengths and gaps. Plan on about 30 minutes.',
  },
  {
    title: 'You\u2019re all set',
    body: 'Use the tabs to switch between subjects, full exams, the AI coach, and your dashboard. Good luck!',
  },
];

function OnboardingTour({ token, initialState, onComplete }) {
  const [step, setStep] = useState(0);
  const [testDates, setTestDates] = useState(
    () => initialState?.test_dates || {}
  );
  const [busy, setBusy] = useState(false);

  async function persistTestDates() {
    if (!Object.keys(testDates || {}).length) return;
    try {
      await authFetch('/api/me/onboarding', token, {
        method: 'PATCH',
        body: JSON.stringify({ test_dates: testDates }),
      });
    } catch (_) {
      /* non-fatal */
    }
  }

  async function complete() {
    setBusy(true);
    try {
      await persistTestDates();
      await authFetch('/api/me/onboarding', token, {
        method: 'PATCH',
        body: JSON.stringify({
          onboarding_state: {
            tour_completed: true,
            tour_completed_at: new Date().toISOString(),
          },
        }),
      });
    } catch (_) {}
    setBusy(false);
    onComplete?.();
  }

  const cur = TOUR_STEPS[step];
  const last = step === TOUR_STEPS.length - 1;
  return (
    <div className="onboarding-wrap onboarding-tour">
      <div className="onboarding-card">
        <div className="tour-progress">
          Step {step + 1} of {TOUR_STEPS.length}
        </div>
        <h2>{cur.title}</h2>
        <p>{cur.body}</p>
        {cur.custom === 'test-dates' && (
          <div className="tour-test-dates">
            {['rla', 'math', 'science', 'social_studies'].map((subj) => {
              const raw = testDates?.[subj] || '';
              // Status:
              //   'passed'    -> raw === 'passed'
              //   'scheduled' -> raw is 'scheduled' (just picked, no date yet)
              //                  OR raw is a YYYY-MM-DD date string
              //   'none'      -> anything else (raw === '' or 'none')
              let status;
              if (raw === 'passed') status = 'passed';
              else if (raw === 'scheduled' || /^\d{4}-\d{2}-\d{2}$/.test(raw))
                status = 'scheduled';
              else status = 'none';
              const isScheduled = status === 'scheduled';
              const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : '';
              const select = (val) => {
                if (val === 'scheduled') {
                  // Use a sentinel string until the user picks an actual date
                  // so the date input renders.
                  setTestDates({ ...testDates, [subj]: 'scheduled' });
                } else if (val === 'passed') {
                  setTestDates({ ...testDates, [subj]: 'passed' });
                } else {
                  setTestDates({ ...testDates, [subj]: 'none' });
                }
              };
              return (
                <div key={subj} className="tour-date-row">
                  <span>{subj.replace('_', ' ').toUpperCase()}</span>
                  <div className="tour-date-controls">
                    <select
                      className="tour-date-status"
                      value={status}
                      onChange={(e) => select(e.target.value)}
                    >
                      <option value="none">Not scheduled</option>
                      <option value="scheduled">Scheduled…</option>
                      <option value="passed">Already passed</option>
                    </select>
                    {isScheduled && (
                      <input
                        type="date"
                        value={dateValue}
                        onChange={(e) => {
                          const next = e.target.value;
                          setTestDates({
                            ...testDates,
                            // If they clear the date, fall back to the
                            // scheduled sentinel so the input stays visible.
                            [subj]: next || 'scheduled',
                          });
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="onboarding-actions">
          {step > 0 && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {!last && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {last && (
            <button
              type="button"
              className="btn-primary"
              disabled={busy}
              onClick={complete}
            >
              {busy ? 'Saving...' : 'Start learning'}
            </button>
          )}
          <button type="button" className="btn-link" onClick={complete}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OnboardingGate \u2014 the orchestrator the host app renders
// ---------------------------------------------------------------------------

export function OnboardingGate({
  user,
  token,
  onLogout,
  onUserUpdated,
  children,
}) {
  const [internalUser, setInternalUser] = useState(user);
  useEffect(() => setInternalUser(user), [user]);

  const rawStatus = internalUser?.account_status || 'active';
  // A non-staff user without an organization_id must be treated as
  // pending_org regardless of what `account_status` says, so they
  // always see the program-pick wizard before reaching the app.
  const status =
    rawStatus === 'active' && !internalUser?.organization_id
      ? 'pending_org'
      : rawStatus;
  const tourDone = useMemo(() => {
    const s = internalUser?.onboarding_state;
    return !!(s && (s.tour_completed === true || s.tour_skipped === true));
  }, [internalUser]);

  if (status === 'pending_org') {
    return (
      <ProgramSelectWizard
        token={token}
        onSubmitted={async (postData) => {
          // The server now auto-admits every signed-in student to whichever
          // org they pick (no approval step). Use the POST response when
          // available, then refresh from the GET endpoint so we pick up the
          // resolved organization_id and account_status.
          try {
            const r = await authFetch('/api/me/membership-request', token);
            const d = await r.json();
            const next = {
              ...internalUser,
              account_status: d.account_status,
              organization_id:
                d.organization_id ??
                postData?.organization_id ??
                internalUser?.organization_id ??
                null,
              pending_organization_id: d.pending_organization_id,
            };
            setInternalUser(next);
            onUserUpdated?.(next);
          } catch (_) {
            // Fallback: trust the POST response.
            const next = {
              ...internalUser,
              account_status:
                postData?.account_status ||
                (postData?.auto_admitted ? 'active' : 'pending_approval'),
              organization_id:
                postData?.organization_id ?? internalUser?.organization_id,
            };
            setInternalUser(next);
            onUserUpdated?.(next);
          }
        }}
      />
    );
  }

  if (status === 'pending_approval') {
    return (
      <AwaitingApprovalScreen
        token={token}
        pendingOrgName={internalUser?.pending_organization_name}
        onCancelled={() => {
          const next = {
            ...internalUser,
            account_status: 'pending_org',
            pending_organization_id: null,
          };
          setInternalUser(next);
          onUserUpdated?.(next);
        }}
        onApproved={(d) => {
          const next = {
            ...internalUser,
            account_status: d.account_status,
            organization_id: d.organization_id,
          };
          setInternalUser(next);
          onUserUpdated?.(next);
        }}
        onLogout={onLogout}
      />
    );
  }

  if (status === 'denied') {
    return (
      <DeniedScreen
        token={token}
        onRetry={() => {
          // Cancel-then-pick: move them back to pending_org so wizard renders.
          authFetch('/api/me/membership-request', token, {
            method: 'DELETE',
          }).finally(() => {
            const next = { ...internalUser, account_status: 'pending_org' };
            setInternalUser(next);
            onUserUpdated?.(next);
          });
        }}
        onLogout={onLogout}
      />
    );
  }

  if (status === 'archived') {
    return <ArchivedScreen onLogout={onLogout} />;
  }

  // status === 'active' \u2014 maybe show the tour, then render the host app.
  if (!tourDone) {
    return (
      <OnboardingTour
        token={token}
        initialState={internalUser}
        onComplete={() => {
          const next = {
            ...internalUser,
            onboarding_state: {
              ...(internalUser?.onboarding_state || {}),
              tour_completed: true,
            },
          };
          setInternalUser(next);
          onUserUpdated?.(next);
        }}
      />
    );
  }

  return children;
}

export default OnboardingGate;
