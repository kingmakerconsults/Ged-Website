/**
 * TaskList.jsx — checklist-style "task runner" used by sims.
 *
 * Each task: { id, instruction, hint? }. Module code calls
 * `markComplete(taskId)` when the user successfully performs the action.
 * Component shows progress + a Hint affordance.
 */
import React from 'react';

export default function TaskList({ tasks, completed, onHint }) {
  const total = tasks.length;
  const done = tasks.filter((t) => completed.has(t.id)).length;
  return (
    <aside
      className="task-list rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-sm"
      aria-label="Tasks"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200">
          Your tasks
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
          aria-live="polite"
        >
          {done}/{total}
        </span>
      </div>
      <ol className="space-y-2">
        {tasks.map((t, i) => {
          const isDone = completed.has(t.id);
          return (
            <li
              key={t.id}
              className={`flex items-start gap-2 ${
                isDone
                  ? 'text-slate-500 line-through'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                  isDone
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </span>
              <div className="flex-1">
                <div>{t.instruction}</div>
                {t.hint && !isDone ? (
                  <button
                    type="button"
                    onClick={() => onHint?.(t)}
                    className="mt-1 text-xs text-teal-700 dark:text-teal-300 underline"
                  >
                    Hint
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
