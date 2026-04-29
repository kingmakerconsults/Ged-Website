import React from 'react';

function pct(part, total) {
  if (!total) return 0;
  return Math.round((Number(part) / Number(total)) * 100);
}

function formatDate(value) {
  if (!value) return 'No date set';
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return String(value);
  }
}

function titleForActivity(type) {
  return String(type || 'activity')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function Metric({ label, value, subtext }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      {subtext ? (
        <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {subtext}
        </div>
      ) : null}
    </div>
  );
}

export default function ProgramDashboard({
  overview,
  loading,
  error,
  syncAvailable,
  onCreatePlan,
  onRefresh,
  onOpenSection,
  onCompleteMilestone,
  actionBusy,
}) {
  const activePlan = overview?.activePlan || null;
  const milestones = activePlan?.milestones || [];
  const completed = milestones.filter(
    (item) => item.status === 'completed'
  ).length;
  const completionPct = pct(completed, milestones.length);
  const interviewSummary = overview?.interviewSummary || {};
  const recentActivity = Array.isArray(overview?.recentActivity)
    ? overview.recentActivity.slice(0, 5)
    : [];
  const artifactCount = Array.isArray(overview?.artifactSummary)
    ? overview.artifactSummary.reduce(
        (total, row) => total + (Number(row.count) || 0),
        0
      )
    : 0;

  if (!syncAvailable) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Self-paced workforce practice
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Sign in to sync plans, milestones, interview history, and
              instructor goals across the program.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenSection?.('interview')}
            className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Open Interview Studio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide font-bold text-teal-700 dark:text-teal-300">
            Program dashboard
          </div>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">
            {activePlan?.name || 'Workforce readiness plan'}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {activePlan
              ? `${completed}/${milestones.length} milestones complete. Target: ${formatDate(
                  activePlan.target_date
                )}.`
              : 'Create a self-paced plan now, or use one your instructor assigns later.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading || actionBusy}
            className="rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-50"
          >
            Refresh
          </button>
          {!activePlan ? (
            <button
              type="button"
              onClick={onCreatePlan}
              disabled={loading || actionBusy}
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
            >
              Start Plan
            </button>
          ) : null}
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-100">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Metric
          label="Milestones"
          value={`${completionPct}%`}
          subtext={`${completed}/${milestones.length || 0} complete`}
        />
        <Metric
          label="Mock interviews"
          value={interviewSummary.completed_sessions || 0}
          subtext={`${interviewSummary.total_sessions || 0} total sessions`}
        />
        <Metric
          label="Saved artifacts"
          value={artifactCount}
          subtext="Documents, notes, and evidence"
        />
      </div>

      {loading ? (
        <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-4 text-sm text-slate-500">
          Loading workforce program...
        </div>
      ) : activePlan ? (
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">
                Current milestones
              </h4>
              <div className="h-2 w-28 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-teal-600"
                  style={{ width: `${completionPct}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>
            <ol className="space-y-2">
              {milestones.map((milestone) => {
                const done = milestone.status === 'completed';
                return (
                  <li
                    key={milestone.id}
                    className="rounded-md border border-slate-200 dark:border-slate-700 p-3"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {milestone.title}
                        </div>
                        {milestone.description ? (
                          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                            {milestone.description}
                          </p>
                        ) : null}
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {done
                            ? 'Completed'
                            : milestone.status.replace(/_/g, ' ')}
                          {milestone.target_date
                            ? ` - Due ${formatDate(milestone.target_date)}`
                            : ''}
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        {milestone.section_id ? (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenSection?.(milestone.section_id)
                            }
                            className="rounded-md border border-slate-300 dark:border-slate-600 px-2.5 py-1.5 text-xs font-semibold"
                          >
                            Open
                          </button>
                        ) : null}
                        {!done ? (
                          <button
                            type="button"
                            onClick={() =>
                              onCompleteMilestone?.(activePlan.id, milestone.id)
                            }
                            disabled={actionBusy}
                            className="rounded-md bg-teal-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Mark Done
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-4">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              Recent activity
            </h4>
            {recentActivity.length ? (
              <ul className="mt-3 space-y-2">
                {recentActivity.map((event) => (
                  <li key={event.id} className="text-sm">
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      {titleForActivity(event.activity_type)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(event.occurred_at)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Activity will appear here as students complete tools and
                interviews.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-4 text-sm text-slate-600 dark:text-slate-300">
          No active workforce plan yet.
        </div>
      )}
    </section>
  );
}
