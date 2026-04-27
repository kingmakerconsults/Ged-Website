/**
 * WorkforceView.jsx — routed entry for /workforce.
 * Renders the new WorkforceHub from frontend/components/workforce/.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkforceHub from '../../components/workforce/WorkforceHub.jsx';

export default function WorkforceView() {
  const navigate = useNavigate();
  let userId = 'anon';
  try {
    const u = JSON.parse(window.localStorage.getItem('appUser') || '{}');
    userId = u?.id || u?.email || u?.username || 'anon';
  } catch {
    /* ignore */
  }
  return (
    <div className="workforce-view min-h-screen p-4 sm:p-6 text-slate-900 dark:text-slate-100">
      <WorkforceHub userId={userId} onBack={() => navigate('/')} />
    </div>
  );
}
