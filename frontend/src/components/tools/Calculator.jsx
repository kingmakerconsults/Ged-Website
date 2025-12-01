import React from 'react';
import { TI30XSCalculator } from '../../../components/TI30XSCalculator';

/**
 * Calculator - TI-30XS MultiView calculator wrapper for tools modal
 *
 * This wraps the existing TI30XSCalculator component to work within
 * the SubjectToolsModal interface while maintaining full functionality.
 */
export default function Calculator({ onClose, dark = false }) {
  return <TI30XSCalculator onClose={onClose} />;
}
