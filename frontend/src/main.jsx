import React from 'react';
import ReactDOM from 'react-dom/client';
import LegacyRootApp from './legacy/LegacyRootApp.jsx';
import '../style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegacyRootApp />
  </React.StrictMode>
);
