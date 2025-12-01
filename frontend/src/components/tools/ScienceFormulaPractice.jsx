import React from 'react';

/**
 * ScienceFormulaPractice - Wrapper for formula practice tool
 * Integrates the legacy ScienceFormulaPracticeTool with modal interface
 */
export default function ScienceFormulaPractice({ onClose, dark = false }) {
  const ScienceFormulaPracticeTool = window.ScienceFormulaPracticeTool;

  if (!ScienceFormulaPracticeTool) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">
          Formula Practice Tool is not loaded
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

  return <ScienceFormulaPracticeTool theme={dark ? 'dark' : 'light'} />;
}
