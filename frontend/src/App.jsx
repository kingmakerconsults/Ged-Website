import React, { useState, useEffect, Suspense, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  PREMADE_QUIZ_CATALOG,
  assignPremadeQuizCodes,
} from '../utils/quizProgress.js';
import { useThemeController } from '../hooks/useThemeController.js';
import { AuthScreen } from '../components/index.js';
import DashboardView from './views/DashboardView.jsx';
import SocialStudiesView from './views/SocialStudiesView.jsx';
import SuperAdminAllQuestions from './views/SuperAdminAllQuestions.jsx';
import AdminStudentsView from './views/AdminStudentsView.jsx';
import AdminStudentDetailView from './views/AdminStudentDetailView.jsx';
import AdminReportsView from './views/AdminReportsView.jsx';
import ConstitutionExplorer from '../../tools/ConstitutionExplorer.jsx';
import EconomicsGraphTool from '../../tools/EconomicsGraphTool.jsx';
import MapExplorer from '../../tools/MapExplorer.jsx';
import CivicsReasoningLab from '../../tools/CivicsReasoningLab.jsx';
import HistoryTimelineBuilder from '../../tools/HistoryTimelineBuilder.jsx';
import ElectoralCollegeSimulator from '../../tools/ElectoralCollegeSimulator.jsx';
import ProfileView from './views/ProfileView.jsx';
import SettingsView from './views/SettingsView.jsx';
import QuizDemo from './views/QuizDemo.jsx';
import OnboardingAccountView from './views/onboarding/OnboardingAccountView.jsx';
import OnboardingDiagnosticSelector from './views/onboarding/OnboardingDiagnosticSelector.jsx';
import OnboardingDiagnosticComposite from './views/onboarding/OnboardingDiagnosticComposite.jsx';
import OnboardingDiagnosticSubject from './views/onboarding/OnboardingDiagnosticSubject.jsx';
import OnboardingComplete from './views/onboarding/OnboardingComplete.jsx';
import LocalQuizRunner from './views/onboarding/LocalQuizRunner.jsx';
import { getApiBaseUrl } from './utils/apiBase.js';
const QuizInterface = React.lazy(() =>
  import('../components/quiz/QuizInterface.jsx').then((m) => ({
    default: m.QuizInterface,
  }))
);
// Dynamic loaders register global datasets on demand (window.QuestionLoaders)
import './loaders/questions.js';

function initPremades(source) {
  const catalog = source ? assignPremadeQuizCodes(source) : {};
  Object.assign(PREMADE_QUIZ_CATALOG, catalog);
  if (typeof window !== 'undefined') {
    window.PREMADE_QUIZ_CATALOG = PREMADE_QUIZ_CATALOG;
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [onboardingState, setOnboardingState] = useState(null);
  const [token, setToken] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const { theme, toggleTheme } = useThemeController();
  const apiBase = useMemo(() => getApiBaseUrl(), []);

  useEffect(() => {
    // Initialize premade quizzes once data is available.
    // Prefer backend catalog so the full question pool is available for general quizzes.
    (async () => {
      try {
        const apiBase =
          typeof window !== 'undefined' && window.API_BASE_URL
            ? String(window.API_BASE_URL)
            : '';
        const res = await fetch(`${apiBase}/api/all-quizzes`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const catalog = await res.json();
          if (typeof window !== 'undefined') {
            window.PREMADE_SOURCE_DATA = catalog;
          }
          initPremades(catalog);
          setReady(true);
          return;
        }
      } catch (_) {}

      initPremades(
        typeof window !== 'undefined' ? window.PREMADE_SOURCE_DATA : null
      );
      setReady(true);
    })();
  }, []);

  if (!ready) return <div className="p-4">Loading...</div>;

  // Show auth screen if no user logged in
  if (!user) {
    return (
      <AuthScreen
        onLogin={(loggedInUser, token) => {
          setUser(loggedInUser);
          if (token) {
            localStorage.setItem('token', token);
            setToken(token);
          }
          console.log('User logged in:', loggedInUser);
        }}
      />
    );
  }

  const OnboardingGate = ({ children }) => {
    const location = useLocation();
    if (!onboardingState) return <div className="p-4">Loading...</div>;
    if (
      !onboardingState.onboarding_completed &&
      !location.pathname.startsWith('/onboarding')
    ) {
      const step = onboardingState.onboarding_step || 'account';
      const target =
        step === 'diagnostic'
          ? '/onboarding/diagnostic'
          : '/onboarding/account';
      return <Navigate to={target} replace />;
    }
    return children;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!user) return;
      try {
        const res = await fetch(`${apiBase}/api/onboarding/state`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        if (!res.ok) {
          if (mounted) setOnboardingState({ onboarding_completed: true });
          return;
        }
        const data = await res.json();
        if (mounted) setOnboardingState(data);
      } catch (_) {
        if (mounted) setOnboardingState({ onboarding_completed: true });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase, token, user]);

  return (
    <BrowserRouter>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mr. Smith's Learning Canvas</h1>
          <div className="space-x-2">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Toggle Theme
            </button>
            <button
              onClick={() => setUser(null)}
              className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Log Out
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">Current theme: {theme}</p>

        <nav className="flex gap-4 mb-6 text-blue-600 underline">
          <Link to="/">Dashboard</Link>
          <Link to="/social-studies">Social Studies</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/demo/math">Math Quiz Demo</Link>
          {['org_admin', 'super_admin', 'instructor', 'admin'].includes(
            user?.role
          ) && (
            <>
              <Link to="/admin/students">Students</Link>
              <Link to="/admin/reports">Reports</Link>
            </>
          )}
          {user?.role === 'super_admin' && (
            <Link to="/super-admin/all-questions">All Questions</Link>
          )}
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/onboarding/account"
              element={
                <OnboardingAccountView user={onboardingState?.user || user} />
              }
            />
            <Route
              path="/onboarding/diagnostic"
              element={<OnboardingDiagnosticSelector />}
            />
            <Route
              path="/onboarding/diagnostic/composite"
              element={<OnboardingDiagnosticComposite />}
            />
            <Route
              path="/onboarding/diagnostic/subject/:subject"
              element={<OnboardingDiagnosticSubject />}
            />
            <Route
              path="/onboarding/complete"
              element={<OnboardingComplete />}
            />
            <Route
              path="/quiz/local-diagnostic"
              element={<LocalQuizRunner />}
            />

            <Route
              path="/"
              element={
                <OnboardingGate>
                  <DashboardView />
                </OnboardingGate>
              }
            />
            <Route
              path="/social-studies"
              element={
                <OnboardingGate>
                  <SocialStudiesView />
                </OnboardingGate>
              }
            />
            <Route
              path="/profile"
              element={
                <OnboardingGate>
                  <ProfileView />
                </OnboardingGate>
              }
            />
            <Route
              path="/settings"
              element={
                <OnboardingGate>
                  <SettingsView />
                </OnboardingGate>
              }
            />
            <Route
              path="/demo/math"
              element={
                <OnboardingGate>
                  <QuizDemo />
                </OnboardingGate>
              }
            />
            <Route
              path="/admin/students"
              element={
                ['org_admin', 'super_admin', 'instructor', 'admin'].includes(
                  user?.role
                ) ? (
                  <OnboardingGate>
                    <AdminStudentsView />
                  </OnboardingGate>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/admin/students/:id"
              element={
                ['org_admin', 'super_admin', 'instructor', 'admin'].includes(
                  user?.role
                ) ? (
                  <OnboardingGate>
                    <AdminStudentDetailView />
                  </OnboardingGate>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/admin/reports"
              element={
                ['org_admin', 'super_admin', 'instructor', 'admin'].includes(
                  user?.role
                ) ? (
                  <OnboardingGate>
                    <AdminReportsView />
                  </OnboardingGate>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/super-admin/all-questions"
              element={
                user?.role === 'super_admin' ? (
                  <OnboardingGate>
                    <SuperAdminAllQuestions />
                  </OnboardingGate>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/tools/constitution-explorer"
              element={
                <OnboardingGate>
                  <ConstitutionExplorer onExit={() => window.history.back()} />
                </OnboardingGate>
              }
            />
            <Route
              path="/tools/economics-market-simulator"
              element={
                <OnboardingGate>
                  <EconomicsGraphTool onExit={() => window.history.back()} />
                </OnboardingGate>
              }
            />
            <Route
              path="/tools/map-explorer"
              element={
                <OnboardingGate>
                  <MapExplorer onExit={() => window.history.back()} />
                </OnboardingGate>
              }
            />
            <Route
              path="/tools/civics-reasoning"
              element={
                <OnboardingGate>
                  <CivicsReasoningLab onExit={() => window.history.back()} />
                </OnboardingGate>
              }
            />
            <Route
              path="/tools/history-timeline"
              element={
                <OnboardingGate>
                  <HistoryTimelineBuilder
                    onExit={() => window.history.back()}
                  />
                </OnboardingGate>
              }
            />
            <Route
              path="/tools/electoral-college"
              element={
                <OnboardingGate>
                  <ElectoralCollegeSimulator
                    onExit={() => window.history.back()}
                  />
                </OnboardingGate>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
