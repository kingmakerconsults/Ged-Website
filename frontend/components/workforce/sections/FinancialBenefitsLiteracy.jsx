import React, { useMemo, useState } from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

const TABS = [
  { id: 'paystub', label: 'Paystub Reader' },
  { id: 'forms', label: 'W-4 / I-9' },
  { id: 'budget', label: 'Budget 50/30/20' },
  { id: '401k', label: '401(k) Match' },
  { id: 'health', label: 'Health Plan Picker' },
];

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const PAYSTUB_FIELDS = [
  { key: 'gross', label: 'Gross Pay', value: '$2,000.00', def: 'Total earnings before any deductions. This is what you earned this pay period.' },
  { key: 'fed', label: 'Federal Income Tax', value: '-$185.00', def: 'Withheld for the IRS based on your W-4. Adjusted at tax time when you file.' },
  { key: 'fica_ss', label: 'Social Security (FICA)', value: '-$124.00', def: '6.2% of gross. Funds Social Security retirement and disability.' },
  { key: 'fica_med', label: 'Medicare (FICA)', value: '-$29.00', def: '1.45% of gross. Funds Medicare health insurance for retirees.' },
  { key: 'state', label: 'State Income Tax', value: '-$70.00', def: 'Varies by state. Some states have no state income tax (TX, FL, WA, etc.).' },
  { key: 'med_pre', label: 'Health Insurance (pre-tax)', value: '-$120.00', def: 'Your share of the health premium. Pre-tax means it lowers your taxable income.' },
  { key: '401k', label: '401(k) Contribution', value: '-$100.00', def: 'Retirement savings from this paycheck. Pre-tax (traditional) lowers taxable income now.' },
  { key: 'net', label: 'Net Pay (take-home)', value: '$1,372.00', def: 'What lands in your bank account. Gross minus all deductions.' },
  { key: 'ytd', label: 'Year-to-Date (YTD)', value: '$26,000', def: 'Running totals for the calendar year. Useful at tax time.' },
];

function PaystubReader() {
  const [active, setActive] = useState('gross');
  const item = PAYSTUB_FIELDS.find((p) => p.key === active);
  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">Click a line on the paystub to see what it means.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 text-xs font-bold uppercase tracking-wide">Sample Paystub - 2 weeks</div>
          <table className="w-full text-sm">
            <tbody>
              {PAYSTUB_FIELDS.map((f) => (
                <tr key={f.key} className={`border-b border-slate-100 dark:border-slate-800 ${active === f.key ? 'bg-teal-50 dark:bg-teal-900/30' : ''}`}>
                  <td className="px-3 py-2">
                    <button type="button" onClick={() => setActive(f.key)} className="text-left w-full hover:underline">
                      {f.label}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right font-mono">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border bg-teal-50 dark:bg-teal-900/20 p-4">
          <div className="text-xs uppercase tracking-wide font-bold text-teal-700 dark:text-teal-300">{item.label}</div>
          <div className="text-2xl font-mono mt-1">{item.value}</div>
          <p className="text-sm mt-3">{item.def}</p>
        </div>
      </div>
    </div>
  );
}

const FORM_STEPS = [
  { id: 'w4_1', form: 'W-4', step: 'Personal info', detail: 'Name, address, SSN, filing status (single, married, head of household).' },
  { id: 'w4_2', form: 'W-4', step: 'Multiple jobs / spouse works', detail: 'Use the worksheet OR check the box if both jobs pay similarly. Affects withholding accuracy.' },
  { id: 'w4_3', form: 'W-4', step: 'Dependents', detail: 'Multiply qualifying children under 17 by $2,000. Other dependents by $500.' },
  { id: 'w4_4', form: 'W-4', step: 'Other adjustments (optional)', detail: 'Extra withholding, other income, deductions beyond standard.' },
  { id: 'w4_5', form: 'W-4', step: 'Sign and date', detail: 'Required. Submit to employer (not the IRS).' },
  { id: 'i9_1', form: 'I-9', step: 'Section 1 - You fill out', detail: 'Identity, citizenship/work authorization. Must be done by your first day.' },
  { id: 'i9_2', form: 'I-9', step: 'Documents', detail: 'Either one List A doc (passport) OR one List B (driver license) + one List C (SS card, birth cert).' },
  { id: 'i9_3', form: 'I-9', step: 'Section 2 - Employer fills out', detail: 'Within 3 business days. They examine your originals (no photocopies sent in).' },
];

function FormsWalkthrough() {
  const [done, setDone] = useState({});
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <div className="space-y-3 max-w-3xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Two forms you fill out on day one. W-4 tells the employer how much federal tax to withhold. I-9 proves you can legally work in the US.
      </p>
      <div className="text-xs text-slate-500">Checklist: {completed}/{FORM_STEPS.length}</div>
      <ol className="space-y-2">
        {FORM_STEPS.map((s) => (
          <li key={s.id} className="flex gap-3 p-3 rounded border bg-white dark:bg-slate-900">
            <input type="checkbox" checked={!!done[s.id]} onChange={(e) => setDone((d) => ({ ...d, [s.id]: e.target.checked }))} className="mt-1" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-teal-600">{s.form}</div>
              <div className="font-medium">{s.step}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{s.detail}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Budget() {
  const [takeHome, setTakeHome] = useState(3000);
  const needs = takeHome * 0.5;
  const wants = takeHome * 0.3;
  const savings = takeHome * 0.2;
  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        The 50/30/20 rule: 50% Needs, 30% Wants, 20% Savings & debt payoff. A starting point, not a law.
      </p>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Monthly take-home pay</span>
        <input type="number" value={takeHome} onChange={(e) => setTakeHome(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded border bg-white dark:bg-slate-900" />
      </label>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border p-3 bg-blue-50 dark:bg-blue-900/20">
          <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">Needs (50%)</div>
          <div className="text-2xl font-bold">{fmt(needs)}</div>
          <div className="text-xs text-slate-600 mt-1">Rent, groceries, utilities, transportation, insurance, minimum debt payments.</div>
        </div>
        <div className="rounded-xl border p-3 bg-amber-50 dark:bg-amber-900/20">
          <div className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">Wants (30%)</div>
          <div className="text-2xl font-bold">{fmt(wants)}</div>
          <div className="text-xs text-slate-600 mt-1">Dining out, streaming, hobbies, travel, brand upgrades.</div>
        </div>
        <div className="rounded-xl border p-3 bg-emerald-50 dark:bg-emerald-900/20">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Savings (20%)</div>
          <div className="text-2xl font-bold">{fmt(savings)}</div>
          <div className="text-xs text-slate-600 mt-1">Emergency fund, retirement contributions, extra debt payoff.</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 italic">If your needs exceed 50%, that's a structural problem (housing, transport). Cutting wants alone won't fix it.</p>
    </div>
  );
}

function Match401k() {
  const [salary, setSalary] = useState(50000);
  const [contribPct, setContribPct] = useState(6);
  const [matchPct, setMatchPct] = useState(3);
  const [years, setYears] = useState(30);

  const projection = useMemo(() => {
    const annualContrib = salary * (contribPct / 100);
    const annualMatch = salary * Math.min(contribPct, matchPct) / 100;
    const total = annualContrib + annualMatch;
    const r = 0.07;
    const points = [];
    let bal = 0;
    for (let y = 1; y <= years; y++) {
      bal = (bal + total) * (1 + r);
      points.push({ y, bal });
    }
    return { annualContrib, annualMatch, total, points };
  }, [salary, contribPct, matchPct, years]);

  const W = 400, H = 180;
  const max = projection.points.at(-1)?.bal || 1;
  const path = projection.points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(p.y / years) * W} ${H - (p.bal / max) * H}`)
    .join(' ');

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Your employer 401(k) match is free money. If you contribute below the match cap you are leaving compensation on the table.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Salary</span>
          <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">You contribute %</span>
          <input type="number" value={contribPct} min={0} max={100} onChange={(e) => setContribPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Employer match up to %</span>
          <input type="number" value={matchPct} min={0} max={100} onChange={(e) => setMatchPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Years</span>
          <input type="number" value={years} min={1} max={45} onChange={(e) => setYears(Number(e.target.value) || 1)} className="w-full px-2 py-1 rounded border bg-white dark:bg-slate-900" />
        </label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border p-3"><div className="text-xs uppercase text-slate-500">Your annual</div><div className="text-lg font-bold">{fmt(projection.annualContrib)}</div></div>
        <div className="rounded-lg border p-3 bg-emerald-50 dark:bg-emerald-900/20"><div className="text-xs uppercase text-emerald-700">Employer match</div><div className="text-lg font-bold">{fmt(projection.annualMatch)}</div></div>
        <div className="rounded-lg border p-3"><div className="text-xs uppercase text-slate-500">Total per year</div><div className="text-lg font-bold">{fmt(projection.total)}</div></div>
      </div>
      <div className="rounded-xl border p-4 bg-white dark:bg-slate-900">
        <div className="text-xs uppercase font-bold text-slate-500 mb-2">Projected balance over {years} years (assumes 7% annual return)</div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-48">
          <path d={path} fill="none" stroke="#0d9488" strokeWidth="3" />
        </svg>
        <div className="text-right text-2xl font-bold">{fmt(projection.points.at(-1)?.bal || 0)}</div>
      </div>
    </div>
  );
}

const HEALTH_QUIZ = [
  { id: 'q1', q: 'How often do you visit doctors?', options: [{ label: 'Rarely (1-2x/yr)', score: { HMO: 1, PPO: 0, HDHP: 3 } }, { label: 'Occasionally (3-6x/yr)', score: { HMO: 2, PPO: 2, HDHP: 1 } }, { label: 'Often / chronic condition', score: { HMO: 2, PPO: 3, HDHP: 0 } }] },
  { id: 'q2', q: 'How important is low monthly premium?', options: [{ label: 'Critical', score: { HMO: 2, PPO: 0, HDHP: 3 } }, { label: 'Somewhat', score: { HMO: 2, PPO: 1, HDHP: 2 } }, { label: 'Not very', score: { HMO: 1, PPO: 3, HDHP: 1 } }] },
  { id: 'q3', q: 'Do you want a wide doctor network?', options: [{ label: 'Yes - flexibility matters', score: { HMO: 0, PPO: 3, HDHP: 2 } }, { label: 'No - I have local doctors', score: { HMO: 3, PPO: 1, HDHP: 1 } }] },
  { id: 'q4', q: 'Could you cover a $3,000-5,000 deductible if needed?', options: [{ label: 'Yes, easily', score: { HMO: 1, PPO: 1, HDHP: 3 } }, { label: 'Maybe', score: { HMO: 2, PPO: 2, HDHP: 1 } }, { label: 'No', score: { HMO: 3, PPO: 2, HDHP: 0 } }] },
  { id: 'q5', q: 'Are you eligible for an HSA (tax-advantaged savings)?', options: [{ label: 'Yes and I want it', score: { HMO: 0, PPO: 0, HDHP: 3 } }, { label: 'Not interested', score: { HMO: 2, PPO: 2, HDHP: 0 } }] },
];

const PLAN_INFO = {
  HMO: { name: 'HMO', desc: 'Lower premium, narrower network, need referrals. Good if you\u2019re generally healthy and OK with one primary care doctor coordinating care.' },
  PPO: { name: 'PPO', desc: 'Higher premium, wide network, no referrals needed. Good if you see specialists, travel a lot, or want flexibility.' },
  HDHP: { name: 'HDHP + HSA', desc: 'Lowest premium, high deductible, pairs with a tax-advantaged HSA. Good if you rarely use care AND can absorb a big bill.' },
};

function HealthPlan() {
  const [answers, setAnswers] = useState({});
  const allAnswered = HEALTH_QUIZ.every((q) => answers[q.id] != null);
  const scores = useMemo(() => {
    const acc = { HMO: 0, PPO: 0, HDHP: 0 };
    HEALTH_QUIZ.forEach((q) => {
      const idx = answers[q.id];
      if (idx == null) return;
      const s = q.options[idx].score;
      Object.keys(acc).forEach((k) => { acc[k] += s[k] || 0; });
    });
    return acc;
  }, [answers]);
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-sm text-slate-600 dark:text-slate-400">Answer 5 quick questions for a starter recommendation. This is not medical or financial advice.</p>
      <ol className="space-y-3">
        {HEALTH_QUIZ.map((q, i) => (
          <li key={q.id} className="rounded border p-3 bg-white dark:bg-slate-900">
            <div className="font-medium mb-2">{i + 1}. {q.q}</div>
            <div className="flex flex-col gap-1">
              {q.options.map((o, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input type="radio" name={q.id} checked={answers[q.id] === idx} onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))} />
                  {o.label}
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {allAnswered ? (
        <div className="rounded-xl border-2 border-teal-400 bg-teal-50 dark:bg-teal-900/20 p-4">
          <div className="text-xs uppercase tracking-wide text-teal-700 dark:text-teal-300 font-bold">Starter recommendation</div>
          <div className="text-2xl font-bold">{PLAN_INFO[winner].name}</div>
          <p className="text-sm mt-1">{PLAN_INFO[winner].desc}</p>
          <div className="text-xs text-slate-600 mt-2">Scores - HMO: {scores.HMO} | PPO: {scores.PPO} | HDHP: {scores.HDHP}</div>
        </div>
      ) : <div className="text-sm italic text-slate-500">Answer all 5 to see a recommendation.</div>}
    </div>
  );
}

export default function FinancialBenefitsLiteracy({ onBack }) {
  const [tab, setTab] = useState('paystub');
  return (
    <WorkforceSectionFrame title="Financial & Benefits Literacy" subtitle="Decode your paystub, fill out W-4/I-9, budget, 401(k) match, and pick a health plan." onBack={onBack}>
      <div className="px-4 pb-4">
        <nav className="flex flex-wrap gap-2 mb-4">
          {TABS.map((t) => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${tab === t.id ? 'bg-teal-600 text-white border-teal-700' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </nav>
        {tab === 'paystub' && <PaystubReader />}
        {tab === 'forms' && <FormsWalkthrough />}
        {tab === 'budget' && <Budget />}
        {tab === '401k' && <Match401k />}
        {tab === 'health' && <HealthPlan />}
      </div>
    </WorkforceSectionFrame>
  );
}
