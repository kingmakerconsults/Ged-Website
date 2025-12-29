# CSS Variables Hierarchy & Dependency Graph

## Variable Definition Order (Source of Truth)

```javascript
const calculatorStyle = {
  // Tier 1: Base responsive units (NO dependencies)
  '--pad': 'clamp(14px, 2.2vw, 22px)', // Interior padding
  '--gap': 'clamp(8px, 1.2vw, 14px)', // Key gaps
  '--gridCols': 5, // Column count (constant)
  '--gridRows': 8, // Row count (constant)

  // Tier 2: Column widths (viewport-relative)
  '--opW': 'clamp(52px, 9.5vw, 70px)', // Operator column width
  '--dpadW': 'clamp(110px, 16vw, 150px)', // D-pad column width

  // Tier 3: Computed grid width (depends on Tier 2)
  '--gridW': 'calc(100% - var(--opW) - var(--dpadW) - (var(--gap) * 2))',

  // Tier 4: Cell sizing (depends on Tier 3)
  '--cellW': 'calc((var(--gridW) - (var(--gap) * 4)) / 5)',

  // Tier 5: Row height & LCD height (depends on Tier 4)
  '--rowH': 'calc(var(--cellW) * 0.72)', // Keys 72% as tall as wide
  '--lcdH': 'calc(var(--cellW) * 2.2)', // LCD ≈2.2 rows tall
};
```

## Variable Usage Map

### Container & Structure

```
width: 'min(92vw, 560px)'              // Shell width (responsive + max)
aspectRatio: '3 / 4.2'                 // Locked device proportions
maxHeight: '92vh'                       // Fits viewport vertically
```

### Interior Spacing

```
padding: var(--pad)                    // Interior padding of shell
gap: var(--gap)                        // Gap between all key rows & columns
```

### Grid Layout

```
grid-template-columns: repeat(5, 1fr)  // Main grid: 5 equal columns
grid-template-rows: repeat(8, var(--rowH))  // Main grid: 8 responsive rows

// Operator column
width: var(--opW)                      // Operator column width
grid-template-rows: repeat(8, var(--rowH))  // Same row heights as main grid

// D-pad column
width: var(--dpadW)                    // D-pad column width
grid-template-rows: repeat(8, var(--rowH))  // Same row heights as main grid
```

### Key Sizing

```
// All grid cells fill their grid cell
width: 100%                            // Fills grid column width
height: 100%                           // Fills grid row height

// Key-specific scaling
borderRadius: calc(var(--rowH) * 0.28)      // Normal keys: 28% of row height
borderRadius: calc(var(--rowH) * 0.55)      // Operator keys: 55% of row height

// D-pad button sizing (proportional to column)
width: calc(var(--dpadW) * 0.4)        // Up/Down arrows
height: calc(var(--rowH) * 0.6)
width: calc(var(--dpadW) * 0.35)       // Left/Right/OK
height: calc(var(--rowH) * 0.8) or calc(var(--dpadW) * 0.35)
```

### Font Sizing

```
// Numeric keys
fontSize: 'clamp(14px, 1.8vw, 18px)'
// Function/System keys
fontSize: 'clamp(10px, 1.4vw, 13px)'
// Operator keys
fontSize: 'clamp(16px, 2vw, 20px)'
// Secondary labels
fontSize: 'clamp(8px, 1.1vw, 11px)'
// D-pad labels
fontSize: 'clamp(10px, 1.4vw, 14px)'
// LCD input
fontSize: 'clamp(11px, 1.4vw, 14px)'
// LCD result
fontSize: 'clamp(16px, 2.2vw, 20px)'
// Branding
fontSize: 'clamp(10px, 1.8vw, 14px)'
```

### LCD Display

```
height: var(--lcdH)                    // Total LCD height (2.2 rows)
margin-bottom: var(--pad)              // Space below LCD

// Status bar
height: calc(var(--lcdH) * 0.2)        // 20% of total LCD height
fontSize: 'clamp(8px, 1.1vw, 12px)'

// Content area
flex: 1                                // Fills remaining LCD space
```

## Scaling Example: 375px Mobile → 1920px Desktop

### Mobile (375px width)

```
--pad      = 14px (clamp min)
--gap      = 8px (clamp min)
--opW      = 52px (clamp min)
--dpadW    = 110px (clamp min)
--gridW    = calc(375 - 52 - 110 - 16) = 197px
--cellW    = calc((197 - 16) / 5) = 36.2px
--rowH     = calc(36.2 * 0.72) = 26px
--lcdH     = calc(36.2 * 2.2) = 79.6px

Calculator: 375px wide × 505px tall (approx)
Keys: ~36px × ~26px (compact)
Fonts: At lower clamp bounds (numeric: 14px, operator: 16px)
```

### Desktop (1920px width)

```
--pad      = 22px (clamp max, shell width clamped to 560px)
--gap      = 14px (clamp max)
--opW      = 70px (clamp max)
--dpadW    = 150px (clamp max)
--gridW    = calc(560 - 70 - 150 - 28) = 312px
--cellW    = calc((312 - 28) / 5) = 56.8px
--rowH     = calc(56.8 * 0.72) = 40.9px
--lcdH     = calc(56.8 * 2.2) = 124.9px

Calculator: 560px wide × 758px tall (approx)
Keys: ~57px × ~41px (larger)
Fonts: At upper clamp bounds (numeric: 18px, operator: 20px)
```

## Why This Works

1. **Viewport-relative base units**: `vw` allows calculator to adapt to screen size
2. **Clamping prevents extremes**: `clamp(min, preferred, max)` keeps sizing balanced
3. **Hierarchical dependencies**: Each variable builds on lower tiers
4. **Single cell size**: Everything (keys, gaps, fonts) scales from `--cellW`
5. **Grid alignment**: No margin hacks—all positioning via CSS Grid
6. **No breakpoints needed**: Continuous scaling across all screen sizes

## Maintenance Notes

- **To change base proportions**: Modify `0.72` ratio in `--rowH` or `2.2` ratio in `--lcdH`
- **To change min/max sizes**: Adjust clamp values in `--pad`, `--gap`, `--opW`, `--dpadW`
- **To change column widths**: Update percentage values in D-pad button sizing (currently 0.4, 0.35)
- **To change font families**: Use `font-family: ...` in renderKey/renderOperatorKey (no variables needed)

## Variable Reference Table

| Variable  | Purpose           | Min   | Preferred                 | Max   | Unit  |
| --------- | ----------------- | ----- | ------------------------- | ----- | ----- |
| `--pad`   | Interior padding  | 14px  | 2.2vw                     | 22px  | px/vw |
| `--gap`   | Key gaps          | 8px   | 1.2vw                     | 14px  | px/vw |
| `--opW`   | Operator column   | 52px  | 9.5vw                     | 70px  | px/vw |
| `--dpadW` | D-pad column      | 110px | 16vw                      | 150px | px/vw |
| `--gridW` | Main grid width   | —     | 100% - opW - dpadW - gaps | —     | calc  |
| `--cellW` | Single cell width | —     | (gridW - gaps) / 5        | —     | calc  |
| `--rowH`  | Single row height | —     | cellW × 0.72              | —     | calc  |
| `--lcdH`  | LCD total height  | —     | cellW × 2.2               | —     | calc  |
