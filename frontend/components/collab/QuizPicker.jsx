// Subject -> Category -> Topic -> Quiz cascading picker.
// Loads the catalog once from /api/all-quizzes and exposes the chosen
// (subject, categoryName, topicTitle, quizId) via onChange. Used by
// CollabView (manual session creation) and InstructorClassView (curriculum
// item creation).
import React, { useEffect, useMemo, useState } from 'react';
import { getApiBaseUrl } from '../../src/utils/apiBase.js';

const SUBJECT_LABELS = {
  math: 'Math',
  rla: 'Reasoning Through Language Arts (RLA)',
  science: 'Science',
  social: 'Social Studies',
  workforce: 'Workforce Readiness',
};

function collectTopicQuizzes(topic) {
  const out = [];
  if (Array.isArray(topic?.quizzes)) {
    for (const q of topic.quizzes) {
      if (q && Array.isArray(q.questions) && q.questions.length > 0) {
        out.push({
          id: q.quizId || q.id,
          title: q.title || q.quizId || 'Untitled Quiz',
          count: q.questions.length,
        });
      }
    }
  }
  if (
    out.length === 0 &&
    Array.isArray(topic?.questions) &&
    topic.questions.length > 0
  ) {
    out.push({
      id: topic.id || topic.title,
      title: topic.title || topic.id || 'Untitled Quiz',
      count: topic.questions.length,
    });
  }
  return out;
}

function categoryHasQuizzes(cat) {
  if (!cat) return false;
  for (const t of cat.topics || []) {
    if (collectTopicQuizzes(t).length > 0) return true;
  }
  if (Array.isArray(cat.quizzes)) {
    for (const q of cat.quizzes) {
      if (q && Array.isArray(q.questions) && q.questions.length > 0)
        return true;
    }
  }
  return false;
}

export default function QuizPicker({
  value,
  onChange,
  inputCls = 'w-full px-3 py-2 border rounded',
  labelCls = 'block text-sm font-medium mb-1',
}) {
  const apiBase = useMemo(() => getApiBaseUrl(), []);
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${apiBase}/api/all-quizzes`);
        const data = res.ok ? await res.json() : {};
        if (alive) setCatalog(data || {});
      } catch (_) {
        if (alive) setCatalog({});
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [apiBase]);

  const subjectsWithQuizzes = useMemo(() => {
    if (!catalog) return [];
    const out = [];
    for (const [key, label] of Object.entries(SUBJECT_LABELS)) {
      const data = catalog[label];
      if (!data) continue;
      const cats = data.categories || {};
      if (Object.values(cats).some(categoryHasQuizzes)) {
        out.push({ key, label });
      }
    }
    return out;
  }, [catalog]);

  const subjectData = useMemo(() => {
    if (!catalog || !value?.subject) return null;
    const label = SUBJECT_LABELS[value.subject];
    return label ? catalog[label] || null : null;
  }, [catalog, value?.subject]);

  const categoryOptions = useMemo(() => {
    const cats = subjectData?.categories || {};
    return Object.keys(cats).filter((name) => categoryHasQuizzes(cats[name]));
  }, [subjectData]);

  const topicOptions = useMemo(() => {
    if (!subjectData || !value?.categoryName) return [];
    const cat = subjectData.categories?.[value.categoryName];
    if (!cat) return [];
    return (cat.topics || [])
      .filter((t) => collectTopicQuizzes(t).length > 0)
      .map((t) => ({ id: t.id, title: t.title || t.id }));
  }, [subjectData, value?.categoryName]);

  const quizOptions = useMemo(() => {
    if (!subjectData || !value?.categoryName) return [];
    const cat = subjectData.categories?.[value.categoryName];
    if (!cat) return [];
    if (value?.topicTitle) {
      const topic = (cat.topics || []).find(
        (t) => t.title === value.topicTitle || t.id === value.topicTitle
      );
      if (topic) return collectTopicQuizzes(topic);
    }
    if (Array.isArray(cat.quizzes)) {
      return cat.quizzes
        .filter(
          (q) => q && Array.isArray(q.questions) && q.questions.length > 0
        )
        .map((q) => ({
          id: q.quizId || q.id,
          title: q.title || q.quizId,
          count: q.questions.length,
        }));
    }
    return [];
  }, [subjectData, value?.categoryName, value?.topicTitle]);

  const set = (patch) => onChange?.({ ...(value || {}), ...patch });

  if (loading) return <div className="text-sm">Loading quiz catalog…</div>;

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Subject</label>
        <select
          className={inputCls}
          value={value?.subject || ''}
          onChange={(e) =>
            set({
              subject: e.target.value,
              categoryName: '',
              topicTitle: '',
              quizId: '',
            })
          }
        >
          <option value="">Choose subject…</option>
          {subjectsWithQuizzes.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      {value?.subject && (
        <div>
          <label className={labelCls}>Category</label>
          <select
            className={inputCls}
            value={value?.categoryName || ''}
            onChange={(e) =>
              set({
                categoryName: e.target.value,
                topicTitle: '',
                quizId: '',
              })
            }
          >
            <option value="">Choose category…</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      )}
      {value?.categoryName && topicOptions.length > 0 && (
        <div>
          <label className={labelCls}>Topic</label>
          <select
            className={inputCls}
            value={value?.topicTitle || ''}
            onChange={(e) => set({ topicTitle: e.target.value, quizId: '' })}
          >
            <option value="">Choose topic…</option>
            {topicOptions.map((t) => (
              <option key={t.id} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      )}
      {(value?.topicTitle || value?.categoryName) && quizOptions.length > 0 && (
        <div>
          <label className={labelCls}>Quiz</label>
          <select
            className={inputCls}
            value={value?.quizId || ''}
            onChange={(e) => {
              const id = e.target.value;
              const opt = quizOptions.find((q) => q.id === id);
              set({ quizId: id, quizTitle: opt?.title || '' });
            }}
          >
            <option value="">Choose quiz…</option>
            {quizOptions.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title} ({q.count} questions)
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
