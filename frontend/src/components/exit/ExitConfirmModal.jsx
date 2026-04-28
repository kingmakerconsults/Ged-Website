/**
 * ExitConfirmModal — typed warning before leaving an in-progress quiz/exam.
 *
 * kind:
 *   - 'standalone'    : score now and end (no resume)
 *   - 'comprehensive' : end+submit (no resume)
 *   - 'ai_topic'      : pause and resume within 24 hours
 *   - 'essay'         : unsaved text will be lost
 */
export default function ExitConfirmModal({ kind, onCancel, onConfirm }) {
  const config = (() => {
    switch (kind) {
      case 'comprehensive':
        return {
          title: 'Leave comprehensive exam?',
          body: 'Your exam will be ended and submitted with the answers you have so far. You will not be able to come back to this attempt.',
          confirmLabel: 'End exam',
          tone: 'danger',
        };
      case 'ai_topic':
        return {
          title: 'Pause smart quiz?',
          body: 'You can return to this quiz from your dashboard within 24 hours and pick up where you left off. While it is paused you cannot generate another quiz on the same topic.',
          confirmLabel: 'Pause and leave',
          tone: 'info',
        };
      case 'essay':
        return {
          title: 'Leave essay?',
          body: 'Your essay text will be lost — unsaved drafts cannot be recovered.',
          confirmLabel: 'Discard and leave',
          tone: 'danger',
        };
      case 'standalone':
      default:
        return {
          title: 'Leave quiz?',
          body: 'Your progress will be scored and ended. You will not be able to return to this attempt.',
          confirmLabel: 'End quiz',
          tone: 'warning',
        };
    }
  })();

  const confirmClass =
    config.tone === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : config.tone === 'info'
        ? 'bg-sky-600 hover:bg-sky-700 text-white'
        : 'bg-amber-600 hover:bg-amber-700 text-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-subtle p-5">
        <h2 className="text-lg font-bold text-primary">{config.title}</h2>
        <p className="mt-2 text-sm text-secondary">{config.body}</p>
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-subtle text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Stay
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-sm ${confirmClass}`}
          >
            {config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
