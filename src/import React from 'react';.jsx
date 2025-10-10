import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // optional: create or reuse your CSS if needed

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
