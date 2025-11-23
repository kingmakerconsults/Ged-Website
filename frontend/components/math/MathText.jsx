const TextUtils = window.TextUtils || {};
const MathUtils = window.MathUtils || {};
const { formatFractions } = TextUtils;
const { renderStem } = MathUtils;

// Local safeHtml wrapper to preserve original behavior
const safeHtml = (html) => ({ __html: typeof html === 'string' ? html : '' });

function MathText({ text, className, subject }) {
  if (typeof text !== 'string' || text.trim() === '') {
    return <span className={className}></span>;
  }

  let renderedHtml;

  if (subject === 'Math') {
    renderedHtml = renderStem(text);
  } else {
    const san =
      typeof window !== 'undefined' &&
      window.DOMPurify &&
      window.DOMPurify.sanitize
        ? window.DOMPurify.sanitize
        : (v) => v;
    renderedHtml = san(text);
  }

  const formattedHtml = formatFractions(renderedHtml);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={safeHtml(formattedHtml)}
    />
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.MathText = MathText;
}
