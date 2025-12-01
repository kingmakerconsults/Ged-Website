import React from 'react';

/**
 * ScienceConceptPractice - Wrapper for concept practice tool
 * Integrates the legacy ScienceConceptPracticeTool with modal interface
 */
export default function ScienceConceptPractice({ onClose, dark = false }) {
  const ScienceConceptPracticeTool = window.ScienceConceptPracticeTool;

  if (!ScienceConceptPracticeTool) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">
          Concept Practice Tool is not loaded
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    );
  }

  return <ScienceConceptPracticeTool theme={dark ? 'dark' : 'light'} />;
}
