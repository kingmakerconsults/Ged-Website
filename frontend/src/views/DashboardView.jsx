import React from 'react';

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p className="text-gray-700 dark:text-gray-300">
        Welcome to your learning dashboard.
      </p>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Tip: Subject questions load on demand to keep the app fast.
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Play Together</h3>
        <a
          href="/collab"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/collab');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="block p-4 rounded-xl border border-purple-300 dark:border-purple-700 shadow-sm hover:shadow-md transition bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 text-slate-900 dark:text-white"
        >
          <div className="font-bold">🎯 Live Collaboration</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Take a quiz with your instructor, partner up with a classmate, or
            write an essay together.
          </div>
        </a>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Social Studies Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#/tools/constitution-explorer"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/tools/constitution-explorer');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
          >
            <div className="font-bold">
              Constitution Explorer — “Rights Arbitrator”
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Match real-world scenarios to constitutional amendments.
            </div>
          </a>

          <a
            href="#/tools/economics-market-simulator"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(
                {},
                '',
                '/tools/economics-market-simulator'
              );
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition bg-white text-slate-900 dark:bg-slate-800 dark:text-white"
          >
            <div className="font-bold">
              Market Simulator — “Supply & Demand Trainer”
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              Shift the curves to model real economics events.
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
