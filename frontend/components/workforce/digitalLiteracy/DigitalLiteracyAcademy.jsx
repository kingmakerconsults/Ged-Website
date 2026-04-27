/**
 * DigitalLiteracyAcademy.jsx — index for all 22 modules grouped into the 4
 * buckets, with two tier badges and per-tier master certificates.
 */
import React, { useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import {
  useWorkforceProgress,
  FOUNDATION_MODULES,
  PRO_MODULES,
  loadProgress,
} from '../progressStore.js';
import ModuleShell from './_engine/ModuleShell.jsx';
import { TierCertificate, PrintButton } from './_engine/Certificate.jsx';
import { BUCKETS, findModule } from './modules/index.js';

function ModuleRow({ mod, status, onOpen }) {
  const score = status?.score;
  const mastered = status?.mastered;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 p-3 hover:shadow-md transition flex gap-3 items-center"
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${
          mastered
            ? 'bg-green-500 text-white'
            : score != null
              ? 'bg-amber-300 text-amber-900'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
        }`}
        aria-hidden="true"
      >
        {mastered ? '✓' : score != null ? score : ''}
      </span>
      <div className="flex-1">
        <div className="font-semibold text-sm">{mod.title}</div>
        <div className="text-xs opacity-70">
          {mod.standardId} · {mod.standardLabel}
        </div>
      </div>
      <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold">
        {mastered ? 'Open ↻' : 'Start →'}
      </span>
    </button>
  );
}

function TierPanel({ tier, learnerName, proctored }) {
  const [showCert, setShowCert] = useState(false);
  const ids = tier === 'pro' ? PRO_MODULES : FOUNDATION_MODULES;
  const modules = ids
    .map((id) => findModule(id))
    .filter(Boolean)
    .map((m) => ({ id: m.standardId, title: m.title }));

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 font-semibold">
            Earned
          </div>
          <div className="text-lg font-extrabold">
            🏅 Digital Ready {tier === 'pro' ? 'Pro' : 'Foundation'}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowCert((v) => !v)}
            className="px-3 py-1.5 rounded-md border border-teal-600 text-teal-700 dark:text-teal-300 text-sm font-semibold"
          >
            {showCert ? 'Hide' : 'View'} certificate
          </button>
          {showCert ? <PrintButton label="Print" /> : null}
        </div>
      </div>
      {showCert ? (
        <div className="mt-4">
          <TierCertificate
            tier={tier}
            learnerName={learnerName}
            modulesCovered={modules}
            proctored={proctored}
            issuedAt={new Date().toISOString()}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function DigitalLiteracyAcademy({ userId, onBack }) {
  const [activeId, setActiveId] = useState(null);
  const progress = useWorkforceProgress(userId);
  const learnerName =
    (typeof window !== 'undefined' &&
      JSON.parse(window.localStorage.getItem('appUser') || '{}').name) ||
    'Learner';
  const proctored = loadProgress(userId).proctored;

  const foundationCount = FOUNDATION_MODULES.filter(
    (m) => progress.dl[m]?.mastered
  ).length;
  const proCount = PRO_MODULES.filter((m) => progress.dl[m]?.mastered).length;

  if (activeId) {
    const mod = findModule(activeId);
    if (!mod) {
      setActiveId(null);
      return null;
    }
    return (
      <WorkforceSectionFrame
        title="Digital Literacy Academy"
        subtitle={mod.title}
        onBack={() => setActiveId(null)}
        badge={`${proCount}/${PRO_MODULES.length}`}
      >
        <ModuleShell
          userId={userId}
          module={mod}
          onBack={() => setActiveId(null)}
        />
      </WorkforceSectionFrame>
    );
  }

  return (
    <WorkforceSectionFrame
      title="Digital Literacy Academy"
      subtitle="22 task-based modules · Core Digital Skills standards + beyond"
      onBack={onBack}
      badge={`${proCount}/${PRO_MODULES.length} mastered`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
          <div className="text-xs uppercase opacity-80">
            Digital Ready Foundation
          </div>
          <div className="text-2xl font-extrabold">
            {foundationCount}/{FOUNDATION_MODULES.length}
          </div>
          <div className="h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-white"
              style={{
                width: `${(foundationCount / FOUNDATION_MODULES.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs mt-1 opacity-80">
            Core Digital Skills standards (Buckets A–C, 17 modules)
          </div>
        </div>
        <div className="rounded-xl p-4 bg-gradient-to-r from-cyan-700 to-emerald-700 text-white">
          <div className="text-xs uppercase opacity-80">Digital Ready Pro</div>
          <div className="text-2xl font-extrabold">
            {proCount}/{PRO_MODULES.length}
          </div>
          <div className="h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-white"
              style={{
                width: `${(proCount / PRO_MODULES.length) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs mt-1 opacity-80">
            All 22 modules including Bucket D (modern + workforce).
          </div>
        </div>
      </div>

      {progress.badges.foundation && (
        <div className="mb-4">
          <TierPanel
            tier="foundation"
            learnerName={learnerName}
            proctored={proctored}
          />
        </div>
      )}
      {progress.badges.pro && (
        <div className="mb-4">
          <TierPanel
            tier="pro"
            learnerName={learnerName}
            proctored={proctored}
          />
        </div>
      )}

      <div className="space-y-6">
        {BUCKETS.map((bucket) => (
          <section key={bucket.key} aria-labelledby={`bucket-${bucket.key}`}>
            <div className="mb-2">
              <h3
                id={`bucket-${bucket.key}`}
                className="text-lg font-extrabold"
              >
                Bucket {bucket.key} · {bucket.title}
              </h3>
              <p className="text-xs opacity-70">{bucket.desc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bucket.modules.map((m) => (
                <ModuleRow
                  key={m.id}
                  mod={m}
                  status={progress.dl[m.id]}
                  onOpen={() => setActiveId(m.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-4 text-xs text-slate-600 dark:text-slate-300">
        <strong>About mastery:</strong> Each module combines a hands-on sim (60%
        of the score) with a knowledge check (40%). Reach 85% combined to master
        a module and earn its certificate. Modules can be retaken any time. The
        Foundation badge unlocks at all 17 Core Digital Skills–aligned standards mastered;
        the Pro badge unlocks at all 22 modules.
      </div>
    </WorkforceSectionFrame>
  );
}
