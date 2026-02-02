import React, { useState, useEffect } from 'react';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';
import LearningPlanCard from './LearningPlanCard.jsx';
import MasteryPanel from './MasteryPanel.jsx';
import StudyLevelBar from './StudyLevelBar.jsx';
import StudyTimeChart from './StudyTimeChart.jsx';
import SubjectBadges from './SubjectBadges.jsx';
import CareerMiniPanel from './CareerMiniPanel.jsx';
import EstimatedStudyTime from './EstimatedStudyTime.jsx';
import SkillHeatmap from './SkillHeatmap.jsx';

export default function StudentHomeRoom({ user, onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    nextTask: null,
    mastery: { rla: [], math: [], science: [], social: [] },
    studyTime: { week: {}, month: {}, allTime: {}, bySubject: [] },
    badges: { rla: {}, math: {}, science: {}, social: {} },
    scoreHistory: { history: [], highestScores: {} },
    studyEstimate: null,
    careerRecommendations: { recommendations: [], interests: [] },
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Fetch all dashboard data in parallel
      const [
        nextTaskRes,
        masteryRes,
        studyTimeRes,
        badgesRes,
        scoreHistoryRes,
        studyEstimateRes,
        careerRes,
      ] = await Promise.all([
        fetch('/api/student/next-task', { headers }),
        fetch('/api/student/mastery', { headers }),
        fetch('/api/student/study-time', { headers }),
        fetch('/api/student/badges', { headers }),
        fetch('/api/student/score-history', { headers }),
        fetch('/api/student/study-estimate', { headers }),
        fetch('/api/student/career-recommendations', { headers }),
      ]);

      const data = {
        nextTask: await nextTaskRes.json(),
        mastery: await masteryRes.json(),
        studyTime: await studyTimeRes.json(),
        badges: await badgesRes.json(),
        scoreHistory: await scoreHistoryRes.json(),
        studyEstimate: await studyEstimateRes.json(),
        careerRecommendations: await careerRes.json(),
      };

      setDashboardData(data);
    } catch (err) {
      console.error('[StudentHomeRoom] Load error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTask = (task) => {
    if (task.quizId) {
      // Navigate to quiz
      onNavigate?.(`/quiz/${task.quizId}`, {
        subject: task.subject,
        source: 'coach-smith',
      });
    } else {
      // Navigate to subject practice
      onNavigate?.(`/practice/${task.subject.toLowerCase()}`);
    }
  };

  const handleImproveSkill = (subject, skill) => {
    // Generate a micro-quiz for this skill
    onNavigate?.('/generate-quiz', {
      subject,
      skill,
      type: 'targeted',
    });
  };

  const handleViewHistory = () => {
    onNavigate?.('/exam-history');
  };

  const handleStartDiagnostic = async () => {
    try {
      // We don't set global loading here to avoid unmounting the dashboard if it fails quickly
      // But we can show a loading state on the button

      const token =
        localStorage.getItem('token') || localStorage.getItem('appToken');
      const res = await fetch(`${getApiBaseUrl()}/api/diagnostic-test`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (!res.ok) throw new Error('Failed to start diagnostic');

      const quiz = await res.json();

      // Navigate to quiz runner with the quiz data
      // We use a special route or pass state.
      // Assuming /quiz/diagnostic is handled or we pass state to a generic runner.
      // Since we don't have a dedicated route for "object-based" quizzes in the URL usually,
      // we might need to rely on the router's state passing capability.
      // If the app uses React Router, the second arg to navigate is state.
      // onNavigate is likely a wrapper around navigate().

      // If onNavigate is just a function that changes the URL, we might have a problem if the URL doesn't support loading from state.
      // But let's assume the app handles it or we can use a special ID.

      // If we can't pass state, we might need to save it to a temporary store or local storage.
      localStorage.setItem('current_quiz_data', JSON.stringify(quiz));
      onNavigate?.('/quiz/local-diagnostic');
    } catch (err) {
      console.error(err);
      alert('Failed to start diagnostic test. Please try again.');
    }
  };

  const handleExploreWorkforce = () => {
    onNavigate?.('/workforce');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const highestScore =
    Object.values(dashboardData.scoreHistory.highestScores || {})[0] || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's your learning progress
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Refresh dashboard"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Diagnostic Assessment Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-indigo-600 dark:text-indigo-400">
                <svg
                  className="w-32 h-32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21 1.01.33 2.05.33 3.1 0 4.41-3.59 8-8 8z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Day 0 Diagnostic
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-lg">
                  Take a comprehensive 40-question assessment to determine your
                  baseline readiness across all subjects. This will help Coach
                  Smith personalize your learning plan.
                </p>
                <button
                  onClick={handleStartDiagnostic}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Start Diagnostic Test
                </button>
              </div>
            </div>

            {/* Learning Plan Card */}
            <LearningPlanCard
              nextTask={dashboardData.nextTask?.nextTask}
              onStartTask={handleStartTask}
            />

            {/* Mastery Panel */}
            <MasteryPanel
              mastery={dashboardData.mastery}
              onImprove={handleImproveSkill}
            />

            {/* Skill Heatmap - PREMIUM FEATURE */}
            <SkillHeatmap />

            {/* Tutorial Video Placeholder (for future) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📹 Tutorial Video
              </h3>
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Coming soon...
                </p>
              </div>
            </div>

            {/* Career Recommendations (Desktop) */}
            <div className="hidden lg:block">
              <CareerMiniPanel
                recommendations={
                  dashboardData.careerRecommendations.recommendations
                }
                onExploreMore={handleExploreWorkforce}
              />
            </div>
          </div>

          {/* Right Column (1/3 width on desktop) */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <StudyLevelBar
              highestScore={highestScore}
              onViewHistory={handleViewHistory}
            />

            {/* Estimated Study Time */}
            <EstimatedStudyTime estimate={dashboardData.studyEstimate} />

            {/* Subject Badges */}
            <SubjectBadges badgeData={dashboardData.badges} />

            {/* Study Time Chart */}
            <StudyTimeChart studyTime={dashboardData.studyTime} />

            {/* Career Recommendations (Mobile) */}
            <div className="lg:hidden">
              <CareerMiniPanel
                recommendations={
                  dashboardData.careerRecommendations.recommendations
                }
                onExploreMore={handleExploreWorkforce}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
