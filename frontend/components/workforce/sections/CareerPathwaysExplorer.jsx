import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function CareerPathwaysExplorer({ onBack }) {
  return (
    <WorkforceSectionFrame title="Career Pathways Explorer" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Filter careers by interest, education, and wage; see day-in-the-life
          snapshots.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
