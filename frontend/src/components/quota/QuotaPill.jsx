import { useCallback, useEffect, useState } from 'react';

const POLL_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

const KIND_LABELS = {
  comprehensive: 'exams',
  ai_topic: 'quizzes',
};

function authHeaders() {
  let token = null;
  try {
    token = window.localStorage?.getItem('appToken') || null;
  } catch {}
  const h = { Accept: 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/**
 * QuotaPill — header chip showing today's remaining generation budget.
 * Polls /api/me/quota on mount, every 5 minutes, on focus, and whenever
 * the parent emits a custom `quota:refresh` event on `window`.
 */
export default function QuotaPill({ refreshKey = 0 }) {
  const [state, setState] = useState(null);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/me/quota', {
        method: 'GET',
        credentials: 'include',
        headers: authHeaders(),
      });
      if (!res.ok) return;
      const json = await res.json();
      setState(json || null);
    } catch {
      // silent: header pill never blocks UI
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') load();
    };
    const onCustom = () => load();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('quota:refresh', onCustom);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('quota:refresh', onCustom);
    };
  }, [load, refreshKey]);

  if (!state || !state.kinds) return null;

  const comp = state.kinds.comprehensive || { remaining: 0, total: 0 };
  const ai = state.kinds.ai_topic || { remaining: 0, total: 0 };
  const allOut = comp.remaining === 0 && ai.remaining === 0;
  const anyOut = comp.remaining === 0 || ai.remaining === 0;

  const tone = allOut
    ? 'border-amber-400 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200'
    : anyOut
      ? 'border-amber-300 bg-amber-50/60 text-amber-900 dark:bg-amber-900/15 dark:text-amber-200'
      : 'border-slate-300 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Today's remaining generations. Resets at midnight UTC."
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition hover:shadow ${tone}`}
        aria-label={`Remaining today: ${comp.remaining} comprehensive exams, ${ai.remaining} smart quizzes`}
      >
        <span aria-hidden="true">⏱</span>
        <span>
          {comp.remaining}/{comp.total} {KIND_LABELS.comprehensive}
        </span>
        <span className="opacity-50">·</span>
        <span>
          {ai.remaining}/{ai.total} {KIND_LABELS.ai_topic}
        </span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            className="absolute right-0 mt-2 w-72 rounded-xl border border-subtle bg-white p-3 text-sm shadow-lg z-50 dark:bg-slate-900"
          >
            <div className="font-semibold text-primary mb-1">
              Today's generations
            </div>
            <ul className="space-y-1.5">
              <li className="flex items-center justify-between">
                <span>Comprehensive exams</span>
                <span className="font-mono">
                  {comp.used}/{comp.total}
                  {comp.granted_bonus ? ` (+${comp.granted_bonus})` : ''}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Smart quizzes</span>
                <span className="font-mono">
                  {ai.used}/{ai.total}
                  {ai.granted_bonus ? ` (+${ai.granted_bonus})` : ''}
                </span>
              </li>
            </ul>
            {allOut ? (
              <p className="mt-2 text-xs text-amber-800 dark:text-amber-300">
                You're out for today. Ask your instructor for more attempts —
                quotas reset at midnight UTC.
              </p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                Resets at midnight UTC.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
