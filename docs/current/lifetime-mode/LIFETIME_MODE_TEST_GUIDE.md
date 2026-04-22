# Lifetime Mode - Quick Test Guide

## ✅ Integration Complete!

All lifetime mode features have been integrated into `The Game of life.html`. The simulation now supports:

1. **Stage-Based Gameplay** (Original) → 2. **Lifetime Mode** (New Extension)

---

## How to Test

### Step 1: Start the Backend Server

```powershell
cd c:\Users\Zacha\Ged-Website\backend
npm start
```

Server should run on `http://localhost:3002`

### Step 2: Open the Game

Navigate to: `http://localhost:3002/Game%20of%20Life/The%20Game%20of%20life.html`

### Step 3: Play Through Stage-Based Mode

1. Fill in **Start Age** (e.g., 20) and **Birth Year** (e.g., 2000)
2. Select **Scenario** (or customize Region/Career/Dwelling)
3. Click **"Start Your Journey"**
4. Complete the personality quiz (5 questions)
5. Play through the stage-based questions (about 10-15 stages)
6. Reach the **Result Screen**

### Step 4: Enter Lifetime Mode

1. On the result screen, you'll see a new purple card: **"Ready for the Full Journey?"**
2. Click **"Begin Lifetime Mode →"**
3. The simulation will auto-advance at 100ms per month (10 months/second)

---

## What to Watch For in Lifetime Mode

### 🎯 Auto-Advance Simulation

- **Timeline bar** fills from age 20 → 67 (retirement target)
- **Age counter** updates every month
- **Real-time pacing**: ~5 years per minute (600 months @ 100ms each)

### 🏠 Household Panel (Top Left)

- **Partner status**: "Yes" when meet_partner event triggers (age 20-35)
- **Children count**: Increases when first_child/second_child events occur
- **Childcare costs**: Active only while children are under 4 years old

### 💰 Finances Panel (Top Middle)

- **Cash**: Monthly income - expenses
- **Investments**: Growing with contributions + returns (~7% annual mean)
- **Home Equity**: Increases if home purchased (appreciation + principal paydown)

### 📊 Loans Panel (Top Right)

- **Total Balance**: Decreases as loans are paid off
- **Monthly Payment**: Sum of all loan minimums
- **Mortgage**: Shows $0 until home purchased, then displays P&I payment

### 📰 Recent Events Log (Bottom)

- Displays last 10 lifetime events
- Examples: "Met partner", "First child born", "Purchased home", "Laid off", "Market crash"
- Each entry shows age when event occurred

### ⏸️ Checkpoint Pauses

- **Triggers**: Every 5 years after age 25 (at 25, 30, 35, 40, 45, 50, 55, 60)
- **Checkpoint Modal** appears with:
  - Current financial snapshot (Net Worth, Income, Loans, Equity)
  - 2-4 decision choices:
    - ✅ Continue as planned
    - 💵 Make extra loan payment ($1,000) — if loans > $0 and cash > $1,000
    - 🏡 Consider buying home — if not owned, age < 50, cash > $10k
    - 📈 Increase retirement contributions — if current contribution < $500
- **Click any choice** to resume simulation

### 🎓 Retirement Switch (Age 67)

- Income switches from paycheck to:
  - **Social Security** (60%/40%/20% bands by wage tier)
  - **Pension** (if eligible career: nurses, teachers)
  - **Investment Withdrawals** (3-5% annual, age-based)
- Health insurance cost:
  - **Pre-65**: $650/mo
  - **Post-65** (Medicare): $180/mo

### 🏁 End of Simulation

- **Triggers**: At max years (50 years elapsed, ~age 70)
- **Result Screen** displays:
  - **Retirement Grade**: A, B, C, D, or F
  - **Net Worth** (Cash + Investments + Home Equity - Loans)
  - **Monthly Retirement Income** breakdown
  - **Income Replacement Ratio** (% of expenses covered)
  - Grade-specific message

---

## Testing Shortcuts

### Quick Test (Skip Stage-Based Mode)

Open browser console (F12) and run:

```javascript
// After filling start age/year and clicking start
window.startLifetimeMode();
```

### Manual Pause/Resume

- Click **"Pause"** button to stop auto-advance
- Click **"Resume"** to continue

### Inspect State

Console commands to check simulation state:

```javascript
// View player state
console.log(window.lifeSimPlayer);

// View career state
console.log(window.lifeSimCareer);

// View clock
console.log(window.lifetimeClock);

// View household
console.log(window.lifetimeHousehold);

// View housing
console.log(window.lifetimeHousing);

// View loans
console.log(window.lifetimeLoans);

// View event log
console.log(window.lifetimeEventLog);
```

---

## Expected Behaviors

### ✅ Rent Rule Preserved

- **Before dwelling chosen**: $0 rent
- **With dwelling (renting)**: Normal rent from basket × region multiplier
- **With dwelling (owned home)**: Mortgage P&I + property tax + insurance + maintenance
- Should see smooth transition when home purchased at checkpoint

### ✅ Career Plateau After Age 55

- Merit raises reduce to 50% of normal rate
- COLA continues (inflation protection)
- Promotions stop
- Console should show slower wage growth after 55

### ✅ Investment Growth

- Contributions: Player contribution + 3% employer match
- Returns: ~7% annual mean with volatility
- Should see exponential growth curve (compound interest)

### ✅ Childcare Lifecycle

- Costs $550-900/mo when children age 0-47 months
- Auto-drops to $0 when child turns 4 years old
- Multiple children stack costs

### ✅ Age-Windowed Events

- **meet_partner**: Only ages 20-35
- **first_child**: Only ages 22-40, requires partner
- **buy_home**: Only ages 24-50, requires !owns_home
- **health_shock**: Only ages 45-65
- Should NOT see events outside their age windows

---

## Performance Targets

### Session Duration

- **Stage-based gameplay**: 5-10 minutes
- **Lifetime mode**: ~5-6 minutes
  - 50 years × 12 months = 600 months
  - 600 months × 100ms = 60 seconds auto-play
  - 8 checkpoint pauses × ~15 seconds = 120 seconds decisions
  - Total: ~3 minutes runtime + ~2 minutes pauses = **5 minutes**
- **Full playthrough**: ~10-15 minutes (under 30-minute target ✅)

### Tick Rate

- Default: **100ms per month** = 10 months/second
- Can be adjusted in code:
  ```javascript
  lifetimeTickInterval = setInterval(lifetimeTick, 60); // Faster: 60ms
  lifetimeTickInterval = setInterval(lifetimeTick, 120); // Slower: 120ms
  ```

---

## Known Limitations (Future Enhancements)

1. **Charts**: Placeholders exist but not yet wired to Chart.js

   - Net Worth line chart
   - Income Sources stacked area chart
   - Would need Chart.js integration to display live data

2. **Life Events**: Using base `events.json` + `life_events_long.json`

   - Currently simplified event rolling
   - Could add more sophisticated event chains (e.g., divorce after children)

3. **Pension Calculation**: Stub implementation

   - Currently returns $0 for all careers
   - Full implementation needs career tracking and eligibility check

4. **GED Assessments**: Not integrated into Lifetime Mode

   - Still available in stage-based mode
   - Could add assessment checkpoints in Lifetime Mode

5. **Save/Load**: Not yet implemented
   - localStorage persistence functions exist but not wired to UI
   - Would need "Save Progress" and "Load Game" buttons

---

## Troubleshooting

### Simulation Not Starting

- Check browser console for errors (F12)
- Verify all JSON files loaded: `window.lifeEventsLong`, `window.retirementConfig`
- Ensure start age/year filled correctly

### Auto-Advance Too Fast/Slow

- Adjust tick interval in code (line ~3617):
  ```javascript
  lifetimeTickInterval = setInterval(lifetimeTick, 100); // Change 100 to 60-120
  ```

### Checkpoint Not Appearing

- Checkpoints trigger at ages: 25, 30, 35, 40, 45, 50, 55, 60
- Check `window.lifetimeLastCheckpoint` value
- Verify `shouldPauseForCheckpoint()` logic

### Events Not Triggering

- Life events have low annual probabilities (0.15-0.30)
- Converted to monthly: ~1.3-2.8% per month
- May take several years to see events
- Check console for year-end summaries

### UI Not Updating

- Verify `updateLifetimeUI()` called each tick
- Check element IDs match HTML (`lifetime-cash`, `lifetime-age`, etc.)
- Browser console should show no errors

---

## Success Criteria

✅ Simulation runs for 40-50 years without crashing
✅ Age increments monthly from 20 → 67+
✅ Checkpoints appear every 5 years after age 25
✅ Cash balance changes based on income/expenses
✅ Investments grow with contributions + returns
✅ Home purchase updates housing panel
✅ Children trigger childcare costs
✅ Retirement switches income sources
✅ Final retirement grade displays (A-F)

---

**Status**: All features implemented and ready for testing!
**Next Steps**: Play through full simulation, tune pacing if needed, add charts later.
