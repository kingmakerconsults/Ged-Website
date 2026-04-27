import React from 'react';
import WorkforceSectionFrame from '../WorkforceSectionFrame.jsx';

export default function FinancialBenefitsLiteracy({ onBack }) {
  return (
    <WorkforceSectionFrame title="Financial & Benefits Literacy" onBack={onBack}>
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-2">Coming soon</h2>
        <p className="text-primary opacity-80">
          Read a paystub, W-4 / I-9, taxes, health insurance, 401(k), and the
          50/30/20 budget.
        </p>
      </div>
    </WorkforceSectionFrame>
  );
}
