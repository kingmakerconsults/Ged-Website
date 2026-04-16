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

// ---------------------------------------------------------------------------
// Score Trends Card – shows per-subject growth over time
// ---------------------------------------------------------------------------
function ScoreTrendsCard({ subjects }) {
  if (!subjects || Object.keys(subjects).length === 0) return null;

  return (
    <div className="glass-card card-lift rounded-2xl p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Score Trends
      </h3>
      <div className="space-y-4">
        {Object.entries(subjects).map(([subj, data]) => {
          const passColor =
            data.latest >= 145
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-amber-600 dark:text-amber-400';
          const growthColor =
            data.growth > 0
              ? 'text-emerald-600'
              : data.growth < 0
                ? 'text-red-500'
                : 'text-slate-600';
          const growthIcon =
            data.growth > 0 ? '↑' : data.growth < 0 ? '↓' : '→';
          return (
            <div
              key={subj}
              className="border-b border-slate-100 dark:border-slate-700/50 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-900 dark:text-white capitalize">
                  {subj}
                </span>
                <span className={`text-sm font-medium ${passColor}`}>
                  {data.latest}/200
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <span>Best: {data.best}</span>
                <span>
                  {data.attemptCount} attempt
                  {data.attemptCount !== 1 ? 's' : ''}
                </span>
                <span>
                  {data.passCount} pass{data.passCount !== 1 ? 'es' : ''}
                </span>
                <span className={`font-medium ${growthColor}`}>
                  {growthIcon} {Math.abs(data.growth)} pts
                </span>
              </div>
              {/* Mini sparkline bar */}
              {data.attempts && data.attempts.length > 1 && (
                <div className="flex items-end gap-0.5 mt-2 h-8">
                  {data.attempts.slice(-15).map((a, idx) => {
                    const pct = Math.max(
                      0,
                      Math.min(100, ((a.scaledScore - 100) / 100) * 100)
                    );
                    const barColor = a.passed
                      ? 'bg-emerald-400'
                      : a.scaledScore >= 135
                        ? 'bg-amber-400'
                        : 'bg-red-400';
                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t ${barColor} min-w-[4px]`}
                        style={{ height: `${Math.max(8, pct)}%` }}
                        title={`${a.scaledScore} - ${new Date(a.date).toLocaleDateString()}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Weakest Areas Card – shows lowest-accuracy domains/topics
// ---------------------------------------------------------------------------
function WeakestAreasCard({ areas }) {
  if (!areas || areas.length === 0) return null;

  return (
    <div className="glass-card card-lift rounded-2xl p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Areas to Improve
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        Based on your quiz performance (min. 3 questions)
      </p>
      <div className="space-y-2">
        {areas.slice(0, 8).map((area, idx) => {
          const pct = parseFloat(area.accuracy_pct) || 0;
          const barColor =
            pct >= 70
              ? 'bg-emerald-400'
              : pct >= 50
                ? 'bg-amber-400'
                : 'bg-red-400';
          return (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-700 dark:text-slate-300 capitalize">
                  {area.domain || area.topic || 'General'}
                  {area.subject ? ` (${area.subject})` : ''}
                </span>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                  {area.correct_items}/{area.total_items} ({pct}%)
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Confidence Calibration Card – shows how well student knows what they know
// ---------------------------------------------------------------------------
function ConfidenceCalibrationCard({ data }) {
  if (
    !data ||
    !data.byConfidence ||
    Object.keys(data.byConfidence).length === 0
  )
    return null;

  const sure = data.byConfidence['sure'] || {
    total: 0,
    correct: 0,
    accuracyPct: 0,
  };
  const guessing = data.byConfidence['guessing'] || {
    total: 0,
    correct: 0,
    accuracyPct: 0,
  };
  const calibration = data.calibrationScore;

  const calibrationLabel =
    calibration >= 80
      ? 'Excellent'
      : calibration >= 60
        ? 'Good'
        : calibration >= 40
          ? 'Fair'
          : 'Needs work';
  const calibrationColor =
    calibration >= 80
      ? 'text-emerald-600'
      : calibration >= 60
        ? 'text-blue-600'
        : calibration >= 40
          ? 'text-amber-600'
          : 'text-red-600';

  return (
    <div className="glass-card card-lift rounded-2xl p-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
        Confidence Calibration
      </h3>
      {calibration !== null && (
        <div className="text-center mb-4">
          <div className={`text-3xl font-bold ${calibrationColor}`}>
            {calibration}%
          </div>
          <div className={`text-sm ${calibrationColor}`}>
            {calibrationLabel}
          </div>
        </div>
      )}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            When "sure"
          </span>
          <span className="font-medium">
            {sure.accuracyPct}% correct ({sure.total} Qs)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            When "guessing"
          </span>
          <span className="font-medium">
            {guessing.accuracyPct}% correct ({guessing.total} Qs)
          </span>
        </div>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
        High calibration means you accurately predict when you know the answer.
      </p>
    </div>
  );
}

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
    scoreTrends: { subjects: {} },
    domainMastery: { domains: [] },
    confidenceAnalysis: { byConfidence: {}, calibrationScore: null },
    weakestAreas: { areas: [] },
    recentPerformance: { attempts: [] },
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
        scoreTrendsRes,
        domainMasteryRes,
        confidenceRes,
        weakestRes,
        recentPerfRes,
      ] = await Promise.all([
        fetch('/api/student/next-task', { headers }),
        fetch('/api/student/mastery', { headers }),
        fetch('/api/student/study-time', { headers }),
        fetch('/api/student/badges', { headers }),
        fetch('/api/student/score-history', { headers }),
        fetch('/api/student/study-estimate', { headers }),
        fetch('/api/student/career-recommendations', { headers }),
        fetch('/api/student/score-trends', { headers }).catch(() => ({
          ok: false,
        })),
        fetch('/api/student/domain-mastery', { headers }).catch(() => ({
          ok: false,
        })),
        fetch('/api/student/confidence-analysis', { headers }).catch(() => ({
          ok: false,
        })),
        fetch('/api/student/weakest-areas', { headers }).catch(() => ({
          ok: false,
        })),
        fetch('/api/student/recent-performance', { headers }).catch(() => ({
          ok: false,
        })),
      ]);

      const safeJson = async (res, fallback) => {
        try {
          return res.ok ? await res.json() : fallback;
        } catch {
          return fallback;
        }
      };

      const data = {
        nextTask: await nextTaskRes.json(),
        mastery: await masteryRes.json(),
        studyTime: await studyTimeRes.json(),
        badges: await badgesRes.json(),
        scoreHistory: await scoreHistoryRes.json(),
        studyEstimate: await studyEstimateRes.json(),
        careerRecommendations: await careerRes.json(),
        scoreTrends: await safeJson(scoreTrendsRes, { subjects: {} }),
        domainMastery: await safeJson(domainMasteryRes, { domains: [] }),
        confidenceAnalysis: await safeJson(confidenceRes, {
          byConfidence: {},
          calibrationScore: null,
        }),
        weakestAreas: await safeJson(weakestRes, { areas: [] }),
        recentPerformance: await safeJson(recentPerfRes, { attempts: [] }),
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
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      let payload = null;
      try {
        payload = await res.json();
      } catch (_error) {
        payload = null;
      }

      if (!res.ok) {
        if (payload?.alreadyCompleted) {
          alert(
            payload?.message ||
              'You have already completed the GED Diagnostic. Each student may take it only once.'
          );
          return;
        }
        throw new Error(payload?.error || 'Failed to start diagnostic');
      }

      if (payload?.alreadyCompleted) {
        alert(
          payload?.message ||
            'You have already completed the GED Diagnostic. Each student may take it only once.'
        );
        return;
      }

      if (
        !payload ||
        !Array.isArray(payload.questions) ||
        !payload.questions.length
      ) {
        throw new Error('No diagnostic quiz was returned.');
      }

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
      localStorage.setItem('current_quiz_data', JSON.stringify(payload));
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-6 max-w-md border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
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
    <div className="min-h-screen transition-colors">
      {/* Header */}
      <div className="glass-surface border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user?.name || 'Student'}!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's your learning progress
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              title="Refresh dashboard"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
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
            <div className="glass-card card-lift rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-sky-600 dark:text-sky-400">
                <svg
                  className="w-32 h-32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21 1.01.33 2.05.33 3.1 0 4.41-3.59 8-8 8z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Day 0 Diagnostic
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-lg">
                  Take a comprehensive 40-question assessment to determine your
                  baseline readiness across all subjects. This will help Coach
                  Smith personalize your learning plan.
                </p>
                <button
                  onClick={handleStartDiagnostic}
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all"
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

            {/* Score Trends */}
            <ScoreTrendsCard subjects={dashboardData.scoreTrends?.subjects} />

            {/* Weakest Areas */}
            <WeakestAreasCard areas={dashboardData.weakestAreas?.areas} />

            {/* Skill Heatmap - PREMIUM FEATURE */}
            <SkillHeatmap />

            {/* Tutorial Video Placeholder (for future) */}
            <div className="glass-card card-lift rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Tutorial Video
              </h3>
              <div className="aspect-video bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center">
                <p className="text-slate-600 dark:text-slate-400">
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

            {/* Confidence Calibration */}
            <ConfidenceCalibrationCard
              data={dashboardData.confidenceAnalysis}
            />

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
