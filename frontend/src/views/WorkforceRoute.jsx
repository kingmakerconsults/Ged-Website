import React, { Suspense, lazy, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformHeader from '../../components/layout/PlatformHeader.jsx';

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
        parsed?.id || parsed?.userId || parsed?.email || parsed?.name || null;
      if (id) return String(id);
    }
  } catch (_) {}
  return 'anon';
}

class WorkforceErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[WorkforceRoute] render error:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-8 max-w-2xl mx-auto text-primary">
          <h1 className="text-2xl font-bold mb-3">
            Workforce Hub failed to load
          </h1>
          <pre className="whitespace-pre-wrap text-sm bg-surface p-3 rounded border border-subtle">
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          <a
            href="/?nav=dashboard"
            className="mt-4 inline-block px-4 py-2 rounded bg-blue-600 text-white no-underline"
          >
            Back to dashboard
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function WorkforceRoute() {
  const userId = useMemo(readUserId, []);
  const navigate = useNavigate();
  const goHome = useCallback(() => {
    navigate('/?nav=dashboard');
  }, [navigate]);
  return (
    <div className="min-h-screen bg-page text-primary">
      <PlatformHeader />
      <WorkforceErrorBoundary>
        <Suspense
          fallback={
            <div className="p-8 text-center text-primary">
              Loading Workforce Hub…
            </div>
          }
        >
          <WorkforceHub userId={userId} onBack={goHome} />
        </Suspense>
      </WorkforceErrorBoundary>
    </div>
  );
}
