import React, { useState } from 'react';

/**
 * ReportQuestionButton — small inline link + modal for flagging
 * problematic quiz questions. Posts to POST /api/question-reports.
 *
 * Usage:
 *   <ReportQuestionButton
 *     question={currentQ}
 *     quizCode={quiz?.quizCode}
 *     quizTitle={quiz?.title}
 *     subject={subject}
 *     source={quiz?.isAi ? 'ai' : quiz?.isPremade ? 'premade' : 'practice'}
 *     questionIndex={currentIndex}
 *   />
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

const REASONS = [
  { v: 'incorrect_answer', l: 'Wrong / disputed answer' },
  { v: 'ambiguous', l: 'Ambiguous or unclear' },
  { v: 'typo', l: 'Typo or formatting issue' },
  { v: 'broken_image', l: 'Image missing or broken' },
  { v: 'off_topic', l: 'Not relevant to GED topic' },
  { v: 'duplicate', l: 'Duplicate of another question' },
  { v: 'offensive', l: 'Offensive or inappropriate' },
  { v: 'other', l: 'Something else' },
];

function extractStem(question) {
  if (!question || typeof question !== 'object') return '';
  const candidates = [
    question.questionText,
    question.question,
    question.stem,
    question.prompt,
    question.text,
  ];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
  }
  // Last resort: stringify a tiny preview
  try {
    return JSON.stringify(question).slice(0, 800);
  } catch {
    return '';
  }
}

export default function ReportQuestionButton({
  question,
  quizCode = null,
  quizTitle = null,
  subject = null,
  source = 'unknown',
  questionIndex = null,
  attemptId = null,
}) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setReason('');
    setDetails('');
    setError('');
    setSubmitted(false);
    setSubmitting(false);
  };

  const close = () => {
    setOpen(false);
    // reset after the close transition
    setTimeout(reset, 150);
  };

  const submit = async () => {
    if (!reason) {
      setError('Please pick a reason.');
      return;
    }
    const token = getAuthToken();
    if (!token) {
      setError('You must be signed in to report a question.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        questionId:
          (question &&
            (question.id ||
              question.questionId ||
              question.qnum ||
              question.questionNumber)) ||
          null,
        questionIndex,
        attemptId,
        quizCode,
        quizTitle,
        subject,
        source,
        reason,
        details: details.trim() || null,
        questionText: extractStem(question),
      };
      const res = await fetch(`${getApiBase()}/api/question-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.warn('[ReportQuestion] submit failed', err?.message || err);
      setError('Could not send report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Report this question"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#64748b',
          fontSize: 12,
          textDecoration: 'underline',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        ⚑ Report this question
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Report this question"
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
            if (e.target === e.currentTarget) close();
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
              Report this question
            </h3>
            <p
              style={{
                fontSize: 13,
                color: '#475569',
                marginBottom: 14,
              }}
            >
              Thanks for helping us improve. An admin will review your report.
            </p>

            {submitted ? (
              <>
                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 16,
                    fontSize: 14,
                  }}
                >
                  Report submitted. Thank you!
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={close}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: 'none',
                      background: '#0ea5e9',
                      color: '#ffffff',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    What's wrong?
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 6,
                    }}
                  >
                    {REASONS.map((opt) => {
                      const selected = reason === opt.v;
                      return (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => setReason(opt.v)}
                          style={{
                            textAlign: 'left',
                            padding: '6px 10px',
                            borderRadius: 8,
                            border: selected
                              ? '2px solid #0ea5e9'
                              : '1px solid #cbd5e1',
                            background: selected ? '#e0f2fe' : '#ffffff',
                            color: selected ? '#0c4a6e' : '#334155',
                            fontWeight: 500,
                            fontSize: 13,
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
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Add detail (optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value.slice(0, 1500))}
                    rows={3}
                    placeholder="e.g. The answer key says B but A is also correct because…"
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
                  <div
                    style={{
                      fontSize: 11,
                      color: '#94a3b8',
                      textAlign: 'right',
                    }}
                  >
                    {details.length}/1500
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

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={close}
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
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submit}
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
                    {submitting ? 'Sending…' : 'Send report'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
