import React, { useEffect, useState } from 'react';

function getApiBase() {
  if (
    typeof window !== 'undefined' &&
    typeof window.API_BASE_URL === 'string'
  ) {
    return window.API_BASE_URL || '';
  }
  return '';
}

function getAuthToken() {
  try {
    return (
      (typeof localStorage !== 'undefined' &&
        localStorage.getItem('appToken')) ||
      ''
    );
  } catch {
    return '';
  }
}

async function fetchJson(path) {
  const token = getAuthToken();
  const res = await fetch(`${getApiBase()}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    let suffix = '';
    try {
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        const parts = [];
        if (j?.error) parts.push(j.error);
        if (j?.detail && j.detail !== j?.error) parts.push(j.detail);
        if (!parts.length && j?.message) parts.push(j.message);
        if (parts.length) suffix = `: ${parts.join(' — ')}`;
        else if (text) suffix = `: ${text}`;
      } catch {
        if (text) suffix = `: ${text}`;
      }
    } catch {
      /* ignore */
    }
    throw new Error(`${path} → ${res.status}${suffix}`);
  }
  return res.json();
}

function pct(num, denom) {
  if (!denom) return 0;
  return Math.round((Number(num) / Number(denom)) * 100);
}

const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
};

const headerStyle = {
  fontSize: 13,
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: 10,
};

function MasteryCard({ mastery }) {
  if (!mastery || mastery.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={headerStyle}>Subject Mastery</div>
        <div style={{ color: '#64748b', fontSize: 13 }}>
          No quiz attempts yet.
        </div>
      </div>
    );
  }
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Subject Mastery</div>
      <table style={{ width: '100%', fontSize: 13 }}>
        <thead>
          <tr style={{ color: '#64748b', textAlign: 'left' }}>
            <th style={{ padding: '4px 0' }}>Subject</th>
            <th style={{ padding: '4px 0' }}>Attempts</th>
            <th style={{ padding: '4px 0' }}>Avg %</th>
            <th style={{ padding: '4px 0' }}>Last attempt</th>
          </tr>
        </thead>
        <tbody>
          {mastery.map((row) => (
            <tr
              key={row.subject || 'none'}
              style={{ borderTop: '1px solid #f1f5f9' }}
            >
              <td style={{ padding: '6px 0' }}>{row.subject || '—'}</td>
              <td>{row.attempts}</td>
              <td>
                {row.avg_ratio != null
                  ? `${Math.round(Number(row.avg_ratio) * 100)}%`
                  : '—'}
              </td>
              <td>
                {row.last_attempt_at
                  ? new Date(row.last_attempt_at).toLocaleDateString()
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WeakAreasCard({ weakAreas }) {
  if (!weakAreas || weakAreas.length === 0) return null;
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Weakest Areas</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {weakAreas.map((a, i) => {
          const accuracyPct = pct(
            (Number(a.attempted) || 0) - (Number(a.missed) || 0),
            a.attempted
          );
          const color =
            accuracyPct >= 70
              ? '#059669'
              : accuracyPct >= 50
                ? '#d97706'
                : '#dc2626';
          return (
            <li
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 0',
                fontSize: 13,
                borderTop: i === 0 ? 'none' : '1px solid #f1f5f9',
              }}
            >
              <span>{a.area}</span>
              <span style={{ color, fontFamily: 'monospace' }}>
                {a.missed}/{a.attempted} missed ({accuracyPct}%)
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function VocabularyCard({ vocabulary }) {
  const subjects = vocabulary?.subjects || [];
  const struggling = vocabulary?.strugglingTerms || [];
  if (subjects.length === 0 && struggling.length === 0) return null;
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Vocabulary</div>
      {subjects.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          {subjects.map((s) => (
            <div
              key={s.subject || 'none'}
              style={{ fontSize: 13, marginBottom: 4 }}
            >
              <strong>{s.subject || '—'}:</strong> {s.correct}/{s.attempts} (
              {pct(s.correct, s.attempts)}%)
            </div>
          ))}
        </div>
      )}
      {struggling.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>
            STRUGGLING TERMS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {struggling.slice(0, 20).map((t) => (
              <span
                key={`${t.subject}-${t.term}`}
                title={`${t.correct}/${t.attempts} correct`}
                style={{
                  background: '#fef2f2',
                  color: '#b91c1c',
                  border: '1px solid #fecaca',
                  borderRadius: 999,
                  padding: '2px 8px',
                  fontSize: 12,
                }}
              >
                {t.term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EssayCard({ essay }) {
  const summary = essay?.summary;
  if (!summary || !summary.attempts) return null;
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Essay</div>
      <div style={{ fontSize: 13 }}>
        {summary.attempts} essay{summary.attempts === 1 ? '' : 's'} · avg{' '}
        {summary.avg_total != null ? Number(summary.avg_total).toFixed(1) : '—'}
        /6
        {summary.avg_words
          ? ` · ${Math.round(summary.avg_words)} words avg`
          : ''}
      </div>
      <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
        Argument {summary.avg_t1 != null ? summary.avg_t1.toFixed(1) : '—'} ·
        Organization {summary.avg_t2 != null ? summary.avg_t2.toFixed(1) : '—'}{' '}
        · Conventions {summary.avg_t3 != null ? summary.avg_t3.toFixed(1) : '—'}
      </div>
    </div>
  );
}

function SurveysCard({ surveys }) {
  const sum = surveys?.summary;
  const recent = surveys?.recent || [];
  if (!sum || !sum.responses) return null;
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Self-Reported Feedback</div>
      <div style={{ fontSize: 13, marginBottom: 8 }}>
        {sum.responses} response{sum.responses === 1 ? '' : 's'} · avg
        difficulty{' '}
        {sum.avg_difficulty != null
          ? Number(sum.avg_difficulty).toFixed(1)
          : '—'}
        /5 · avg confidence{' '}
        {sum.avg_confidence != null
          ? Number(sum.avg_confidence).toFixed(1)
          : '—'}
        /5
      </div>
      {recent.filter((r) => r.free_text).length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>
            RECENT NOTES
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {recent
              .filter((r) => r.free_text)
              .slice(0, 5)
              .map((r) => (
                <li
                  key={r.id}
                  style={{ fontSize: 12, color: '#334155', marginBottom: 4 }}
                >
                  “{r.free_text}”{' '}
                  <span style={{ color: '#94a3b8' }}>
                    — {r.subject || 'Quiz'} ·{' '}
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function RecentAttemptsCard({ attempts }) {
  if (!attempts || attempts.length === 0) return null;
  return (
    <div style={cardStyle}>
      <div style={headerStyle}>Recent Attempts (last 50)</div>
      <table style={{ width: '100%', fontSize: 12 }}>
        <thead>
          <tr style={{ color: '#64748b', textAlign: 'left' }}>
            <th style={{ padding: '4px 0' }}>Date</th>
            <th>Subject</th>
            <th>Quiz</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {attempts.slice(0, 25).map((a) => (
            <tr key={a.id} style={{ borderTop: '1px solid #f1f5f9' }}>
              <td style={{ padding: '4px 0' }}>
                {new Date(a.attempted_at).toLocaleDateString()}
              </td>
              <td>{a.subject || '—'}</td>
              <td title={a.quiz_id || ''}>
                {(a.quiz_id || a.quiz_type || '').slice(0, 24)}
              </td>
              <td style={{ fontFamily: 'monospace' }}>
                {a.score}/{a.total_questions}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InstructorStudentDetail({ student, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!student?.id) return undefined;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchJson(`/api/instructor/students/${student.id}/stats`)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [student?.id]);

  return (
    <div
      role="dialog"
      aria-label="Student detail"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.55)',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        style={{
          background: '#f8fafc',
          color: '#0f172a',
          borderRadius: 16,
          maxWidth: 760,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 24,
          boxShadow: '0 20px 50px rgba(15,23,42,0.35)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
              {student.name || student.email || `Student #${student.id}`}
            </h2>
            <div style={{ color: '#64748b', fontSize: 13 }}>
              {student.email}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
        {loading && (
          <div style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>
            Loading…
          </div>
        )}
        {error && (
          <div
            style={{
              padding: 12,
              background: '#fef2f2',
              color: '#b91c1c',
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            Failed to load: {error}
          </div>
        )}
        {data && !loading && (
          <>
            <MasteryCard mastery={data.mastery} />
            <WeakAreasCard weakAreas={data.weakAreas} />
            <VocabularyCard vocabulary={data.vocabulary} />
            <EssayCard essay={data.essay} />
            <SurveysCard surveys={data.surveys} />
            <RecentAttemptsCard attempts={data.attempts} />
          </>
        )}
      </div>
    </div>
  );
}
