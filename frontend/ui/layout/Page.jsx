// Canonical Page wrapper for top-level pages
import React from 'react';

export default function Page({ children }) {
  return <div style={{ padding: '2rem 0', minHeight: '80vh' }}>{children}</div>;
}
