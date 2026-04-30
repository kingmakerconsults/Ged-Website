import React, { useMemo } from 'react';
import McqDeck from './McqDeck';
import { COMBINER_ITEMS } from './content/combinerItems';

function renderSources(item) {
  return (
    <div>
      <p className="text-sm uppercase tracking-wide opacity-70 mb-2">
        Combine these short sentences:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-3">
        {item.sources.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <p className="text-sm font-semibold">
        Which combined version is the clearest and most polished?
      </p>
    </div>
  );
}

export default function SentenceCombiner({ dark = false }) {
  const items = useMemo(
    () =>
      COMBINER_ITEMS.map((it) => ({
        id: it.id,
        prompt: it.sources.join(' '),
        sources: it.sources,
        options: it.options,
      })),
    []
  );
  return (
    <McqDeck
      items={items}
      dark={dark}
      accent="bg-purple-600 hover:bg-purple-700"
      intro="Combine the choppy sentences without changing the meaning."
      renderPrompt={renderSources}
    />
  );
}
