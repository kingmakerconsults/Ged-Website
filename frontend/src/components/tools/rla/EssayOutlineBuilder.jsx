import React, { useState, useMemo } from 'react';

const SAMPLE_PROMPTS = [
  'Should the voting age be lowered to 16?',
  'Is a four-year college degree the best path to career success?',
  'Should governments aggressively subsidize renewable energy?',
  'Does social media do more harm than good for teen mental health?',
  'Should schools ban smartphones in the classroom?',
];

export default function EssayOutlineBuilder({ dark = false }) {
  const [prompt, setPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [thesis, setThesis] = useState('');
  const [points, setPoints] = useState(['', '', '']);
  const [counter, setCounter] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [copied, setCopied] = useState(false);

  const setPoint = (i, value) => {
    setPoints((p) => p.map((v, idx) => (idx === i ? value : v)));
  };

  const outlineText = useMemo(() => {
    const lines = [
      `Prompt: ${prompt}`,
      '',
      `Thesis: ${thesis || '[your thesis here]'}`,
      '',
      'Body Paragraphs:',
      ...points.map(
        (p, i) => `  ${i + 1}. ${p || '[evidence point ' + (i + 1) + ']'}`
      ),
      '',
      `Counterclaim & Response: ${counter || '[acknowledge the opposing view and respond]'}`,
      '',
      `Conclusion: ${conclusion || '[restate thesis and call to action]'}`,
    ];
    return lines.join('\n');
  }, [prompt, thesis, points, counter, conclusion]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(outlineText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setThesis('');
    setPoints(['', '', '']);
    setCounter('');
    setConclusion('');
  };

  const card = dark ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900';
  const inputCls = dark
    ? 'w-full p-2 rounded-md bg-slate-900 border border-slate-700 text-slate-100'
    : 'w-full p-2 rounded-md bg-white border border-slate-300 text-slate-900';
  const labelCls = 'block text-sm font-semibold mb-1';

  return (
    <div className={`p-4 rounded-xl ${card}`}>
      <p className="text-sm opacity-80 mb-4">
        Draft a clean GED-style outline. Type your thesis, three evidence
        points, a counterclaim, and a conclusion. The preview updates as you
        write, and you can copy the finished outline to the clipboard.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className={labelCls} htmlFor="oeb-prompt">
              Prompt
            </label>
            <select
              id="oeb-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={inputCls}
            >
              {SAMPLE_PROMPTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="oeb-thesis">
              Thesis
            </label>
            <textarea
              id="oeb-thesis"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              rows={2}
              placeholder="State your position clearly in one sentence."
              className={inputCls}
            />
          </div>

          {points.map((p, i) => (
            <div key={i}>
              <label className={labelCls} htmlFor={`oeb-pt-${i}`}>
                Evidence Point {i + 1}
              </label>
              <textarea
                id={`oeb-pt-${i}`}
                value={p}
                onChange={(e) => setPoint(i, e.target.value)}
                rows={2}
                placeholder="One reason or piece of evidence supporting your thesis."
                className={inputCls}
              />
            </div>
          ))}

          <div>
            <label className={labelCls} htmlFor="oeb-counter">
              Counterclaim & Response
            </label>
            <textarea
              id="oeb-counter"
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
              rows={2}
              placeholder="Acknowledge the strongest opposing view and respond to it."
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="oeb-conclusion">
              Conclusion
            </label>
            <textarea
              id="oeb-conclusion"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              rows={2}
              placeholder="Restate your thesis and end with a call to action."
              className={inputCls}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={copy}
              className="px-4 py-2 rounded-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition"
            >
              {copied ? 'Copied!' : 'Copy outline'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg font-semibold bg-slate-500 hover:bg-slate-600 text-white transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <label className={labelCls}>Preview</label>
          <pre
            className={`p-3 rounded-md whitespace-pre-wrap text-sm font-mono ${
              dark
                ? 'bg-slate-900 text-slate-100'
                : 'bg-slate-50 text-slate-900'
            }`}
            style={{ minHeight: 280 }}
          >
            {outlineText}
          </pre>
        </div>
      </div>
    </div>
  );
}
