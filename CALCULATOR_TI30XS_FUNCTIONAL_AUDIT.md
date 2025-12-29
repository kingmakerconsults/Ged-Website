# TI-30XS Calculator — Functional Audit (Key-by-key)

Scope: functional correctness only. Layout/grid/sizing/styling intentionally unchanged.

## Input/Eval Engine (global)

- Internal model: `currentInput` is an INTERNAL expression string; `cursorIndex` is an INTERNAL index.
- Display model: LCD renders a derived DISPLAY string where internal tokens map to glyphs:
  - `*` → `×`, `/` → `÷`, `pi` → `π`, `-` → `−`, `sqrt(` → `√(`
- Evaluation: replaced `eval()` with a safe shunting-yard evaluator supporting:
  - numbers, parentheses, `+ - * / ^`, unary minus, `pi`, `e`, functions: `sin cos tan asin acos atan log ln sqrt`

## Key-by-key behaviors

Top/System

- `2nd`: toggles shift. Clears after the next non-shift key press. If `mode` opens menu, shift clears on menu close.
- `mode`: opens mode panel; DEG/RAD selection; does not edit expression.
- `delete`: backspace at cursor (token-aware for `pi`).
- `clear`: clears current entry (expression + result). Mode preserved.

Row 2/3 utility

- `log`: inserts `log(`; with 2nd inserts `10^(`.
- `ln`: inserts `ln(`; with 2nd inserts `e^(`.
- `n/d`: minimal viable: inserts `/` (does not crash evaluation).
- `x10^n`: inserts `*10^(` (never stores literal `x`).
- `table`, `prb`, `data`: placeholders/no-op; do not crash; clear shift.

Trig/Constants

- `π`: inserts internal token `pi` and renders as `π`.
- `sin/cos/tan`: inserts `sin(`/`cos(`/`tan(`; with 2nd inserts `asin(`/`acos(`/`atan(`.
- DEG/RAD mode affects trig evaluation.

Operators

- `÷`: inserts `/` (display `÷`).
- `×`: inserts `*` (display `×`).
- `−`: inserts `-` (unary/binary supported; unary handled by evaluator).
- `+`: inserts `+`.

Powers/Grouping

- `^`: inserts `^`.
- `x⁻¹`: transforms prior value/group to `1/(x)`.
- `(` inserts `(`.
- `)` inserts `)` only if it would not immediately invalidate balance (basic guard).
- `x²`: appends `^2` to the prior value/group.

Variables / Memory (minimal viable)

- `x y z`: minimal viable inserts `x`.
- `sto→`: arms store; next `x y z` stores `Ans` into `x`. With 2nd arms recall; next `x y z` inserts stored value (or `0`).

Numbers

- `0–9`: insert digit at cursor.
- `.`: inserts decimal; prevents multiple decimals within one number segment; inserts `0.` if starting a new number.
- `(-)`: toggles sign without ever inserting literal `(-)`.
- `◄►`: placeholder/no-op; does not crash; clears shift.

Enter/Eval

- `enter`: evaluates expression, sets `Ans`, clears expression for next input; errors show `ERR` without crashing.

## Test coverage

Automated checks live in `tests/ti30xs_engine.test.js` and run via:

- `npm run test:ti30xs`

Covers required cases: operator insertion tokens/display, negative toggle, decimal rules, parentheses, exponent, trig DEG, pi, cursor/backspace, shift-related inverse trig evaluation.
