const { useState, useEffect, useMemo } = React;

// Access constants from window.SubjectVisuals
const SubjectVisuals = window.SubjectVisuals || {};
const {
  SUBJECT_NAMES,
  SUBJECT_COLORS,
  SUBJECT_BG_GRADIENTS,
  SUBJECT_LIGHT_TINTS,
  SUBJECT_LIGHT_SURFACE_GRADIENTS,
} = SubjectVisuals;

function ProfileView({
  loading,
  error,
  data,
  nameDraft,
  onNameDraftChange,
  onSubmitName,
  nameSaving,
  nameStatus,
  onRefresh,
  onBack,
  onSaveAll,
  savingAll,
  subjectEdits,
  onSubjectFieldChange,
  onSubjectSave,
  testSaving,
  onToggleChallenge,
  onSaveChallenges,
  challengesSaving,
  onFinishOnboarding,
  onCompleteLater,
  finishingOnboarding,
  onboardingComplete,
}) {
  const profile = data?.profile || {};
  const challengeOptions = Array.isArray(data?.challengeOptions)
    ? data.challengeOptions
    : [];
  const totalChallenges = challengeOptions.length;
  const recentSummary = data?.recentScoresDashboard || {};
  const legacyScores = data?.scores || {};
  const SUBJECT_ORDER = useMemo(() => [...SUBJECT_NAMES], []);
  const rawTestPlan = Array.isArray(data?.testPlan) ? data.testPlan : [];
  const normalizedTestPlan = useMemo(() => {
    const map = new Map();
    rawTestPlan.forEach((entry) => {
      if (!entry || !entry.subject) {
        return;
      }
      const subject = String(entry.subject);
      map.set(subject, {
        subject,
        testDate: entry.testDate || '',
        testLocation: entry.testLocation || '',
        passed: !!entry.passed,
        notScheduled: !!entry.notScheduled,
        daysUntil: entry.daysUntil ?? null,
      });
    });
    SUBJECT_ORDER.forEach((subject) => {
      if (!map.has(subject)) {
        map.set(subject, {
          subject,
          testDate: '',
          testLocation: '',
          passed: false,
          notScheduled: false,
          daysUntil: null,
        });
      }
    });
    const orderedSubjects = [
      ...SUBJECT_ORDER,
      ...Array.from(map.keys()).filter(
        (subject) => !SUBJECT_ORDER.includes(subject)
      ),
    ];
    const seen = new Set();
    const result = [];
    orderedSubjects.forEach((subject) => {
      if (!seen.has(subject) && map.has(subject)) {
        result.push(map.get(subject));
        seen.add(subject);
      }
    });
    map.forEach((value, subject) => {
      if (!seen.has(subject)) {
        result.push(value);
      }
    });
    return result;
  }, [rawTestPlan, SUBJECT_ORDER]);

  const nextUpcoming = data?.nextUpcomingTest || null;
  const formatDayCount = (value) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return null;
    }
    const rounded = Math.max(0, Math.floor(value));
    return `${rounded} day${rounded === 1 ? '' : 's'}`;
  };
  const nextUpcomingDaysText = formatDayCount(nextUpcoming?.daysUntil);
  const nextUpcomingSummary =
    nextUpcoming && nextUpcoming.testDate
      ? `Next test: ${nextUpcoming.subject} on ${nextUpcoming.testDate}${
          nextUpcomingDaysText ? ` (${nextUpcomingDaysText})` : ''
        }`
      : 'No test scheduled yet.';

  const selectedFromServer = useMemo(
    () => challengeOptions.filter((opt) => opt.selected).map((opt) => opt.id),
    [challengeOptions]
  );
  const [selectedIds, setSelectedIds] = useState(selectedFromServer);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  useEffect(() => {
    setSelectedIds(selectedFromServer);
  }, [selectedFromServer]);

  const groupedChallenges = useMemo(() => {
    const grouped = {};
    challengeOptions.forEach((opt) => {
      const subjectKey = opt.subject || 'Other';
      const subtopicKey = opt.subtopic || 'General';
      if (!grouped[subjectKey]) {
        grouped[subjectKey] = {};
      }
      if (!grouped[subjectKey][subtopicKey]) {
        grouped[subjectKey][subtopicKey] = [];
      }
      grouped[subjectKey][subtopicKey].push(opt);
    });
    return grouped;
  }, [challengeOptions]);

  const selectedCount = selectedIds.length;
  const highlightName = !onboardingComplete && !profile.name;
  const hasAnyTestProgress = normalizedTestPlan.some(
    (entry) => entry.passed || entry.notScheduled || entry.testDate
  );
  const highlightTest = !onboardingComplete && !hasAnyTestProgress;
  const highlightChallenges = !onboardingComplete && selectedCount === 0;

  const handleChallengeToggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return Array.from(next);
    });
    onToggleChallenge?.(id);
  };

  const handleChallengesSubmit = (event) => {
    event.preventDefault();
    onSaveChallenges?.();
  };

  const handleBackClick = () => {
    // Allow returning to dashboard even if onboarding is pending
    onBack?.();
  };

  const timezoneLabel = profile.timezone || 'America/New_York';
  const reminderLabel = profile.reminderEnabled === false ? 'Off' : 'On';

  return (
    <section
      id="profileView"
      data-view="profile"
      tabIndex={-1}
      className="outline-none"
    >
      <div className="max-w-4xl mx-auto space-y-6 settings-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between settings-header">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-sm">
              Profile
            </h1>
            <p className="text-sm text-slate-500">
              Update your learning plan and keep your information in sync.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onRefresh}
              className="refresh-button inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button
              type="button"
              onClick={onSaveAll}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={!!savingAll}
            >
              {savingAll ? 'Saving…' : 'Save All'}
            </button>
            <button
              type="button"
              onClick={handleBackClick}
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {error && !loading && (
          <div
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
            role="alert"
          >
            {error}
          </div>
        )}

        {!onboardingComplete && (
          <div
            className="onboarding-banner"
            style={{
              border: '1px solid #f6c',
              background: '#fff0f6',
              padding: '1rem',
              borderRadius: '0.5rem',
            }}
          >
            <strong>Welcome!</strong> Before we start, fill this out so we can
            build you a plan:
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1 mt-2">
              <li>Pick the areas you struggle with</li>
              <li>Set your test date (or mark "I passed")</li>
              <li>Choose a display name</li>
            </ol>
            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <button
                id="finishOnboardingBtn"
                type="button"
                onClick={onFinishOnboarding}
                className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
                disabled={finishingOnboarding}
              >
                {finishingOnboarding ? 'Checking…' : "I'm Done"}
              </button>
              <button
                id="completeLaterBtn"
                type="button"
                onClick={onCompleteLater}
                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                aria-label="Skip onboarding for now"
              >
                Complete Later
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={onSubmitName}
          className={`rounded-2xl border bg-white/95 dark:bg-slate-950/70 dark:border-slate-700 p-5 shadow-sm space-y-4 ${
            highlightName
              ? 'border-rose-300 ring-1 ring-rose-200'
              : 'border-slate-200'
          }`}
          aria-labelledby="profile-name-heading"
        >
          <div>
            <h2
              id="profile-name-heading"
              className="text-xl font-semibold text-slate-800 dark:text-slate-100"
            >
              Display Name
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              This name appears across the app.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="w-full sm:flex-1">
              <span className="sr-only">Display name</span>
              <input
                type="text"
                value={nameDraft}
                onChange={(event) => onNameDraftChange(event.target.value)}
                maxLength={80}
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={nameSaving}
            >
              {nameSaving ? 'Saving…' : 'Save Name'}
            </button>
          </div>
          <p className="text-xs text-slate-500">Maximum 80 characters.</p>
          {nameStatus && (
            <p
              className="text-sm text-slate-600"
              role="status"
              aria-live="polite"
            >
              {nameStatus}
            </p>
          )}
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          <section
            id="organizationCard"
            className="rounded-2xl border bg-white/95 dark:bg-slate-950 dark:border-slate-700 p-5 shadow-sm space-y-4 col-span-2"
            aria-labelledby="profile-organization-heading"
          >
            <div>
              <h2
                id="profile-organization-heading"
                className="text-xl font-semibold text-slate-800 dark:text-slate-100"
              >
                Organization
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                This is the group or program you are enrolled in.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 p-4 flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {profile.organizationName ||
                    profile.organization_name ||
                    'No organization assigned'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {profile.organizationName || profile.organization_name
                    ? 'Provided by your administrator.'
                    : 'Ask your instructor for a join code if you should be in an organization.'}
                </p>
              </div>
            </div>
          </section>
          <section
            id="testPlanCard"
            className={`rounded-2xl border bg-white/95 dark:bg-slate-950 dark:border-slate-700 p-5 shadow-sm space-y-4 ${
              highlightTest
                ? 'border-rose-300 ring-1 ring-rose-200'
                : 'border-slate-200'
            }`}
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Upcoming Tests
            </h2>
            <div
              id="nextUpcomingSummary"
              className="note text-sm text-slate-600"
            >
              {nextUpcomingSummary}
            </div>
            <div id="testPlanList" className="grid gap-4 md:grid-cols-2">
              {normalizedTestPlan.length === 0 ? (
                <p className="col-span-full text-sm text-slate-500">
                  No subjects available yet.
                </p>
              ) : (
                normalizedTestPlan.map((entry) => {
                  const edits = (subjectEdits &&
                    subjectEdits[entry.subject]) || {
                    testDate: '',
                    testLocation: '',
                    passed: false,
                    notScheduled: false,
                  };
                  const savingThisSubject = testSaving === entry.subject;
                  const isNotScheduled =
                    typeof edits.notScheduled === 'boolean'
                      ? edits.notScheduled
                      : !!entry.notScheduled;
                  const countdownLabel = (() => {
                    if (isNotScheduled || !entry.testDate || edits.passed) {
                      return null;
                    }
                    if (entry.daysUntil != null) {
                      const value = entry.daysUntil;
                      return `${value} day${value === 1 ? '' : 's'} remaining`;
                    }
                    return 'Countdown not available';
                  })();

                  return (
                    <div
                      key={entry.subject}
                      className="subject-test-block profile-test-card rounded-xl border border-slate-200 bg-white/80 p-4 space-y-3 shadow-sm"
                    >
                      <h3 className="text-base font-semibold text-slate-700">
                        {entry.subject}
                      </h3>
                      <label className="flex flex-col gap-1 text-sm text-slate-600">
                        Date
                        <input
                          type="date"
                          className="tp-date profile-date-input rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          data-subject={entry.subject}
                          value={isNotScheduled ? '' : edits.testDate || ''}
                          onChange={(event) =>
                            onSubjectFieldChange?.(
                              entry.subject,
                              'testDate',
                              event.target.value
                            )
                          }
                          disabled={savingThisSubject || isNotScheduled}
                        />
                      </label>
                      <label className="inline-row checkbox-row flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          className="tp-not-scheduled h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          data-subject={entry.subject}
                          checked={!!isNotScheduled}
                          onChange={(event) =>
                            onSubjectFieldChange?.(
                              entry.subject,
                              'notScheduled',
                              event.target.checked
                            )
                          }
                          disabled={savingThisSubject}
                        />
                        <span>I have not scheduled this test yet</span>
                      </label>
                      <label className="flex flex-col gap-1 text-sm text-slate-600">
                        Location
                        <input
                          type="text"
                          className="tp-location rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                          placeholder="Test center (optional)"
                          data-subject={entry.subject}
                          value={edits.testLocation || ''}
                          onChange={(event) =>
                            onSubjectFieldChange?.(
                              entry.subject,
                              'testLocation',
                              event.target.value
                            )
                          }
                          disabled={savingThisSubject}
                        />
                      </label>
                      <label className="inline-row checkbox-row flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          className="tp-passed h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          data-subject={entry.subject}
                          checked={!!edits.passed}
                          onChange={(event) =>
                            onSubjectFieldChange?.(
                              entry.subject,
                              'passed',
                              event.target.checked
                            )
                          }
                          disabled={savingThisSubject}
                        />
                        <span>I already passed this subject</span>
                      </label>
                      <button
                        type="button"
                        className="btn tp-save inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
                        data-subject={entry.subject}
                        onClick={() => onSubjectSave?.(entry.subject)}
                        disabled={savingThisSubject}
                      >
                        {savingThisSubject
                          ? 'Saving…'
                          : `Save ${entry.subject}`}
                      </button>
                      {edits.passed ? (
                        <p className="text-xs text-emerald-600">
                          Great job! We marked this subject as passed.
                        </p>
                      ) : isNotScheduled ? (
                        <p className="text-xs text-slate-500">
                          We'll remind you to set a date when you're ready.
                        </p>
                      ) : countdownLabel ? (
                        <p className="text-xs text-slate-500">
                          {countdownLabel}
                        </p>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
            <p className="text-xs text-slate-500">
              Dates saved here will also appear on your dashboard.
            </p>
          </section>

          <article className="glass rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 p-5 shadow-lg space-y-3">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Preferences Snapshot
            </h2>
            <dl className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 pref-row dark:bg-slate-900/70">
                <dt className="font-medium text-slate-700 dark:text-slate-100">
                  Font Size
                </dt>
                <dd className="capitalize dark:text-slate-100">
                  {profile.fontSize || 'md'}
                </dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 pref-row dark:bg-slate-900/70">
                <dt className="font-medium text-slate-700 dark:text-slate-100">
                  Color Contrast
                </dt>
                <dd className="capitalize dark:text-slate-100">Automatic</dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 pref-row dark:bg-slate-900/70">
                <dt className="font-medium text-slate-700 dark:text-slate-100">
                  Timezone
                </dt>
                <dd className="dark:text-slate-100">{timezoneLabel}</dd>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 pref-row dark:bg-slate-900/70">
                <dt className="font-medium text-slate-700 dark:text-slate-100">
                  Test Reminders
                </dt>
                <dd className="dark:text-slate-100">{reminderLabel}</dd>
              </div>
            </dl>
            <p className="text-xs text-slate-500">
              Adjust these settings anytime from the Settings panel.
            </p>
          </article>
        </div>

        <form
          onSubmit={handleChallengesSubmit}
          className={`rounded-2xl border bg-white/95 dark:bg-slate-900/85 dark:text-slate-100 p-5 shadow-sm space-y-4 ${
            highlightChallenges
              ? 'border-rose-300 ring-1 ring-rose-200'
              : 'border-slate-200 dark:border-slate-700/60'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Learning Challenges
            </h2>
            <button
              type="button"
              onClick={() => setShowAllChallenges((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 challenges-toggle-btn"
              aria-expanded={showAllChallenges ? 'true' : 'false'}
              aria-controls="challengeList"
            >
              {showAllChallenges ? 'Collapse list' : 'Show all'}
              {totalChallenges ? ` (${totalChallenges})` : ''}
            </button>
          </div>
          <p className="text-sm text-slate-600 flex items-center">
            Select the areas you find tough. We'll use this later to build a
            study plan for you.
          </p>
          <div
            id="challengeList"
            className={`${
              showAllChallenges ? 'max-h-none' : 'max-h-64 overflow-y-auto'
            } rounded-lg border border-slate-200 p-2`}
          >
            {Object.keys(groupedChallenges).length === 0 ? (
              <p className="text-sm text-slate-500">
                No challenge options available yet.
              </p>
            ) : (
              Object.keys(groupedChallenges)
                .sort()
                .map((subject) => (
                  <div key={subject} className="mb-3">
                    <div className="challenge-subject font-semibold text-slate-700">
                      {subject}
                    </div>
                    {Object.keys(groupedChallenges[subject])
                      .sort()
                      .map((subtopic) => (
                        <div key={`${subject}-${subtopic}`} className="mt-1">
                          <div className="challenge-subtopic ml-4 text-sm italic text-slate-500">
                            {subtopic}
                          </div>
                          {groupedChallenges[subject][subtopic].map((opt) => {
                            const isChecked = selectedIds.includes(opt.id);
                            return (
                              <label
                                key={opt.id}
                                className={`ml-8 mt-2 flex items-start gap-2 text-sm rounded-md border px-2 py-1 transition ${
                                  isChecked
                                    ? 'bg-sky-50 border-sky-300 text-slate-700 shadow-sm'
                                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                                }`}
                                data-selected={isChecked ? 'true' : 'false'}
                              >
                                <input
                                  type="checkbox"
                                  className="challengeBox mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                  data-id={opt.id}
                                  checked={isChecked}
                                  onChange={() => handleChallengeToggle(opt.id)}
                                  aria-checked={isChecked}
                                  aria-label={
                                    opt.label || opt.subtopic || opt.subject
                                  }
                                />
                                <span>
                                  {opt.label || opt.subtopic || opt.subject}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      ))}
                  </div>
                ))
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Selected: {selectedCount}
              {totalChallenges ? ` / ${totalChallenges}` : ''}
            </p>
            <button
              id="saveChallengesBtn"
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={challengesSaving}
            >
              {challengesSaving ? 'Saving…' : 'Save Challenges'}
            </button>
          </div>
        </form>

        <RecentScoresPanel
          title="Recent Scores"
          summary={recentSummary}
          legacyScores={legacyScores}
          loading={loading}
        />
      </div>
    </section>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.ProfileView = ProfileView;
}
