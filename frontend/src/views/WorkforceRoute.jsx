import React, { Suspense, lazy, useMemo } from 'react';

const WorkforceHub = lazy(
  () => import('../../components/workforce/WorkforceHub.jsx')
);

function readUserId() {
  if (typeof window === 'undefined') return 'anon';
  try {
    const raw = window.localStorage.getItem('appUser');
    if (raw) {
      const parsed = JSON.parse(raw);
      const id =
        parsed?.id ||
        parsed?.userId ||
        parsed?.email ||
        parsed?.name ||
        null;
      if (id) return String(id);
    }
  } catch (_) {}
  return 'anon';
}

export default function WorkforceRoute() {
  const userId = useMemo(readUserId, []);
  const goHome = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };
  return (
    <div className="min-h-screen bg-page text-primary">
      <Suspense
        fallback={
          <div className="p-8 text-center text-primary">
            Loading Workforce Hub…
          </div>
        }
      >
        <WorkforceHub userId={userId} onBack={goHome} />
      </Suspense>
    </div>
  );
}
