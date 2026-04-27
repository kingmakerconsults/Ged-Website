import React, { useMemo, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';
import { CAREERS, INTERESTS, EDUCATION_LEVELS } from './data/careers.js';

const fmtMoney = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function CareerCard({ career, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(career)}
      className="text-left rounded-xl border bg-white dark:bg-slate-900 p-4 hover:shadow-lg hover:border-teal-400 transition"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold">{career.title}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">{career.interest}</span>
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{career.description}</div>
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="font-mono">{fmtMoney(career.medianWage)} median</span>
        <span className="text-slate-500">{EDUCATION_LEVELS.find((e) => e.key === career.education)?.label || career.education}</span>
      </div>
    </button>
  );
}

function CareerModal({ career, onClose }) {
  if (!career) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">{career.interest}</div>
            <h3 className="text-2xl font-bold">{career.title}</h3>
            <div className="text-sm font-mono mt-1">{fmtMoney(career.medianWage)} median - {EDUCATION_LEVELS.find((e) => e.key === career.education)?.label}</div>
          </div>
          <button type="button" onClick={onClose} className="text-2xl leading-none">x</button>
        </div>
        <p className="text-base mb-3">{career.description}</p>
        <section className="mb-3">
          <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500">A day in the life</h4>
          <p className="text-sm">{career.dayInLife}</p>
        </section>
        <section className="mb-3">
          <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500">Common tasks</h4>
          <ul className="text-sm list-disc pl-5">{career.tasks.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section className="mb-3">
          <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500">How to get in</h4>
          <p className="text-sm">{career.pathway}</p>
        </section>
        {career.relatedModules?.length > 0 ? (
          <section>
            <h4 className="font-bold text-sm uppercase tracking-wide text-slate-500">Related Core Digital Skills modules</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {career.relatedModules.map((m) => (
                <code key={m} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">{m}</code>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default function CareerPathwaysExplorer({ onBack }) {
  const [interest, setInterest] = useState('All');
  const [education, setEducation] = useState('Any');
  const [maxWage, setMaxWage] = useState(80000);
  const [minWage, setMinWage] = useState(0);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    return CAREERS.filter((c) => {
      if (interest !== 'All' && c.interest !== interest) return false;
      if (education !== 'Any' && c.education !== education) return false;
      if (c.medianWage < minWage || c.medianWage > maxWage) return false;
      if (search && !(`${c.title} ${c.description}`.toLowerCase().includes(search.toLowerCase()))) return false;
      return true;
    });
  }, [interest, education, minWage, maxWage, search]);

  return (
    <WorkforceSectionFrame title="Career Pathways Explorer" subtitle="Filter careers by interest, education, and wage. Click for day-in-the-life details." onBack={onBack}>
      <div className="px-4 pb-6 grid md:grid-cols-4 gap-4">
        <aside className="md:col-span-1 space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Search</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="title or keyword" className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Interest</label>
            <select value={interest} onChange={(e) => setInterest(e.target.value)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900">
              <option value="All">All</option>
              {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Education</label>
            <select value={education} onChange={(e) => setEducation(e.target.value)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900">
              <option value="Any">Any</option>
              {EDUCATION_LEVELS.map((e) => <option key={e.key} value={e.key}>{e.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Min median wage: {fmtMoney(minWage)}</label>
            <input type="range" min={0} max={80000} step={5000} value={minWage} onChange={(e) => setMinWage(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">Max median wage: {fmtMoney(maxWage)}</label>
            <input type="range" min={20000} max={80000} step={5000} value={maxWage} onChange={(e) => setMaxWage(Number(e.target.value))} className="w-full" />
          </div>
          <div className="text-xs text-slate-500">{filtered.length} of {CAREERS.length} careers</div>
        </aside>

        <main className="md:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-sm italic text-slate-500 p-4 border border-dashed rounded">No careers match. Try widening filters.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {filtered.map((c) => <CareerCard key={c.id} career={c} onOpen={setActive} />)}
            </div>
          )}
        </main>
      </div>
      <CareerModal career={active} onClose={() => setActive(null)} />
    </WorkforceSectionFrame>
  );
}
