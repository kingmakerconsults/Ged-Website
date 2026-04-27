/**
 * WorkforceSectionFrame.jsx — shared chrome (header + back button) used by
 * each top-level Workforce section so they all feel like one product.
 */
import React from 'react';

export default function WorkforceSectionFrame({
  title,
  subtitle,
  onBack,
  children,
  badge,
}) {
  return (
    <div className="workforce-section space-y-4">
      <div
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{
          background:
            'var(--subject-workforce-gradient, linear-gradient(135deg, #14b8a6 0%, #0891b2 100%))',
        }}
      >
        <header className="flex items-center justify-between p-4 text-white">
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-md"
          >
            ← Back
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-extrabold">{title}</h2>
            {subtitle ? (
              <p className="text-sm opacity-90 mt-0.5">{subtitle}</p>
            ) : null}
          </div>
          <div className="min-w-[80px] text-right">
            {badge ? (
              <span className="inline-block bg-white/20 text-xs font-semibold px-2 py-1 rounded-full">
                {badge}
              </span>
            ) : null}
          </div>
        </header>
      </div>
      <div className="section-body text-slate-900 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}
