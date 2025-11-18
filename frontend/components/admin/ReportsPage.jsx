import React, { useState, useEffect } from 'react';
import { BarChart2, Users, TrendingUp, Download, Filter } from 'lucide-react';

export default function ReportsPage({ user }) {
  const [activeTab, setActiveTab] = useState('readiness');
  const [readinessData, setReadinessData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [gedResultsData, setGedResultsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ classId: '' });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    loadReportsData();
  }, [activeTab, filters]);

  const loadClasses = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/admin/classes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const loadReportsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const params = new URLSearchParams();
      if (filters.classId) params.append('classId', filters.classId);

      const [readiness, activity, gedResults] = await Promise.all([
        fetch(`/api/admin/reports/readiness?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
        fetch(`/api/admin/reports/activity?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
        fetch(`/api/admin/reports/ged-results?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()),
      ]);

      setReadinessData(readiness);
      setActivityData(activity);
      setGedResultsData(gedResults);
    } catch (error) {
      console.error('Failed to load reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjectNames = {
    rla: 'Reading/Language Arts',
    math: 'Math',
    science: 'Science',
    social: 'Social Studies',
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filters.classId}
            onChange={(e) =>
              setFilters({ ...filters, classId: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b">
          <button
            onClick={() => setActiveTab('readiness')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'readiness'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              GED Readiness
            </div>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'activity'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Student Activity
            </div>
          </button>
          <button
            onClick={() => setActiveTab('ged-results')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === 'ged-results'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Official GED Results
            </div>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : (
        <>
          {/* GED Readiness Tab */}
          {activeTab === 'readiness' && readinessData && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Overall Readiness Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-700">
                      {readinessData.overall.ready}
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Ready (145+)
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-700">
                      {readinessData.overall.almostReady}
                    </div>
                    <div className="text-sm text-yellow-600 mt-1">
                      Almost Ready (135-144)
                    </div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-700">
                      {readinessData.overall.needMoreStudy}
                    </div>
                    <div className="text-sm text-red-600 mt-1">
                      Need More Study (&lt;135)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Readiness by Subject
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(readinessData.subjects).map((key) => {
                    const subject = readinessData.subjects[key];
                    const total =
                      subject.ready +
                      subject.almostReady +
                      subject.needMoreStudy;

                    return (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">
                            {subjectNames[key]}
                          </h3>
                          <span className="text-lg font-bold text-teal-600">
                            Avg: {subject.meanScore}
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                Ready (145+)
                              </span>
                              <span className="font-medium text-green-600">
                                {subject.ready} (
                                {total > 0
                                  ? Math.round((subject.ready / total) * 100)
                                  : 0}
                                %)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-green-500 h-3 rounded-full transition-all"
                                style={{
                                  width: `${
                                    total > 0
                                      ? (subject.ready / total) * 100
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                Almost Ready (135-144)
                              </span>
                              <span className="font-medium text-yellow-600">
                                {subject.almostReady} (
                                {total > 0
                                  ? Math.round(
                                      (subject.almostReady / total) * 100
                                    )
                                  : 0}
                                %)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-yellow-500 h-3 rounded-full transition-all"
                                style={{
                                  width: `${
                                    total > 0
                                      ? (subject.almostReady / total) * 100
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                Need More Study (&lt;135)
                              </span>
                              <span className="font-medium text-red-600">
                                {subject.needMoreStudy} (
                                {total > 0
                                  ? Math.round(
                                      (subject.needMoreStudy / total) * 100
                                    )
                                  : 0}
                                %)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-red-500 h-3 rounded-full transition-all"
                                style={{
                                  width: `${
                                    total > 0
                                      ? (subject.needMoreStudy / total) * 100
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Student Activity Tab */}
          {activeTab === 'activity' && activityData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 30 Days
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {activityData.last30Days.activeStudents}
                  </div>
                  <div className="text-sm text-gray-500">active students</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {Math.round(activityData.last30Days.totalMinutes / 60)}h
                    study time
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 60 Days
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {activityData.last60Days.activeStudents}
                  </div>
                  <div className="text-sm text-gray-500">active students</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {Math.round(activityData.last60Days.totalMinutes / 60)}h
                    study time
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 90 Days
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {activityData.last90Days.activeStudents}
                  </div>
                  <div className="text-sm text-gray-500">active students</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {Math.round(activityData.last90Days.totalMinutes / 60)}h
                    study time
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    All Time
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {activityData.allTime.activeStudents}
                  </div>
                  <div className="text-sm text-gray-500">total students</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {Math.round(activityData.allTime.totalMinutes / 60)}h total
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Official GED Results Tab */}
          {activeTab === 'ged-results' && gedResultsData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 3 Months
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {gedResultsData.last3Months.passed}/
                    {gedResultsData.last3Months.total}
                  </div>
                  <div className="text-sm text-gray-500">tests passed</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {gedResultsData.last3Months.total > 0
                      ? Math.round(
                          (gedResultsData.last3Months.passed /
                            gedResultsData.last3Months.total) *
                            100
                        )
                      : 0}
                    % pass rate
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 6 Months
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {gedResultsData.last6Months.passed}/
                    {gedResultsData.last6Months.total}
                  </div>
                  <div className="text-sm text-gray-500">tests passed</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {gedResultsData.last6Months.total > 0
                      ? Math.round(
                          (gedResultsData.last6Months.passed /
                            gedResultsData.last6Months.total) *
                            100
                        )
                      : 0}
                    % pass rate
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Last 12 Months
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {gedResultsData.last12Months.passed}/
                    {gedResultsData.last12Months.total}
                  </div>
                  <div className="text-sm text-gray-500">tests passed</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {gedResultsData.last12Months.total > 0
                      ? Math.round(
                          (gedResultsData.last12Months.passed /
                            gedResultsData.last12Months.total) *
                            100
                        )
                      : 0}
                    % pass rate
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    All Time
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {gedResultsData.allTime.passed}/
                    {gedResultsData.allTime.total}
                  </div>
                  <div className="text-sm text-gray-500">tests passed</div>
                  <div className="text-lg font-semibold text-teal-600 mt-2">
                    {gedResultsData.allTime.total > 0
                      ? Math.round(
                          (gedResultsData.allTime.passed /
                            gedResultsData.allTime.total) *
                            100
                        )
                      : 0}
                    % pass rate
                  </div>
                </div>
              </div>

              {/* By Subject */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Results by Subject (All Time)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(gedResultsData.allTime.bySubject).map(
                    ([subject, data]) => (
                      <div key={subject} className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {subject}
                        </h3>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {data.passed}/{data.total}
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                          {data.total > 0
                            ? Math.round((data.passed / data.total) * 100)
                            : 0}
                          % pass rate
                        </div>
                        <div className="text-sm text-teal-600">
                          Avg Score: {data.avgScore}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
