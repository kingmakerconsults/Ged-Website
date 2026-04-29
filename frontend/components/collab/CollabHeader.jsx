// frontend/components/collab/CollabHeader.jsx
//
// Deprecated shim. The collab-specific header has been replaced by the
// shared `PlatformHeader` (frontend/components/layout/PlatformHeader.jsx)
// so every non-legacy route renders the same top bar as the rest of the
// platform. Kept here as a re-export for any lingering imports.
import PlatformHeader from '../layout/PlatformHeader.jsx';

export default PlatformHeader;
