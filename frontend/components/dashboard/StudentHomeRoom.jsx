import React, { useState, useEffect } from 'react';
import LearningPlanCard from './LearningPlanCard.jsx';
import MasteryPanel from './MasteryPanel.jsx';
import StudyLevelBar from './StudyLevelBar.jsx';
import StudyTimeChart from './StudyTimeChart.jsx';
import SubjectBadges from './SubjectBadges.jsx';
import CareerMiniPanel from './CareerMiniPanel.jsx';
import EstimatedStudyTime from './EstimatedStudyTime.jsx';

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
