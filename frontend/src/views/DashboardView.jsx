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
        <h3 className="text-lg font-semibold mb-3">Social Studies Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#/tools/constitution-explorer"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/tools/constitution-explorer');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: '#1f2937',
            }}
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
            className="block p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              color: '#1f2937',
            }}
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
