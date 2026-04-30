import React from 'react';
import McqDeck from './McqDeck';
import { GRAMMAR_ITEMS } from './content/grammarItems';

export default function GrammarDrill({ dark = false }) {
  return (
    <McqDeck
      items={GRAMMAR_ITEMS}
      dark={dark}
      accent="bg-indigo-600 hover:bg-indigo-700"
      intro="Pick the sentence that follows standard English grammar conventions."
    />
  );
}
