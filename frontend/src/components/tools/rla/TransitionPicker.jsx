import React, { useMemo } from 'react';
import McqDeck from './McqDeck';
import { TRANSITION_ITEMS } from './content/transitionItems';

function renderPair(item) {
  return (
    <div>
      <p className="mb-2">
        <span className="font-semibold">Sentence 1:</span> {item.a}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Sentence 2:</span> {item.b}
      </p>
      <p className="mt-2 text-sm font-semibold">
        Which transition word or phrase best links sentence 2 to sentence 1?
      </p>
    </div>
  );
}

export default function TransitionPicker({ dark = false }) {
  const items = useMemo(
    () =>
      TRANSITION_ITEMS.map((it) => ({
        id: it.id,
        prompt: `${it.a} / ${it.b}`,
        a: it.a,
        b: it.b,
        options: it.options,
      })),
    []
  );
  return (
    <McqDeck
      items={items}
      dark={dark}
      accent="bg-sky-600 hover:bg-sky-700"
      intro="Pick the connector that best shows the relationship between the two sentences."
      renderPrompt={renderPair}
    />
  );
}
