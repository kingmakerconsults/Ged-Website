import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const container = document.getElementById('root');
if (!container) {
  const el = document.createElement('div');
  el.id = 'root';
  document.body.prepend(el);
}
const root = createRoot(document.getElementById('root'));
root.render(<App />);
