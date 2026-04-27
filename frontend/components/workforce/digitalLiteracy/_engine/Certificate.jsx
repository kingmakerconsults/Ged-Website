/**
 * Certificate.jsx — printable certificate component for individual modules
 * and the master Foundation/Pro tier badges.
 */
import React from 'react';

function fmtDate(iso) {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ModuleCertificate({
  moduleTitle,
  standardId,
  standardLabel,
  learnerName,
  score,
  proctored = false,
  issuedAt,
}) {
  return (
    <div
      className="mod-cert mx-auto bg-white text-slate-900 p-10 rounded-xl shadow-xl border-4 border-teal-700 print:shadow-none print:border-2"
      style={{ maxWidth: 720 }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-teal-700">
          Mr. Smith&apos;s Learning Canvas · Workforce Readiness
        </div>
        <h1 className="text-3xl font-extrabold mt-2">Certificate of Mastery</h1>
        <div className="text-sm mt-1">Digital Literacy Academy</div>
        <hr className="my-5 border-teal-700" />
        <div className="text-sm">This certifies that</div>
        <div className="text-2xl font-bold mt-1">
          {learnerName || 'Learner'}
        </div>
        <div className="text-sm mt-3">demonstrated mastery of</div>
        <div className="text-xl font-semibold mt-1">{moduleTitle}</div>
        <div className="text-xs text-slate-500 mt-1">
          Aligned to standard <strong>{standardId}</strong>
          {standardLabel ? ` — ${standardLabel}` : ''}
        </div>
        <div className="mt-6 flex justify-center gap-10 text-sm">
          <div>
            <div className="text-xs uppercase opacity-60">Score</div>
            <div className="font-bold text-lg">{score}%</div>
          </div>
          <div>
            <div className="text-xs uppercase opacity-60">Date</div>
            <div className="font-bold text-lg">{fmtDate(issuedAt)}</div>
          </div>
          <div>
            <div className="text-xs uppercase opacity-60">Mode</div>
            <div className="font-bold text-lg">
              {proctored ? 'Proctored' : 'Self-paced'}
            </div>
          </div>
        </div>
        <hr className="my-5 border-teal-700" />
        <div className="text-xs text-slate-500">
          Verify by re-taking the module — mastery requires 85% on the in-app
          assessment.
        </div>
      </div>
    </div>
  );
}

export function TierCertificate({
  tier, // 'foundation' | 'pro'
  learnerName,
  modulesCovered, // array of { id, title }
  proctored = false,
  issuedAt,
}) {
  const isPro = tier === 'pro';
  return (
    <div
      className="tier-cert mx-auto bg-gradient-to-br from-white to-teal-50 text-slate-900 p-10 rounded-xl shadow-xl border-4 border-teal-800 print:shadow-none print:border-2"
      style={{ maxWidth: 800 }}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-teal-800">
          Mr. Smith&apos;s Learning Canvas
        </div>
        <h1 className="text-3xl font-extrabold mt-2">
          Digital Ready {isPro ? 'Pro' : 'Foundation'}
        </h1>
        <div className="text-sm mt-1">
          {isPro
            ? 'Pro Track — full digital + modern workforce mastery'
            : 'Core Digital Skills standards — all 17 standards mastered'}
        </div>
        <hr className="my-5 border-teal-800" />
        <div className="text-sm">Awarded to</div>
        <div className="text-2xl font-bold mt-1">
          {learnerName || 'Learner'}
        </div>
        <div className="text-sm mt-2">
          for demonstrating mastery on {modulesCovered.length} module
          {modulesCovered.length === 1 ? '' : 's'} on {fmtDate(issuedAt)}
          {proctored ? ' (Proctored)' : ''}.
        </div>
        <details className="mt-4 text-left text-xs">
          <summary className="cursor-pointer text-teal-800 font-semibold">
            Standards covered
          </summary>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            {modulesCovered.map((m) => (
              <li key={m.id} className="flex gap-2">
                <span className="font-mono opacity-60">{m.id}</span>
                <span>{m.title}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

export function PrintButton({ targetId = null, label = 'Print certificate' }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (targetId && typeof window !== 'undefined') {
          // Add a body class so print CSS can scope to the cert if needed.
          document.body.classList.add('printing-certificate');
          window.print();
          setTimeout(
            () => document.body.classList.remove('printing-certificate'),
            500
          );
        } else if (typeof window !== 'undefined') {
          window.print();
        }
      }}
      className="px-4 py-2 rounded-md bg-teal-700 text-white font-semibold hover:bg-teal-800"
    >
      🖨 {label}
    </button>
  );
}
