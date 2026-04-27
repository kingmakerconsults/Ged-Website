import React, { useState } from 'react';

/**
 * PostQuizSurvey — short modal shown after a quiz submit.
 *
 * Three rating questions + one optional free-text. Skippable. Posts to
 * /api/quiz-surveys with the parent attemptId (if available).
 */

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

const SCALE_LABELS = {
  difficulty: ['Too easy', 'Easy', 'About right', 'Tough', 'Too hard'],
  confidence: ['Not at all', 'Slight', 'Some', 'Pretty', 'Very'],
};

function RatingRow({ name, value, onChange, labels }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            title={labels[n - 1]}
            style={{
              minWidth: 36,
              padding: '6px 10px',
              borderRadius: 999,
              border: selected ? '2px solid #0ea5e9' : '1px solid #cbd5e1',
              background: selected ? '#e0f2fe' : '#ffffff',
              color: selected ? '#0c4a6e' : '#334155',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {n}
          </button>
        );
      })}
      <span style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>
        {value ? labels[value - 1] : ''}
      </span>
    </div>
  );
}

export default function PostQuizSurvey({
  attemptId = null,
  subject = null,
  onClose,
  onSubmitted,
}) {
  const [difficulty, setDifficulty] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [pace, setPace] = useState('');
  const [freeText, setFreeText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hideSession, setHideSession] = useState(false);

  const close = (submitted) => {
    if (hideSession) {
      try {
        sessionStorage.setItem('postQuizSurveyDismissed', '1');
      } catch {}
    }
    if (typeof onClose === 'function') onClose(submitted);
  };

  const handleSubmit = async () => {
    if (!difficulty && !confidence && !pace && !freeText.trim()) {
      // Treat as skip
      close(false);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const token = getAuthToken();
      const base = getApiBase();
      const res = await fetch(`${base}/api/quiz-surveys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          attemptId,
          subject,
          difficultyRating: difficulty || null,
          confidenceRating: confidence || null,
          paceRating: pace || null,
          freeText: freeText.trim() || null,
        }),
      });
      if (!res.ok) throw new Error(`Survey POST failed: ${res.status}`);
      if (typeof onSubmitted === 'function') onSubmitted();
      close(true);
    } catch (err) {
      console.warn('[PostQuizSurvey] submit failed', err?.message || err);
      setError('Could not save your feedback — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Post-quiz feedback"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15,23,42,0.55)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(false);
      }}
    >
      <div
        style={{
          background: '#ffffff',
          color: '#0f172a',
          borderRadius: 16,
          maxWidth: 480,
          width: '100%',
          padding: 24,
          boxShadow: '0 20px 50px rgba(15,23,42,0.35)',
        }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          Quick check-in
        </h3>
        <p style={{ fontSize: 13, color: '#475569', marginBottom: 16 }}>
          30 seconds of feedback helps us tune your study plan.
          {subject ? ` (${subject})` : ''}
        </p>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            How hard did this quiz feel?
          </div>
          <RatingRow
            name="difficulty"
            value={difficulty}
            onChange={setDifficulty}
            labels={SCALE_LABELS.difficulty}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            How confident are you in your answers?
          </div>
          <RatingRow
            name="confidence"
            value={confidence}
            onChange={setConfidence}
            labels={SCALE_LABELS.confidence}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Pacing
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { v: 'too_slow', l: 'Too slow' },
              { v: 'just_right', l: 'Just right' },
              { v: 'too_fast', l: 'Too fast' },
            ].map((opt) => {
              const selected = pace === opt.v;
              return (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => setPace(opt.v)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 999,
                    border: selected
                      ? '2px solid #0ea5e9'
                      : '1px solid #cbd5e1',
                    background: selected ? '#e0f2fe' : '#ffffff',
                    color: selected ? '#0c4a6e' : '#334155',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {opt.l}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
              display: 'block',
            }}
          >
            Anything else? (optional)
          </label>
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value.slice(0, 500))}
            rows={3}
            placeholder="A topic you want to revisit, a confusing question, etc."
            style={{
              width: '100%',
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: 8,
              fontSize: 14,
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right' }}>
            {freeText.length}/500
          </div>
        </div>

        {error && (
          <div
            style={{
              fontSize: 13,
              color: '#b91c1c',
              background: '#fef2f2',
              padding: 8,
              borderRadius: 6,
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: '#475569',
            marginBottom: 12,
          }}
        >
          <input
            type="checkbox"
            checked={hideSession}
            onChange={(e) => setHideSession(e.target.checked)}
          />
          Don’t ask again this session
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            type="button"
            onClick={() => close(false)}
            disabled={submitting}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              background: '#0ea5e9',
              color: '#ffffff',
              fontWeight: 600,
              cursor: submitting ? 'wait' : 'pointer',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? 'Saving…' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
