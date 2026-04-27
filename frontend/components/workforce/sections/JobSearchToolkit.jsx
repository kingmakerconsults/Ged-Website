import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function JobSearchToolkit({ onBack }) {
  return (
    <WorkforceSectionFrame title="Job Search Toolkit" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Search-practice prompts, application tracker, employer research, and a
          salary explainer are on the way.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
