import React, { useMemo } from 'react';
import McqDeck from './McqDeck';
import { VOCAB_ITEMS } from './content/vocabItems';

function renderSentence(item) {
  const parts = item.sentence.split(/\*\*(.+?)\*\*/);
  return (
    <div>
      <p className="text-sm uppercase tracking-wide opacity-70 mb-2">
        Target word: <span className="font-bold">{item.word}</span>
      </p>
      <p className="text-base leading-relaxed">
        {parts.map((p, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="underline decoration-amber-500">
              {p}
            </strong>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </p>
      <p className="mt-3 text-sm font-semibold">
        Which choice best matches the word as it is used above?
      </p>
    </div>
  );
}

export default function VocabInContext({ dark = false }) {
  const items = useMemo(
    () =>
      VOCAB_ITEMS.map((it) => ({
        id: it.id,
        prompt: it.sentence,
        word: it.word,
        sentence: it.sentence,
        options: it.options,
      })),
    []
  );
  return (
    <McqDeck
      items={items}
      dark={dark}
      accent="bg-emerald-600 hover:bg-emerald-700"
      intro="Use the surrounding sentence to figure out what the bold word means."
      renderPrompt={renderSentence}
    />
  );
}
