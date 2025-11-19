import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
} from 'lucide-react';

export default function AdminDashboard({ user, onNavigate }) {
  const [readinessData, setReadinessData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [gedResultsData, setGedResultsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token =
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage.getItem('appToken')
          : null;

      if (!token) {
        console.warn('No auth token available for admin dashboard');
        setLoading(false);
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const [readiness, activity, gedResults] = await Promise.all([
        fetch('/api/admin/reports/readiness', { headers }).then((r) =>
          r.json()
        ),
        fetch('/api/admin/reports/activity', { headers }).then((r) => r.json()),
        fetch('/api/admin/reports/ged-results', { headers }).then((r) =>
          r.json()
        ),
      ]);

      setReadinessData(readiness);
      setActivityData(activity);
      setGedResultsData(gedResults);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const subjectNames = {
    rla: 'Reading/Language Arts',
    math: 'Math',
    science: 'Science',
    social: 'Social Studies',
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {activityData?.last30Days?.activeStudents || 0}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Active Students
          </h3>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round((activityData?.last30Days?.totalMinutes || 0) / 60)}h
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Study Time</h3>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {readinessData?.overall?.ready || 0}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Test Ready</h3>
          <p className="text-xs text-gray-500">GED pass-ready scores</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {gedResultsData?.last3Months?.passed || 0}/
              {gedResultsData?.last3Months?.total || 0}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            GED Tests Passed
          </h3>
          <p className="text-xs text-gray-500">Last 3 months</p>
        </div>
      </div>

      {/* Readiness by Subject */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" />
            GED Readiness by Subject
          </h2>
          <button
            onClick={() => onNavigate('admin-reports')}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            View Full Reports →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(readinessData?.subjects || {}).map((key) => {
            const subject = readinessData.subjects[key];
            const total =
              subject.ready + subject.almostReady + subject.needMoreStudy;

            return (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    {subjectNames[key]}
                  </h3>
                  <span className="text-sm text-gray-600">
                    Avg: {subject.meanScore}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ready (145+)</span>
                    <span className="font-medium text-green-600">
                      {subject.ready}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          total > 0 ? (subject.ready / total) * 100 : 0
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Almost Ready (135-144)
                    </span>
                    <span className="font-medium text-yellow-600">
                      {subject.almostReady}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{
                        width: `${
                          total > 0 ? (subject.almostReady / total) * 100 : 0
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Need Study (&lt;135)</span>
                    <span className="font-medium text-red-600">
                      {subject.needMoreStudy}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${
                          total > 0 ? (subject.needMoreStudy / total) * 100 : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('admin-classes')}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
        >
          <div className="bg-teal-100 p-3 rounded-lg w-fit mb-4">
            <BookOpen className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Classes</h3>
          <p className="text-sm text-gray-600">
            Create and edit classes, manage rosters
          </p>
        </button>

        <button
          onClick={() => onNavigate('admin-students')}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
        >
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Manage Students</h3>
          <p className="text-sm text-gray-600">
            Search, create, and edit student profiles
          </p>
        </button>

        <button
          onClick={() => onNavigate('admin-reports')}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow text-left"
        >
          <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
            <BarChart2 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
          <p className="text-sm text-gray-600">
            Analytics, exports, and GED results
          </p>
        </button>
      </div>
    </div>
  );
}
