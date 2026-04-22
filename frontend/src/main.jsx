import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyRootApp from './legacy/LegacyRootApp.jsx';
import CollabView from './views/CollabView.jsx';
import CollabSessionView from './views/CollabSessionView.jsx';
import '../style.css';

async function bootstrap() {
  if (typeof window !== 'undefined' && window.__API_BASE_READY__) {
    try {
      await window.__API_BASE_READY__;
    } catch (_error) {}
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/collab" element={<CollabView />} />
          <Route path="/collab/:roomCode" element={<CollabSessionView />} />
          <Route path="*" element={<LegacyRootApp />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

bootstrap();
