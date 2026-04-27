import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function SoftSkillsCoach({ onBack }) {
  return (
    <WorkforceSectionFrame title="Soft Skills Coach" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Daily drill, reflection journal, and streak counter.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
