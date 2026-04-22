# TI-30XS Calculator Layout Architecture - Visual Guide

## Overall Container Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    CALCULATOR SHELL                         │
│         width: min(92vw, 560px)                             │
│         aspectRatio: 3 / 4.2                                │
│         maxHeight: 92vh                                     │
│         padding: var(--pad)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  BRANDING: "TI-30XS"  [Settings] [Close]            │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  LCD DISPLAY (height: var(--lcdH))                  │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │  [Status Bar]        DEG | 2nd | M                 │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ Input:  123                                         │  │
│  │ Result: 456.7                                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │      KEYPAD AREA (3-Column Flex Layout)             │  │
│  │  gap: var(--gap)                                    │  │
│  ├────────────────────┬──────────┬────────────────────┤  │
│  │   COLUMN 1         │ COLUMN 2 │    COLUMN 3        │  │
│  │ Main 5×8 Grid      │  Operator│  D-pad Column      │  │
│  │ (flex: 1)          │ Column   │  (width: --dpadW)  │  │
│  │                    │(width:   │                    │  │
│  │                    │ --opW)   │                    │  │
│  └────────────────────┴──────────┴────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Keypad Columns in Detail

### Column 1: Main 5×8 Grid

```
display: grid
grid-template-columns: repeat(5, 1fr)
grid-template-rows: repeat(8, var(--rowH))
gap: var(--gap)

┌────────┬────────┬────────┬────────┬────────┐
│ 2nd    │ mode   │ delete │ (null) │ (null) │  Row 1
├────────┼────────┼────────┼────────┼────────┤
│ log    │ ln     │ n/d    │ table  │ clear  │  Row 2
├────────┼────────┼────────┼────────┼────────┤
│ π      │ sin    │ cos    │ tan    │ (null) │  Row 3
├────────┼────────┼────────┼────────┼────────┤
│ x²     │ ^      │ x⁻¹    │ (      │ )      │  Row 4
├────────┼────────┼────────┼────────┼────────┤
│ x²     │ 7      │ 8      │ 9      │ (null) │  Row 5
├────────┼────────┼────────┼────────┼────────┤
│ x y z  │ 4      │ 5      │ 6      │ (null) │  Row 6
├────────┼────────┼────────┼────────┼────────┤
│ sto→   │ 1      │ 2      │ 3      │ ◄►     │  Row 7
├────────┼────────┼────────┼────────┼────────┤
│ on     │ 0 (wide)        │ .      │ (-)    │  Row 8
└────────┴────────┴────────┴────────┴────────┘

Each cell: width = 100%, height = var(--rowH)
Null cells: visibility: hidden (still occupy space)
```

### Column 2: Operator Column

```
display: grid
grid-template-rows: repeat(8, var(--rowH))
width: var(--opW)
gap: var(--gap)

┌────────┐
│(null)  │  Row 1 — placeholder (visibility: hidden)
├────────┤
│(null)  │  Row 2 — placeholder (visibility: hidden)
├────────┤
│   ÷    │  Row 3 — divide (vertical oval)
├────────┤
│   ×    │  Row 4 — multiply (vertical oval)
├────────┤
│   −    │  Row 5 — subtract (vertical oval)
├────────┤
│   +    │  Row 6 — add (vertical oval)
├────────┤
│(null)  │  Row 7 — placeholder (visibility: hidden)
├────────┤
│(null)  │  Row 8 — placeholder (visibility: hidden)
└────────┘

All keys fill cell: width = 100%, height = var(--rowH)
Operator border-radius: calc(var(--rowH) * 0.55) [vertical oval]
```

### Column 3: D-pad Column

```
display: grid
grid-template-rows: repeat(8, var(--rowH))
width: var(--dpadW)
gap: var(--gap)

        width: calc(var(--dpadW) * 0.92)

┌────────────────────────────┐
│           ▲                 │
│      [↑ button]             │  Row 1
│                             │  Row 2  ← span 3 rows
│  ◄  [←]    OK    [→]  ►     │  Row 3
│       [↓ button]            │
│           ▼                 │
│                             │
├────────────────────────────┤
│(null)                       │  Row 4 — placeholder
├────────────────────────────┤
│(null)                       │  Row 5 — placeholder
├────────────────────────────┤
│(null)                       │  Row 6 — placeholder
├────────────────────────────┤
│(null)                       │  Row 7 — placeholder
├────────────────────────────┤
│(null)                       │  Row 8 — placeholder
└────────────────────────────┘

D-pad container: grid-row: 1 / span 3
Button sizes:
- Up/Down arrows:   width: calc(var(--dpadW) * 0.4) × calc(var(--rowH) * 0.6)
- Left/Right:       width: calc(var(--dpadW) * 0.35) × calc(var(--rowH) * 0.8)
- OK button:        width: calc(var(--dpadW) * 0.35) × calc(var(--dpadW) * 0.35)
```

## Cell Sizing Cascade

```
┌──────────────────────────────────────────────────────────┐
│ STEP 1: Shell Container                                  │
│ width: min(92vw, 560px)                                  │
│ aspectRatio: 3 / 4.2 (locked proportions)                │
│                                                          │
│ On 375px phone → 345px calculator                        │
│ On 1920px desktop → 560px calculator (max)               │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 2: Define Base Responsive Units                     │
│ --gap: clamp(8px, 1.2vw, 14px)                           │
│ --pad: clamp(14px, 2.2vw, 22px)                          │
│ --opW: clamp(52px, 9.5vw, 70px)                          │
│ --dpadW: clamp(110px, 16vw, 150px)                       │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 3: Calculate Available Grid Width                   │
│ --gridW = 100% - --opW - --dpadW - (gaps)                │
│                                                          │
│ On 375px phone → ~197px available                        │
│ On 560px desktop → ~312px available                      │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 4: Divide into 5 Columns → Cell Width               │
│ --cellW = (--gridW - (4 × --gap)) / 5                    │
│                                                          │
│ On 375px phone → --cellW ≈ 36px                          │
│ On 560px desktop → --cellW ≈ 57px                        │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 5: Set Row Height (72% of cell width)               │
│ --rowH = --cellW × 0.72                                  │
│                                                          │
│ On 375px phone → --rowH ≈ 26px                           │
│ On 560px desktop → --rowH ≈ 41px                         │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│ STEP 6: All Other Dimensions Scale from --rowH           │
│                                                          │
│ Key border-radius:    calc(var(--rowH) * 0.28)           │
│ Operator oval radius: calc(var(--rowH) * 0.55)           │
│ LCD height:           calc(var(--cellW) * 2.2)           │
│ D-pad buttons:        % of --dpadW and --rowH            │
│                                                          │
│ RESULT: Everything scales proportionally                 │
└──────────────────────────────────────────────────────────┘
```

## Font Sizing (Independent Responsive Scale)

```
All font sizes use clamp(min, preferred, max)

Numeric Keys:
  clamp(14px, 1.8vw, 18px)
  On 375px → 14px (min)
  On 768px → 16px (preferred)
  On 1920px → 18px (max)

Operator Keys:
  clamp(16px, 2vw, 20px)
  On 375px → 16px (min)
  On 768px → 18px (preferred)
  On 1920px → 20px (max)

Function Keys:
  clamp(10px, 1.4vw, 13px)
  On 375px → 10px (min)
  On 768px → 12px (preferred)
  On 1920px → 13px (max)

Secondary Labels (green shift):
  clamp(8px, 1.1vw, 11px)
  On 375px → 8px (min)
  On 768px → 10px (preferred)
  On 1920px → 11px (max)
```

## Grid Alignment Guarantee

```
PROBLEM (Old Flex-Based):
  Display: flex, flex-direction: column
  Gap: hardcoded 4px
  Result: Columns float independently if heights vary

  ┌──────┐  ┌──────┐  ┌──────┐
  │ Col1 │  │ Col2 │  │ Col3 │  ← May be different heights
  ├──────┤  ├──────┤  ├──────┤     causing misalignment
  │      │  │      │  │      │
  └──────┘  └──────┘  └──────┘


SOLUTION (New CSS Grid):
  Display: flex, gap: var(--gap)
  Each column has: grid-template-rows: repeat(8, var(--rowH))
  Result: All columns have identical row heights and gaps

  ┌─────────────────────────────────┐
  │ Col1│  │ Col2│  │ Col3│ ← Row 1
  ├─────────────────────────────────┤
  │ Col1│  │ Col2│  │ Col3│ ← Row 2
  ├─────────────────────────────────┤
  │ Col1│  │ Col2│  │ Col3│ ← Row 3
  └─────────────────────────────────┘
        Perfect alignment!
```

## Browser Resize Behavior

```
USER ACTION: Resize browser from 1920px → 375px

                vw changes
                    ↓
        All clamp() functions recalculate
                    ↓
        --pad, --gap, --opW, --dpadW update
                    ↓
        --gridW recalculates (100% - columns)
                    ↓
        --cellW recalculates (gridW / 5)
                    ↓
        --rowH recalculates (cellW * 0.72)
                    ↓
        All key sizes and fonts automatically update
                    ↓
        All border-radius values adjust proportionally
                    ↓
        LCD height updates (cellW * 2.2)
                    ↓
        RESULT: Entire calculator scales smoothly
                No layout jumps, no key disappearance
```

---

This architecture ensures the calculator behaves like a **physical device on a virtual screen**—zoom in or out, and every element scales proportionally together.
