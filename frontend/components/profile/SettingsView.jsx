const { useState } = React;

function SettingsView({
  preferences,
  onApply,
  onSave,
  saving,
  status,
  onBack,
  loading,
}) {
  const [fontSize, setFontSize] = useState(preferences.fontSize);
  const [theme, setTheme] = useState(preferences.theme);

  useEffect(() => {
    setFontSize(preferences.fontSize);
  }, [preferences.fontSize]);

  useEffect(() => {
    setTheme(preferences.theme);
  }, [preferences.theme]);

  const fontSizeOptions = [
    {
      value: 'sm',
      label: 'Small',
      description: 'Compact text for dense layouts.',
    },
    {
      value: 'md',
      label: 'Medium',
      description: 'Balanced for most learners.',
    },
    {
      value: 'lg',
      label: 'Large',
      description: 'Larger text for improved legibility.',
    },
    {
      value: 'xl',
      label: 'Extra Large',
      description: 'Maximum size for easy reading.',
    },
  ];

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      description: 'Bright background with dark text.',
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Dim background with light text.',
    },
  ];

  const handleFontSizeChange = (event) => {
    const value = event.target.value;
    setFontSize(value);
    if (onApply) {
      onApply({ fontSize: value });
    }
  };

  const handleThemeChange = (event) => {
    const value = event.target.value;
    setTheme(value);
    if (onApply) {
      onApply({ theme: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave({ fontSize, theme });
  };

  return (
    <section
      id="settingsView"
      data-view="settings"
      tabIndex={-1}
      className="outline-none"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between settings-header">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Settings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Choose the font size and color mode that feel right for your
              reading style. Changes apply instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Back to Dashboard
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="settings-panel rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white/95 dark:bg-slate-900/80 p-5 shadow-sm space-y-6"
        >
          <fieldset className="space-y-3 settings-section">
            <legend className="text-lg font-semibold text-slate-800 dark:text-slate-50">
              Font Size
            </legend>
            <p className="text-sm text-slate-500 dark:text-slate-200">
              Pick the text size that feels comfortable on your device.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {fontSizeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`option-pill ${
                    fontSize === option.value ? 'is-selected' : ''
                  } flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white/40 dark:bg-slate-900/50 px-3 py-2 hover:border-sky-300 dark:hover:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500`}
                >
                  <input
                    type="radio"
                    name="fontSize"
                    value={option.value}
                    checked={fontSize === option.value}
                    onChange={handleFontSizeChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 dark:bg-slate-900 dark:border-slate-600"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3 settings-section">
            <legend className="text-lg font-semibold text-slate-800 dark:text-slate-50">
              Color Mode
            </legend>
            <p className="text-sm text-slate-500 dark:text-slate-200">
              Choose between light and dark themes. We'll remember your pick.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {themeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`option-pill ${
                    theme === option.value ? 'is-selected ' : ''
                  }flex items-center gap-3 rounded-lg border px-3 py-2 transition ${
                    theme === option.value
                      ? 'border-sky-400 ring-2 ring-sky-200 dark:ring-sky-500/40'
                      : 'border-slate-200 dark:border-slate-600'
                  } bg-white/40 dark:bg-slate-900/50 hover:border-sky-300 dark:hover:border-sky-400`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={theme === option.value}
                    onChange={handleThemeChange}
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 dark:bg-slate-900 dark:border-slate-600"
                  />
                  <span className="flex flex-col">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {option.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-xs text-slate-500 dark:text-slate-400"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-400"
              disabled={saving || loading}
            >
              {saving ? 'Saving…' : 'Save Settings'}
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-slate-50 dark:bg-slate-900/60 p-5 text-sm text-slate-600 dark:text-slate-300">
          <h2 className="text-base font-semibold text-slate-700 dark:text-slate-100">
            How settings work
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Changes apply instantly so you can preview them before saving.
            </li>
            <li>
              We try to sync your preferences to the server. If that fails, they
              stay on this device.
            </li>
            <li>
              Text and background colors now adjust automatically so light text
              sits on darker surfaces for readability.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.SettingsView = SettingsView;
}
