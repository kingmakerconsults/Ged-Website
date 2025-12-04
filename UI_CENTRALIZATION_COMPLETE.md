# UI Centralization Summary

## Status: ✅ Complete

The UI styling is now centralized in one location with all components (legacy and modern) referencing the same design tokens.

## Architecture

### Design Token System

- **Source of truth**: `frontend/src/theme/designSystem.css`
- Defines all CSS custom properties (`--bg-page`, `--text-primary`, `--accent`, etc.)
- Includes light and dark theme variants
- Subject-specific color schemes (Math, Science, RLA, Social Studies)

### Global Stylesheet

- **Entry point**: `frontend/styles/index.css`
- Imports design system tokens
- Provides base styles (html, body, scrollbars, links)
- Loaded by `frontend/src/main.jsx`

### Component Usage

- **Legacy components** (`frontend/_legacy/LegacyRootApp.jsx`): Use `var(--token-name)` throughout
- **Modern components** (`frontend/src/`): Use same CSS custom properties
- **Benefit**: Single point of control for all colors, spacing, and theming

## Making UI Changes

To change any visual aspect of the application:

1. **Edit design tokens**: Modify `frontend/src/theme/designSystem.css`
2. **Effect**: Changes apply to both legacy and modern components automatically
3. **Examples**:
   - Change primary accent: Edit `--accent` in designSystem.css
   - Adjust panel background: Edit `--bg-surface`
   - Modify dark theme: Edit variables in `.dark` selector

## File Structure

```
frontend/
├── styles/
│   └── index.css                 # Global stylesheet entry
├── src/
│   ├── theme/
│   │   └── designSystem.css      # ⭐ All design tokens here
│   ├── main.jsx                  # Imports global styles
│   ├── App.jsx                   # Router with legacy + modern routes
│   ├── views/                    # Modern view components
│   └── ui/                       # Centralized UI components
└── _legacy/
    └── LegacyRootApp.jsx         # Uses var(--*) tokens
```

## Verification

- ✅ Design tokens defined in single file
- ✅ Global stylesheet imports tokens
- ✅ Main entry loads global styles
- ✅ Legacy app uses CSS custom properties
- ✅ Modern components use same tokens
- ✅ Build successful
- ✅ Both legacy and modern routes functional

## Next Steps (Optional)

- Extract individual legacy components to `src/components` as needed
- Replace inline styles with utility classes where appropriate
- Continue gradual migration while maintaining feature parity
