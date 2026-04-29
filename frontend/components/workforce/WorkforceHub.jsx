/**
 * WorkforceHub.jsx — section dashboard for the Workforce Readiness area.
 * Replaces the thin pre-existing hub in CareerDocumentStudio.jsx.
 *
 * Sections (lazy-loaded):
 *   - Career Document Studio (existing)
 *   - Digital Literacy Academy (new — Core Digital Skills standards + beyond)
 *   - Job Search Toolkit
 *   - Interview Studio
 *   - Career Pathways Explorer
 *   - Financial & Benefits Literacy
 *   - Workplace Skills Sims
 *   - Soft Skills Coach
 */
import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import {
  useWorkforceProgress,
  FOUNDATION_MODULES,
  PRO_MODULES,
  setProctored,
} from './progressStore.js';
import ProgramDashboard from './program/ProgramDashboard.jsx';
import {
  createWorkforcePlan,
  fetchWorkforceOverview,
  hasWorkforceAuth,
  updateWorkforceMilestone,
} from './workforceApi.js';

const CareerDocumentStudio = lazy(() => import('./CareerDocumentStudio.jsx'));
const DigitalLiteracyAcademy = lazy(
  () => import('./digitalLiteracy/DigitalLiteracyAcademy.jsx')
);
const JobSearchToolkit = lazy(() => import('./sections/JobSearchToolkit.jsx'));
const InterviewStudio = lazy(() => import('./sections/InterviewStudio.jsx'));
const CareerPathwaysExplorer = lazy(
  () => import('./sections/CareerPathwaysExplorer.jsx')
);
const FinancialBenefitsLiteracy = lazy(
  () => import('./sections/FinancialBenefitsLiteracy.jsx')
);
const WorkplaceSkillsSims = lazy(
  () => import('./sections/WorkplaceSkillsSims.jsx')
);
const SoftSkillsCoach = lazy(() => import('./sections/SoftSkillsCoach.jsx'));

const SECTIONS = [
  {
    id: 'career-docs',
    icon: '📄',
    title: 'Career Document Studio',
    subtitle:
      'Resumes, cover letters, thank-yous, and resignation letters with AI scoring.',
  },
  {
    id: 'digital-literacy',
    icon: '💻',
    title: 'Digital Literacy Academy',
    subtitle:
      'Core Digital Skills–aligned task-based mastery: 22 modules, two badges, printable certificates.',
    feature: true,
  },
  {
    id: 'job-search',
    icon: '🔎',
    title: 'Job Search Toolkit',
    subtitle:
      'Search-practice prompts, application tracker, employer research, salary explainer.',
  },
  {
    id: 'interview',
    icon: '🎤',
    title: 'Interview Studio',
    subtitle:
      'Categorized question bank, STAR builder, AI mock interview, self-record practice.',
  },
  {
    id: 'pathways',
    icon: '🧭',
    title: 'Career Pathways Explorer',
    subtitle:
      'Filter careers by interest, education, and wage; see day-in-the-life.',
  },
  {
    id: 'financial',
    icon: '💵',
    title: 'Financial & Benefits Literacy',
    subtitle:
      'Read a paystub, W-4/I-9, taxes, health, 401(k), 50/30/20 budget.',
  },
  {
    id: 'workplace',
    icon: '🤝',
    title: 'Workplace Skills Sims',
    subtitle: 'Branching scenarios for conflict, customers, ethics, feedback.',
  },
  {
    id: 'softskills',
    icon: '🌱',
    title: 'Soft Skills Coach',
    subtitle: 'Daily drill, reflection journal, streak counter.',
  },
];

function BadgeChip({ label, count, total, complete }) {
  const pct = Math.round((count / total) * 100);
  return (
    <div
      className="rounded-xl px-4 py-3 bg-white/15 text-white shadow-sm"
      role="group"
      aria-label={`${label} progress`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">
            {label}
          </div>
          <div className="text-lg font-extrabold">
            {count}/{total} {complete ? '✓' : ''}
          </div>
        </div>
        <div className="w-24 h-2 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white"
            style={{ width: `${pct}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

function SectionProgressChip({ section, dl }) {
  if (section.id !== 'digital-literacy') return null;
  const mastered = PRO_MODULES.filter((m) => dl[m]?.mastered).length;
  return (
    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 mt-2">
      {mastered}/{PRO_MODULES.length} modules mastered
    </span>
  );
}

export default function WorkforceHub({ onBack, userId = 'anon' }) {
  const [activeId, setActiveId] = useState(null);
  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState('');
  const [programBusy, setProgramBusy] = useState(false);
  const progress = useWorkforceProgress(userId);
  const apiBase = (typeof window !== 'undefined' && window.API_BASE_URL) || '';
  const syncAvailable = hasWorkforceAuth();

  const foundationCount = FOUNDATION_MODULES.filter(
    (m) => progress.dl[m]?.mastered
  ).length;
  const proCount = PRO_MODULES.filter((m) => progress.dl[m]?.mastered).length;

  function close() {
    setActiveId(null);
  }

  const loadOverview = useCallback(async () => {
    if (!syncAvailable) {
      setOverview(null);
      setOverviewError('');
      return;
    }
    setOverviewLoading(true);
    setOverviewError('');
    try {
      const data = await fetchWorkforceOverview();
      setOverview(data || null);
    } catch (err) {
      setOverviewError(
        err?.status === 401
          ? 'Sign in again to sync workforce progress.'
          : err?.message || 'Could not load workforce program progress.'
      );
    } finally {
      setOverviewLoading(false);
    }
  }, [syncAvailable]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  async function handleCreatePlan() {
    setProgramBusy(true);
    setOverviewError('');
    try {
      const data = await createWorkforcePlan({
        name: 'Workforce Readiness Plan',
        description:
          'A self-paced plan for career exploration, documents, interview practice, and job-search habits.',
        source: 'self_directed',
      });
      setOverview((prev) => ({
        ...(prev || {}),
        activePlan: data?.plan || null,
        plans: data?.plan
          ? [data.plan, ...(prev?.plans || [])]
          : prev?.plans || [],
      }));
      await loadOverview();
    } catch (err) {
      setOverviewError(err?.message || 'Could not create workforce plan.');
    } finally {
      setProgramBusy(false);
    }
  }

  async function handleCompleteMilestone(planId, milestoneId) {
    setProgramBusy(true);
    setOverviewError('');
    try {
      await updateWorkforceMilestone(planId, milestoneId, {
        status: 'completed',
        evidence: { completedFrom: 'workforce_hub' },
      });
      await loadOverview();
    } catch (err) {
      setOverviewError(err?.message || 'Could not update milestone.');
    } finally {
      setProgramBusy(false);
    }
  }

  function renderSection() {
    switch (activeId) {
      case 'career-docs':
        return (
          <CareerDocumentStudio
            userId={userId}
            apiBase={apiBase}
            onBack={close}
          />
        );
      case 'digital-literacy':
        return <DigitalLiteracyAcademy userId={userId} onBack={close} />;
      case 'job-search':
        return (
          <JobSearchToolkit userId={userId} apiBase={apiBase} onBack={close} />
        );
      case 'interview':
        return (
          <InterviewStudio userId={userId} apiBase={apiBase} onBack={close} />
        );
      case 'pathways':
        return (
          <CareerPathwaysExplorer
            userId={userId}
            apiBase={apiBase}
            onBack={close}
          />
        );
      case 'financial':
        return (
          <FinancialBenefitsLiteracy
            userId={userId}
            apiBase={apiBase}
            onBack={close}
          />
        );
      case 'workplace':
        return (
          <WorkplaceSkillsSims
            userId={userId}
            apiBase={apiBase}
            onBack={close}
          />
        );
      case 'softskills':
        return (
          <SoftSkillsCoach userId={userId} apiBase={apiBase} onBack={close} />
        );
      default:
        return null;
    }
  }

  if (activeId) {
    return (
      <Suspense
        fallback={<div className="p-6 text-center">Loading section…</div>}
      >
        {renderSection()}
      </Suspense>
    );
  }

  return (
    <div className="workforce-hub space-y-5 text-slate-900 dark:text-slate-100">
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
          <h2 className="text-2xl font-extrabold">Workforce Readiness</h2>
          <div className="w-[80px]" aria-hidden="true" />
        </header>

        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <BadgeChip
            label="Digital Ready Foundation"
            count={foundationCount}
            total={FOUNDATION_MODULES.length}
            complete={progress.badges.foundation}
          />
          <BadgeChip
            label="Digital Ready Pro"
            count={proCount}
            total={PRO_MODULES.length}
            complete={progress.badges.pro}
          />
          <div className="rounded-xl px-4 py-3 bg-white/15 text-white">
            <div className="text-xs uppercase tracking-wider opacity-80">
              Mode
            </div>
            <label className="flex items-center gap-2 text-sm mt-1 cursor-pointer">
              <input
                type="checkbox"
                className="accent-white"
                checked={!!progress.proctored}
                onChange={(e) => setProctored(userId, e.target.checked)}
              />
              <span>Proctored (instructor)</span>
            </label>
            <div className="text-[10px] opacity-75 mt-0.5">
              Stamps certificates as Proctored.
            </div>
          </div>
        </div>
      </div>

      <ProgramDashboard
        overview={overview}
        loading={overviewLoading}
        error={overviewError}
        syncAvailable={syncAvailable}
        onCreatePlan={handleCreatePlan}
        onRefresh={loadOverview}
        onOpenSection={setActiveId}
        onCompleteMilestone={handleCompleteMilestone}
        actionBusy={programBusy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={`workforce-tool-card text-left p-4 rounded-xl border bg-white dark:bg-slate-800/70 hover:shadow-md transition ${
              s.feature
                ? 'border-teal-500 ring-2 ring-teal-200 dark:ring-teal-900'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-base font-bold text-slate-900 dark:text-slate-100">
              {s.title}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {s.subtitle}
            </p>
            <SectionProgressChip section={s} dl={progress.dl} />
            {s.feature ? (
              <div className="mt-2 text-[11px] uppercase tracking-wide font-semibold text-teal-700 dark:text-teal-300">
                Required for Digital Ready
              </div>
            ) : null}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 p-4 text-xs text-slate-600 dark:text-slate-300">
        <strong>About these certificates:</strong> Modules are aligned to the{' '}
        <em>Core Digital Skills</em> standards (17 modules, Foundation badge)
        plus 5 modern modules unique to this program (Pro badge). Mastery
        requires 85% on the in-app assessment. Self-paced by default;
        instructors can flip Proctored mode on for supervised sessions.
      </div>
    </div>
  );
}
