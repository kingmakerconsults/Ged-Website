import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function WorkplaceSkillsSims({ onBack }) {
  return (
    <WorkforceSectionFrame title="Workplace Skills Sims" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Branching scenarios for conflict, customers, ethics, and feedback.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
