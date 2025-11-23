/**
 * AdminView.jsx
 * Wrapper for admin dashboard and admin functionality
 */

function AdminView({ user, token, onLogout }) {
  // EnhancedAdminShell is already defined in app.jsx - use it via window global
  const EnhancedAdminShell = window.EnhancedAdminShell;

  if (!EnhancedAdminShell) {
    return (
      <div className="text-center p-8">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return <EnhancedAdminShell user={user} token={token} onLogout={onLogout} />;
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.AdminView = AdminView;
}
