import React, { useEffect, useRef, useState } from 'react';

export default function StudyTimeChart({ studyTime }) {
  const canvasRef = useRef(null);
  const [view, setView] = useState('week'); // 'week', 'month', 'allTime'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set actual canvas size for crisp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Get data based on view
    let data = [];
    let labels = [];

    if (view === 'week' && studyTime.bySubject) {
      data = studyTime.bySubject.slice(0, 4).map((s) => s.hours);
      labels = studyTime.bySubject
        .slice(0, 4)
        .map((s) => s.subject.slice(0, 8));
    } else if (view === 'month') {
      // For month, show weeks
      const weeksInMonth = 4;
      const hoursPerWeek = (studyTime.month?.hours || 0) / weeksInMonth;
      data = Array(weeksInMonth).fill(hoursPerWeek);
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    } else {
      // All time - show monthly estimate
      const months = 6;
      const hoursPerMonth = (studyTime.allTime?.hours || 0) / months;
      data = Array(months).fill(hoursPerMonth);
      labels = ['6mo ago', '5mo', '4mo', '3mo', '2mo', 'Recent'];
    }

    if (data.length === 0) {
      data = [0];
      labels = ['No data'];
    }

    // Chart dimensions
    const padding = 40;
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    const maxValue = Math.max(...data, 1);
    const barWidth = (chartWidth / data.length) * 0.7;
    const barSpacing = chartWidth / data.length;

    // Define colors
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark';
    const barColor = isDark ? '#6366f1' : '#4f46e5'; // Indigo
    const textColor = isDark ? '#e5e7eb' : '#374151'; // Gray
    const gridColor = isDark ? '#374151' : '#e5e7eb';

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + chartWidth, y);
      ctx.stroke();

      // Y-axis labels
      const value = maxValue - (maxValue / 5) * i;
      ctx.fillStyle = textColor;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(1) + 'h', padding - 5, y + 4);
    }

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * barSpacing + (barSpacing - barWidth) / 2;
      const y = padding + chartHeight - barHeight;

      // Gradient fill
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, barColor);
      gradient.addColorStop(1, barColor + 'CC');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Label
      ctx.fillStyle = textColor;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        labels[index] || '',
        x + barWidth / 2,
        padding + chartHeight + 20
      );

      // Value on top of bar
      if (value > 0) {
        ctx.fillStyle = isDark ? '#fff' : '#000';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(value.toFixed(1), x + barWidth / 2, y - 5);
      }
    });
  }, [studyTime, view]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Study Time
        </h3>

        {/* View Selector */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['week', 'month', 'allTime'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                view === v
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {v === 'week' ? 'Week' : v === 'month' ? 'Month' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full" style={{ height: '200px' }} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">This Week</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {studyTime.week?.hours || 0}h
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {studyTime.month?.hours || 0}h
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">All Time</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {studyTime.allTime?.hours || 0}h
          </p>
        </div>
      </div>

      {/* Streak */}
      {studyTime.week?.daysActive > 0 && (
        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
            🔥 {studyTime.week.daysActive}-day streak this week!
          </p>
        </div>
      )}
    </div>
  );
}
