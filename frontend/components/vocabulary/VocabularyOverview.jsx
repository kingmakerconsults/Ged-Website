const SubjectVisuals = window.SubjectVisuals || {};
const { SUBJECT_COLORS, SUBJECT_BG_GRADIENTS } = SubjectVisuals;

const vocabStyles = `
  .vocab-text {
    color: var(--text-primary) !important;
  }
  .dark .vocab-text,
  :root.dark .vocab-text,
  html.dark .vocab-text,
  :root[data-theme='dark'] .vocab-text,
  html[data-theme='dark'] .vocab-text,
  body[data-theme='dark'] .vocab-text {
    color: var(--text-primary) !important;
  }
`;

function VocabularyOverview({ vocabulary, onWordClick }) {
  const subjects = Object.entries(vocabulary || {}).filter(
    ([, words]) => Array.isArray(words) && words.length > 0
  );

  if (!subjects.length) {
    return null;
  }

  return (
    <>
      <style>{vocabStyles}</style>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {subjects.map(([subjectName, words]) => {
          const colorScheme = SUBJECT_COLORS[subjectName] || {};
          const headerGradient = SUBJECT_BG_GRADIENTS[subjectName];
          const headerStyle = headerGradient
            ? { backgroundImage: headerGradient }
            : {
                backgroundColor:
                  colorScheme.background || 'var(--nav-active-bg)',
              };
          const previewWords = words.slice(0, 3);

          return (
            <div
              key={subjectName}
              className="subject-card glass animate-floatIn flex h-full flex-col overflow-hidden rounded-2xl shadow-lg"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 shadow-inner rounded-t-2xl"
                style={{
                  ...(headerStyle || {}),
                  backgroundColor: headerStyle?.backgroundColor || undefined,
                  backgroundImage: headerStyle?.backgroundImage || undefined,
                  color: colorScheme.text || 'var(--nav-active-text)',
                }}
              >
                <h3 className="text-lg font-semibold drop-shadow-sm">
                  {subjectName}
                </h3>
                <span
                  className="text-xs uppercase tracking-wide"
                  style={{
                    color: colorScheme.text || 'var(--nav-active-text)',
                    opacity: 0.85,
                  }}
                >
                  Key Terms
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <ul className="space-y-2">
                  {previewWords.map((word) => (
                    <li
                      key={word.term}
                      className="rounded-lg px-3 py-2 text-sm font-medium shadow-sm vocab-text"
                      style={{
                        backgroundColor: 'var(--bg-muted)',
                      }}
                    >
                      {word.term}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="mb-1 text-xs font-medium vocab-text">
                    Study Progress
                  </div>
                  <div
                    className="h-2 w-full overflow-hidden rounded-full"
                    style={{ backgroundColor: 'var(--border-subtle)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: '40%',
                        backgroundColor: colorScheme.accent || 'var(--accent)',
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onWordClick?.(subjectName)}
                  className="mt-2 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition"
                  data-role="secondary"
                  style={{
                    color: colorScheme.accentText || 'var(--accent-text)',
                    borderColor: colorScheme.accent || 'var(--accent)',
                  }}
                >
                  View full list
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.VocabularyOverview = VocabularyOverview;
}
