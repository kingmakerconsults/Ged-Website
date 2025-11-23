import React from 'react';

export default function DashboardView() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p className="text-gray-700">Welcome to your learning dashboard.</p>
      <div className="text-sm text-gray-600">
        Tip: Subject questions load on demand to keep the app fast.
      </div>
    </div>
  );
}
