# TI-30XS Calculator - Fixed Unit Quick Reference

## 🎯 One-Minute Summary

**Before**: Calculator used responsive math (`vw`, `clamp()`, `%`) that could collapse.  
**Now**: Calculator uses **single fixed unit `--u`** that controls everything.

---

## 📐 The System

```javascript
--u = 52px  // Change this ONE number to scale entire calculator

Everything else is a multiple of --u:
--rowH = 0.85 × u         // Key height
--gap  = 0.22 × u         // Gaps between keys
--pad  = 0.4 × u          // Interior padding
```

---

## 🔑 Key Dimensions

| Element            | Formula    | With u=52px |
| ------------------ | ---------- | ----------- |
| Column width       | `--u`      | 52px        |
| Row height         | `0.85 × u` | 44.2px      |
| Main grid          | 5 × u wide | 260px       |
| Shell width        | 8.6 × u    | 446px       |
| Shell height       | 12 × u     | 624px       |
| LCD height         | 2 × u      | 104px       |
| Operator key width | 0.9 × u    | 46.8px      |
| D-pad block        | 2 × 2 × u  | 104×104px   |

---

## 🏗️ Three-Column Keypad

```
┌─────────────────┬──────────┬────────────┐
│  MAIN GRID      │ OPERATOR │  D-PAD     │
│  (5 × u wide)   │ (0.9×u)  │  (2 × u)   │
│                 │          │            │
│ 5 cols × 8 rows │ aligned  │ rows 1-3   │
│                 │ rows 3-6 │            │
└─────────────────┴──────────┴────────────┘
```

All rows are `--rowH` tall (perfect alignment).

---

## 📝 Grid Template

```jsx
gridTemplateColumns: 'repeat(5, var(--u))';
gridTemplateRows: 'repeat(8, var(--rowH))';
gap: 'var(--gap)';
```

**Critical**: Columns are FIXED width, cannot collapse.

---

## 🔧 To Scale the Calculator

### Make it 20% larger:

Change `--u: '52px'` to `--u: '62.4px'` (52 × 1.2)

### Make it 20% smaller:

Change `--u: '52px'` to `--u: '41.6px'` (52 × 0.8)

Everything scales proportionally automatically.

---

## ❌ What Changed

| Old                                     | New                           |
| --------------------------------------- | ----------------------------- |
| `width: min(92vw, 560px)`               | `width: calc(var(--u) * 8.6)` |
| `clamp(14px, 2.2vw, 22px)`              | `calc(var(--u) * 0.4)`        |
| `grid-template-columns: repeat(5, 1fr)` | `repeat(5, var(--u))`         |
| `aspect-ratio: 3/4.2`                   | Fixed dimensions              |
| `height: 92vh`                          | `calc(var(--u) * 12)`         |
| `minmax()`                              | Removed                       |
| `%` widths                              | Removed                       |

---

## ✅ Guarantees

- ✅ Main grid is always 5 columns
- ✅ Main grid is always 8 rows
- ✅ All rows are identical height
- ✅ Operator keys aligned perfectly
- ✅ D-pad is fixed square block
- ✅ No missing keys
- ✅ No floating elements
- ✅ Scale everything by changing `--u`

---

## 🎨 Font Sizing

All fonts derive from `--u`:

```
Numeric keys:       calc(var(--u) * 0.42)  // 21.84px
Function keys:      calc(var(--u) * 0.28)  // 14.56px
Operator keys:      calc(var(--u) * 0.38)  // 19.76px
Secondary labels:   calc(var(--u) * 0.18)  // 9.36px
D-pad buttons:      calc(var(--u) * 0.22-0.28)
LCD large display:  calc(var(--u) * 0.36)  // 18.72px
LCD small display:  calc(var(--u) * 0.24)  // 12.48px
Branding:           calc(var(--u) * 0.35)  // 18.2px
```

---

## 📁 Code Locations

**CSS Variables Definition**  
`frontend/components/TI30XSCalculator.jsx:687-697`

**Shell Dimensions**  
`frontend/components/TI30XSCalculator.jsx:699-708`

**Main Grid (Critical)**  
`frontend/components/TI30XSCalculator.jsx:845-860`  
Uses: `gridTemplateColumns: 'repeat(5, var(--u))'`

**Operator Column**  
`frontend/components/TI30XSCalculator.jsx:863-880`

**D-pad Column**  
`frontend/components/TI30XSCalculator.jsx:883-945`

**Key Rendering**  
`frontend/components/TI30XSCalculator.jsx:608-667`

---

## 🧪 Testing

The calculator should:

- Display as a fixed 446×624px box
- Have 5 perfectly aligned columns
- Have 8 perfectly aligned rows
- Show operator keys in rows 3-6
- Show D-pad in top-right corner
- Have all fonts properly sized
- Have no missing keys

---

## ⚙️ If You Need to Change Things

### Change base unit size:

Edit line 688: `'--u': '52px',` → `'--u': '60px',` (or any value)

### Change row height ratio:

Edit line 689: `0.85` → `0.90` (keys taller)

### Change gap between keys:

Edit line 690: `0.22` → `0.25` (larger gaps)

### Change shell proportions:

Edit lines 701-703: Multiply the coefficients (e.g., 8.6 → 8.8)

---

## 🔍 Verification Checklist

- [x] `--u` is the only variable in calculatorStyle that is fixed
- [x] All other dimensions multiply `--u` or `--rowH`
- [x] Main grid uses `repeat(5, var(--u))`
- [x] No `clamp()`, `vw`, `%`, or `aspect-ratio`
- [x] No `minmax()` in grid
- [x] Operator column has 8 rows with placeholders
- [x] D-pad is 2×2 unit block
- [x] All fonts derive from `--u`
- [x] Build succeeds

---

**Status**: ✅ PRODUCTION READY

Change `--u` to any value, get a perfectly scaled calculator.
