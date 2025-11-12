# Life Sim - Functional Status

## ✅ What's Working

### Data-Driven Architecture

- **Config files**: `frontend/config/cost_of_living.json`
- **Data files**: `frontend/data/{careers, scenarios, events, patterns}.json`
- **Sim modules**: `frontend/sim/{economy, events}.js` (lightweight copies)

### Start Screen Features

1. **Scenario Selector** - Loads from scenarios.json:

   - Student Budget (LOW region, $400 cash, no dwelling)
   - Single Parent (MED region, $800 cash, 1BR dwelling)
   - Career Switcher (HIGH region, $1200 cash, no dwelling)

2. **Region Selector** - LOW/MED/HIGH cost of living

   - Region multipliers: LOW=1.0, MED=1.25, HIGH=1.6

3. **Career Selector** - 12 careers loaded from careers.json:

   - HVAC, Electrician, Medical Assistant, RN, IT Helpdesk, SysAdmin
   - CDL Driver, Security, Teacher Aide, etc.
   - Each with hourly/salary, raises, promotion tracks

4. **Dwelling Selector** (optional):

   - None (rent = $0)
   - Roommate / Studio / 1BR / 2BR
   - **Rent Rule Enforced**: Rent is $0 until a dwelling is chosen

5. **Budget Preview Card**:
   - Shows itemized monthly expenses
   - Updates live when region/dwelling changes
   - Rent badge: Green "$0 (choose dwelling)" or Blue "$XXX" when selected

### Game Flow

- Start → Personality Quiz (10 questions) → Main Game (stage-based)
- Player state initialized from selections
- Career state tracks title, pay, raises, promotions

### Backend Integration

- Server already configured to serve `frontend/` directory
- All JSON files accessible via HTTP
- CORS headers set for cross-origin requests

## 🚧 What's Staged (Original Game Intact)

The simulation keeps the **original stage-based gameplay** for now:

- Tech/Trades/Creative/Health career paths
- Housing choices (apartment, family, room)
- Relationship/finance/career decisions
- Random events (market crash, pandemic, health)
- End-of-life summary

## 📋 Testing Instructions

### Local Testing

1. Make sure backend is running (port 3002 or your configured port)
2. Open: `http://localhost:3002/Game%20of%20Life/The%20Game%20of%20life.html`
3. Or test data loading first: `http://localhost:3002/test-life-sim.html`

### What to Verify

1. **Start Screen**:

   - All dropdowns populate
   - Budget preview updates when changing region/dwelling
   - Rent badge shows $0 until dwelling chosen
   - Scenario selector auto-fills region and dwelling

2. **Data Loading**:

   - Check browser console (F12) for any fetch errors
   - Should see no 404s for JSON files

3. **Game Start**:
   - Click "Begin Your Life"
   - Personality quiz should appear
   - After 10 questions, main game starts
   - Original stages flow normally

### Known Paths

```
Data: frontend/config/cost_of_living.json
      frontend/data/careers.json
      frontend/data/scenarios.json
      frontend/data/events.json
      frontend/data/patterns.json

Sim:  frontend/sim/economy.js
      frontend/sim/events.js

Page: frontend/Game of Life/The Game of life.html
Test: frontend/test-life-sim.html
```

## 🔮 Next Steps (When Ready)

To convert to **monthly simulation** (as per original prompt):

1. Replace stage-based yearly jumps with monthly ticks
2. Wire `sim/economy.js` functions:
   - `computeGrossIncome()` → `computePayrollNet()` → `buildMonthlyExpenses()`
   - `applyInflation()` → `rollMonthlyEvents()` → `applyMonthlyRaises()`
3. Add analytics tracking (monthly arrays)
4. Wire Chart.js to show Net Worth line + Income split
5. Add save/load (localStorage via `sim/persistence.js`)
6. Inject GED-aligned assessments at milestones
7. Add investment model (optional)

## 🐛 Troubleshooting

### If selectors are empty:

- Check browser console for fetch errors
- Verify JSON files are at correct paths relative to HTML
- Confirm backend is serving frontend directory

### If budget preview doesn't update:

- Ensure `costOfLiving` is loaded before calling `updateBudgetPreview()`
- Check that `calcRegionMultiplier()` and `buildMonthlyExpenses()` are defined

### If game doesn't start:

- Verify `window.lifeSimPlayer` and `window.lifeSimCareer` are set
- Check that `displayPersonalityQuestion()` is defined
- Look for JavaScript errors in console
