import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function InterviewStudio({ onBack }) {
  return (
    <WorkforceSectionFrame title="Interview Studio" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Categorized question bank, STAR builder, AI mock interviews, and
          self-record practice are on the way.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
