function OrganizationSummaryView({ summary }) {
  if (!summary) {
    return null;
  }

  const organization = summary.organization || {};
  const users = Array.isArray(summary.users) ? summary.users : [];

  return (
    <section className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Organization: {organization.name || 'Unknown'}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Roster and recent quiz activity (up to five recent attempts per
            learner).
          </p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {users.length} {users.length === 1 ? 'member' : 'members'}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Learner
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Last Login
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Recent Quiz Attempts
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm dark:divide-slate-800 dark:bg-slate-900/80">
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                >
                  No users are linked to this organization yet.
                </td>
              </tr>
            )}
            {users.map((user) => {
              const attempts = Array.isArray(user.quizAttempts)
                ? user.quizAttempts
                : [];
              return (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-100">
                    {user.name || 'Learner'}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                    {user.email || '–'}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-300">
                    {formatDateTime(user.last_login)}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-200">
                    {attempts.length === 0 ? (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        No recent attempts
                      </span>
                    ) : (
                      <ul className="space-y-1 text-xs">
                        {attempts.map((attempt, index) => (
                          <li
                            key={`${user.id}-${index}`}
                            className="flex flex-col sm:flex-row sm:items-center sm:gap-2"
                          >
                            <span className="font-semibold text-slate-700 dark:text-slate-100">
                              {attempt.subject || 'Subject N/A'}
                            </span>
                            <span className="text-slate-500 dark:text-slate-300">
                              {attempt.quiz_type || 'Quiz'}
                            </span>
                            <span className="text-slate-500 dark:text-slate-300">
                              Score:{' '}
                              {attempt.scaled_score != null
                                ? attempt.scaled_score
                                : '–'}
                            </span>
                            <span className="text-slate-400 dark:text-slate-400">
                              {formatDateTime(attempt.attempted_at)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// COMPREHENSIVE ADMIN SUITE COMPONENTS
// ========================================

// Modern Admin Dashboard Component - Grid-based, responsive, dark mode ready

export default OrganizationSummaryView;
