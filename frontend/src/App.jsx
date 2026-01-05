import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  PREMADE_QUIZ_CATALOG,
  assignPremadeQuizCodes,
} from '../utils/quizProgress.js';
import { useThemeController } from '../hooks/useThemeController.js';
import { AuthScreen } from '../components/index.js';
import DashboardView from './views/DashboardView.jsx';
import SocialStudiesView from './views/SocialStudiesView.jsx';
import SuperAdminAllQuestions from './views/SuperAdminAllQuestions.jsx';
import ConstitutionExplorer from '../../tools/ConstitutionExplorer.jsx';
import EconomicsGraphTool from '../../tools/EconomicsGraphTool.jsx';
import MapExplorer from '../../tools/MapExplorer.jsx';
import CivicsReasoningLab from '../../tools/CivicsReasoningLab.jsx';
import HistoryTimelineBuilder from '../../tools/HistoryTimelineBuilder.jsx';
import ElectoralCollegeSimulator from '../../tools/ElectoralCollegeSimulator.jsx';
import ProfileView from './views/ProfileView.jsx';
import SettingsView from './views/SettingsView.jsx';
import QuizDemo from './views/QuizDemo.jsx';
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
  const { theme, toggleTheme } = useThemeController();

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
          console.log('User logged in:', loggedInUser);
        }}
      />
    );
  }

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
          {user?.role === 'super_admin' && (
            <Link to="/super-admin/all-questions">All Questions</Link>
          )}
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/social-studies" element={<SocialStudiesView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/demo/math" element={<QuizDemo />} />
            <Route
              path="/super-admin/all-questions"
              element={
                user?.role === 'super_admin' ? (
                  <SuperAdminAllQuestions />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/tools/constitution-explorer"
              element={
                <ConstitutionExplorer onExit={() => window.history.back()} />
              }
            />
            <Route
              path="/tools/economics-market-simulator"
              element={
                <EconomicsGraphTool onExit={() => window.history.back()} />
              }
            />
            <Route
              path="/tools/map-explorer"
              element={<MapExplorer onExit={() => window.history.back()} />}
            />
            <Route
              path="/tools/civics-reasoning"
              element={
                <CivicsReasoningLab onExit={() => window.history.back()} />
              }
            />
            <Route
              path="/tools/history-timeline"
              element={
                <HistoryTimelineBuilder onExit={() => window.history.back()} />
              }
            />
            <Route
              path="/tools/electoral-college"
              element={
                <ElectoralCollegeSimulator
                  onExit={() => window.history.back()}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}
