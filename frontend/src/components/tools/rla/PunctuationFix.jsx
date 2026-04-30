import React from 'react';
import McqDeck from './McqDeck';
import { PUNCTUATION_ITEMS } from './content/punctuationItems';

export default function PunctuationFix({ dark = false }) {
  return (
    <McqDeck
      items={PUNCTUATION_ITEMS}
      dark={dark}
      accent="bg-rose-600 hover:bg-rose-700"
      intro="Pick the correctly punctuated version of the sentence."
    />
  );
}
