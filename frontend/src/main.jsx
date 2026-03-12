import React from 'react';
import ReactDOM from 'react-dom/client';
import LegacyRootApp from './legacy/LegacyRootApp.jsx';
import '../style.css';

async function bootstrap() {
  if (typeof window !== 'undefined' && window.__API_BASE_READY__) {
    try {
      await window.__API_BASE_READY__;
    } catch (_error) {}
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <LegacyRootApp />
    </React.StrictMode>
  );
}

bootstrap();
