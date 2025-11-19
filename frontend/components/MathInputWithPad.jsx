// Math Input with Pad Component
// Reusable onscreen calculator pad for all math fill-in questions
// Pure client-side, no AI or backend calls

const MathInputWithPad = ({
  value = '',
  onChange,
  placeholder = 'Type your answer',
  disabled = false,
  className = '',
}) => {
  const { useRef, useCallback } = React;
  const inputRef = useRef(null);

  // Insert text at cursor position
  const insertAtCursor = useCallback(
    (textToInsert) => {
      if (!inputRef.current || disabled) return;

      const input = inputRef.current;
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const currentValue = value || '';

      // Insert the text
      const newValue =
        currentValue.substring(0, start) +
        textToInsert +
        currentValue.substring(end);

      // Update value
      onChange(newValue);

      // Set cursor position after the inserted text
      setTimeout(() => {
        if (input) {
          const newPos = start + textToInsert.length;
          input.selectionStart = newPos;
          input.selectionEnd = newPos;
          input.focus();
        }
      }, 0);
    },
    [value, onChange, disabled]
  );

  // Backspace function
  const handleBackspace = useCallback(() => {
    if (!inputRef.current || disabled) return;

    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = value || '';

    let newValue;
    let newCursorPos;

    if (start !== end) {
      // Delete selection
      newValue = currentValue.substring(0, start) + currentValue.substring(end);
      newCursorPos = start;
    } else if (start > 0) {
      // Delete character before cursor
      newValue =
        currentValue.substring(0, start - 1) + currentValue.substring(start);
      newCursorPos = start - 1;
    } else {
      // Nothing to delete
      return;
    }

    onChange(newValue);

    setTimeout(() => {
      if (input) {
        input.selectionStart = newCursorPos;
        input.selectionEnd = newCursorPos;
        input.focus();
      }
    }, 0);
  }, [value, onChange, disabled]);

  // Toggle negative sign
  const toggleNegative = useCallback(() => {
    if (disabled) return;

    const currentValue = value || '';
    let newValue;

    if (currentValue.startsWith('-')) {
      // Remove negative sign
      newValue = currentValue.substring(1);
    } else {
      // Add negative sign
      newValue = '-' + currentValue;
    }

    onChange(newValue);

    // Maintain cursor position
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [value, onChange, disabled]);

  // Clear all
  const handleClear = useCallback(() => {
    if (disabled) return;
    onChange('');
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [onChange, disabled]);

  // Button component
  const PadButton = ({ label, insertText, onClick, ariaLabel, span = 1 }) => {
    const buttonClass = `
      px-3 py-2 rounded-lg font-semibold transition
      ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
      }
      ${span === 2 ? 'col-span-2' : ''}
    `;

    return (
      <button
        type="button"
        onClick={() => {
          if (onClick) onClick();
          else if (insertText) insertAtCursor(insertText);
        }}
        disabled={disabled}
        aria-label={ariaLabel || `Insert ${label}`}
        className={buttonClass}
      >
        {label}
      </button>
    );
  };

  return (
    <div className={`math-input-with-pad ${className}`}>
      {/* Text Input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 mb-3 text-lg border-2 rounded-lg
          ${
            disabled
              ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-white border-blue-400 text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200'
          }
          dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:border-blue-500
        `}
        aria-label="Math answer input"
      />

      {/* Math Keypad */}
      <div
        className={`
        math-keypad p-3 rounded-lg border-2
        ${
          disabled
            ? 'bg-gray-100 border-gray-300'
            : 'bg-blue-50 border-blue-300'
        }
        dark:bg-gray-700 dark:border-gray-600
      `}
      >
        <div className="grid grid-cols-5 gap-2">
          {/* Row 1: 7 8 9 + - */}
          <PadButton label="7" insertText="7" ariaLabel="Insert 7" />
          <PadButton label="8" insertText="8" ariaLabel="Insert 8" />
          <PadButton label="9" insertText="9" ariaLabel="Insert 9" />
          <PadButton label="+" insertText="+" ariaLabel="Insert plus" />
          <PadButton label="−" insertText="-" ariaLabel="Insert minus" />

          {/* Row 2: 4 5 6 × ÷ */}
          <PadButton label="4" insertText="4" ariaLabel="Insert 4" />
          <PadButton label="5" insertText="5" ariaLabel="Insert 5" />
          <PadButton label="6" insertText="6" ariaLabel="Insert 6" />
          <PadButton label="×" insertText="*" ariaLabel="Insert multiply" />
          <PadButton label="÷" insertText="/" ariaLabel="Insert divide" />

          {/* Row 3: 1 2 3 ( ) */}
          <PadButton label="1" insertText="1" ariaLabel="Insert 1" />
          <PadButton label="2" insertText="2" ariaLabel="Insert 2" />
          <PadButton label="3" insertText="3" ariaLabel="Insert 3" />
          <PadButton
            label="("
            insertText="("
            ariaLabel="Insert left parenthesis"
          />
          <PadButton
            label=")"
            insertText=")"
            ariaLabel="Insert right parenthesis"
          />

          {/* Row 4: 0 . ^ / */}
          <PadButton label="0" insertText="0" ariaLabel="Insert 0" span={2} />
          <PadButton
            label="."
            insertText="."
            ariaLabel="Insert decimal point"
          />
          <PadButton label="^" insertText="^" ariaLabel="Insert exponent" />
          <PadButton
            label="/"
            insertText="/"
            ariaLabel="Insert fraction slash"
          />

          {/* Row 5: x y π +/- ← */}
          <PadButton label="x" insertText="x" ariaLabel="Insert variable x" />
          <PadButton label="y" insertText="y" ariaLabel="Insert variable y" />
          <PadButton label="π" insertText="π" ariaLabel="Insert pi" />
          <PadButton
            label="±"
            onClick={toggleNegative}
            ariaLabel="Toggle negative sign"
          />
          <PadButton
            label="←"
            onClick={handleBackspace}
            ariaLabel="Backspace"
          />
        </div>

        {/* Bottom row: Clear */}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={`
              w-full px-3 py-2 rounded-lg font-semibold transition
              ${
                disabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }
            `}
            aria-label="Clear all"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

// Export for use in app.jsx
if (typeof window !== 'undefined') {
  window.MathInputWithPad = MathInputWithPad;
}
