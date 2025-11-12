# Encoding Policy

## Overview

This project enforces **UTF-8 encoding everywhere** to ensure correct display of special characters, mathematical symbols, and Unicode content across all platforms and browsers.

## Requirements

### Source Files

- **All source files** (`.js`, `.jsx`, `.html`, `.css`, `.json`, `.txt`, `.md`) must be saved with **UTF-8 encoding** (no BOM).
- Editors should be configured to default to UTF-8:
  - VS Code: Already defaults to UTF-8 (check bottom right corner of editor)
  - Other editors: Set file encoding to UTF-8 in preferences

### HTML Documents

- **Required meta tag** in all HTML files:
  ```html
  <meta charset="UTF-8" />
  ```
- Place in `<head>` section, preferably as the first meta tag

### Backend HTTP Headers

- All text-based responses must include explicit charset:
  ```javascript
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Type', 'text/css; charset=utf-8');
  ```
- Already configured in `backend/server.js` for static file serving and API endpoints

## Special Characters Reference

### Mathematics

- **Superscripts**: Use Unicode characters (², ³) not corrupted placeholders
  - `x²` not `x�`
  - `a² + b² = c²` not `a� + b� = c�`
- **Operators**:
  - Not equal: `≠` (U+2260) not `��`
  - Minus/subtraction: `−` (U+2212) or hyphen `-` not `��`
  - Multiplication: `×` (U+00D7) not `x` or `��`
  - Division: `÷` (U+00F7) or `/`
- **Fractions**: Use Unicode fractions (½, ⅓, ¼) or slash notation (`3/4`)

### Science

- **Chemical formulas**: Use subscript Unicode characters
  - Water: `H₂O` (H + subscript 2 + O) not `H��O`
  - Carbon dioxide: `CO₂` not `CO�`
- **Temperature**: Use degree symbol `°C` or `°F` not `�C` or `�F`
- **Greek letters**: Use Unicode (α, β, γ, δ, Δ) not ASCII approximations

### Typography

- **Em dash**: `—` (U+2014) not `��`
  - Example: `economic freedom—the ability to trade`
- **En dash**: `–` (U+2013) for ranges
  - Example: `pages 10–15`
- **Ellipsis**: `…` (U+2026) not `...` or `��`
- **Trademark**: `®` (U+00AE) not `�`
  - Example: `GED®` not `GED�`

### UI Symbols

- **Checkmark**: `✓` (U+2713) or `✔` (U+2714)
- **Cross mark**: `✗` (U+2717) or `✘` (U+2718)
- **Timer/Clock**: `⏱️` (U+23F1) not corrupted emoji `��️`
- **Arrows**: `→` `←` `↑` `↓` not ASCII `->` `<-`

## Validation

### Quick Check for Mojibake

Search codebase for replacement character (�):

```powershell
# PowerShell
Select-String -Path "frontend/app.jsx" -Pattern "�"
```

```bash
# Bash/Git Bash
grep -n "�" frontend/app.jsx
```

### Common Mojibake Patterns

If you see these, the file needs repair:

- `GED�` → should be `GED®`
- `H��O` → should be `H₂O`
- `word��word` → should be `word—word` (em dash)
- `30��22` → should be `30 − 22` or `30 - 22`
- `�C` → should be `°C`
- `a �� 0` → should be `a ≠ 0`
- `Loading��` → should be `Loading…`

## Best Practices

### When Writing Code

1. **Use Unicode directly** in strings for special characters:

   ```javascript
   const formula = 'ax² + bx + c = 0'; // ✓ Good
   const formula = 'ax� + bx + c = 0'; // ✗ Bad (mojibake)
   ```

2. **Use HTML entities** when appropriate in JSX/HTML:

   ```jsx
   <span>GED&reg;</span>  // Alternative to GED®
   <span>H&sub2;O</span>  // Alternative to H₂O (though H₂O preferred)
   ```

3. **Always include `aria-label`** for symbols that screen readers can't interpret:
   ```jsx
   <span aria-label={isCorrect ? 'correct' : 'incorrect'}>
     {isCorrect ? '✓' : '✗'}
   </span>
   ```

### When Importing Data

- If importing content from external sources (databases, APIs, CSV files):
  - Verify the source is UTF-8 encoded
  - Test special characters immediately after import
  - If mojibake appears, re-export source as UTF-8

### Version Control

- Git should preserve UTF-8 encoding
- Add to `.gitattributes` if needed:
  ```
  * text=auto eol=lf
  *.{js,jsx,json,html,css,md} text eol=lf encoding=utf-8
  ```

## Troubleshooting

### Problem: Characters appear as � or �� in browser

**Causes**:

1. Missing or incorrect `<meta charset="UTF-8">`
2. Server not sending `charset=utf-8` in Content-Type header
3. Source file saved with wrong encoding (e.g., Windows-1252, ISO-8859-1)

**Solution**:

1. Verify HTML meta tag exists
2. Check server response headers in browser DevTools (Network tab)
3. Re-save file with UTF-8 encoding in your editor

### Problem: Characters correct in editor but wrong in browser

**Cause**: Server stripping or misinterpreting encoding

**Solution**: Verify backend `Content-Type` headers include `charset=utf-8`

### Problem: Characters correct in browser but wrong in database

**Cause**: Database connection or column charset not UTF-8

**Solution**:

- PostgreSQL: Ensure database created with `ENCODING 'UTF8'`
- MySQL: Use `utf8mb4` character set
- Check connection string includes charset parameter

## Migration Notes

### Recent Fixes (Nov 2025)

- Replaced all `GED�` with `GED®` throughout frontend
- Fixed `H��O` → `H₂O` in science questions
- Replaced corrupted degree symbols: `�C` → `°C`
- Fixed math operators: `��` → `−` or `≠`
- Repaired em dashes: `word��word` → `word—word`
- Fixed checkmark/cross: `��` → `✓/✗`
- Added explicit UTF-8 headers to backend JS endpoints

### Remaining Known Issues

- Long passages in `app.jsx` may still contain scattered `��` patterns (em dashes between words)
- Comments referencing old fraction syntax (e.g., `��rac`) are harmless but could be cleaned

## References

- [UTF-8 Everywhere Manifesto](http://utf8everywhere.org/)
- [Unicode Character Search](https://www.unicode.org/charts/)
- [HTML Character Entity Reference](https://dev.w3.org/html5/html-author/charref)
- [MDN: Character Encodings](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)

---

**Last Updated**: November 11, 2025  
**Maintainer**: Development Team
