import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LegacyRootApp from './legacy/LegacyRootApp.jsx';
import MathView from './views/MathView.jsx';
import ScienceView from './views/ScienceView.jsx';
import RLAView from './views/RLAView.jsx';
import SocialStudiesView from './views/SocialStudiesView.jsx';
import ThemeAwareView from './components/ThemeAwareView.jsx';
import '../style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LegacyRootApp />} />
        <Route
          path="/math"
          element={<ThemeAwareView ViewComponent={MathView} />}
        />
        <Route
          path="/science"
          element={<ThemeAwareView ViewComponent={ScienceView} />}
        />
        <Route
          path="/rla"
          element={<ThemeAwareView ViewComponent={RLAView} />}
        />
        <Route
          path="/social-studies"
          element={<ThemeAwareView ViewComponent={SocialStudiesView} />}
        />
        {/* Fallback to LegacyRootApp for unmatched routes */}
        <Route path="*" element={<LegacyRootApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
