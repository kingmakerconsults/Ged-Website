# Question Tagging Scripts

These scripts help you add `challenge_tags` to questions in `app.jsx` so the Weekly Coach system can filter questions based on user-selected learning challenges.

## Challenge Tag Reference

### Math (math-1 through math-8)

- **math-1**: Fractions, decimals, %
- **math-2**: Writing and solving 1-step equations
- **math-3**: 2-step equations & inequalities
- **math-4**: Translating real situations to expressions
- **math-5**: Perimeter, area, and volume
- **math-6**: Reading tables, charts, and graphs
- **math-7**: Using the calculator efficiently
- **math-8**: Multi-step GED-style math items

### RLA (rla-1 through rla-7)

- **rla-1**: Main idea and supporting details
- **rla-2**: Author's purpose & tone
- **rla-3**: Reading charts / text together
- **rla-4**: Grammar, usage, and mechanics
- **rla-5**: Punctuation and sentence boundaries
- **rla-6**: Organizing ideas for responses
- **rla-7**: Citing evidence from the passage

### Science (science-1 through science-6)

- **science-1**: Reading charts and graphs
- **science-2**: Forces, motion, and energy
- **science-3**: Cells and human body systems
- **science-4**: Weather, climate, earth systems
- **science-5**: Experimental design & variables
- **science-6**: Cause-and-effect in passages

### Social Studies (social-1 through social-6)

- **social-1**: Government and civics concepts
- **social-2**: Interpreting maps and data
- **social-3**: Remembering historical events
- **social-4**: Colonial → Civil War sequence
- **social-5**: Basic economics and graphs
- **social-6**: Reading primary/secondary sources

## Scripts

### 1. auto_tag_questions.py (Recommended First Step)

Automatically tags questions based on keyword matching.

**Usage:**

```powershell
# Dry run (preview changes without saving)
python scripts/auto_tag_questions.py

# Apply changes
python scripts/auto_tag_questions.py --apply
```

**How it works:**

- Scans all questions in `app.jsx`
- Matches keywords in question text and passages to challenge tags
- Automatically assigns tags where there's a strong match (score >= 2)
- Backs up original file before making changes

**Pros:**

- Fast - processes all questions automatically
- Good starting point for common patterns

**Cons:**

- May miss nuanced categorizations
- Might need manual review/adjustment

### 2. tag_questions.py (For Manual Review)

Interactive CLI tool for manually tagging questions.

**Usage:**

```powershell
python scripts/tag_questions.py
```

**How it works:**

- Shows each untagged question
- Displays question preview and context
- Lets you enter tag IDs interactively
- Saves changes as you go

**Commands:**

- Enter tag IDs separated by commas: `math-1, math-6`
- `r` - Show tag reference
- `s` - Skip current question
- `q` - Quit and save

**Use this for:**

- Reviewing auto-tagged questions
- Tagging questions the auto-script missed
- Precision tagging for edge cases

## Recommended Workflow

1. **Backup your file first:**

   ```powershell
   Copy-Item frontend\app.jsx frontend\app.jsx.original
   ```

2. **Run automatic tagging (dry run):**

   ```powershell
   python scripts\auto_tag_questions.py
   ```

   Review the output to see what it would tag.

3. **Apply automatic tagging:**

   ```powershell
   python scripts\auto_tag_questions.py --apply
   ```

4. **Manually review and tag remaining questions:**

   ```powershell
   python scripts\tag_questions.py
   ```

5. **Test the system:**
   - Start your backend server
   - Open the app in browser
   - Go to Profile and select learning challenges
   - Generate a weekly plan
   - Click "Start" on a coach task
   - Verify the quiz contains only questions with matching tags

## Example: Adding Tags Manually

Before:

```javascript
{
  questionNumber: 1,
  type: 'text',
  passage: 'Photosynthesis is the process...',
  question: 'What are the three essential inputs for photosynthesis?',
  answerOptions: [...]
}
```

After:

```javascript
{
  questionNumber: 1,
  type: 'text',
  challenge_tags: ['science-3'], // Cells and human body systems
  passage: 'Photosynthesis is the process...',
  question: 'What are the three essential inputs for photosynthesis?',
  answerOptions: [...]
}
```

## Multiple Tags

Questions can have multiple tags if they cover multiple challenge areas:

```javascript
{
  questionNumber: 5,
  type: 'text',
  challenge_tags: ['math-4', 'math-5'], // Word problems + Geometry
  passage: 'A rectangular garden is 15 feet long...',
  question: 'If the garden costs $3 per square foot to install, what is the total cost?',
  answerOptions: [...]
}
```

## Checking Progress

To see how many questions still need tags:

```powershell
# Count total questions
Select-String -Path "frontend\app.jsx" -Pattern "questionNumber:" | Measure-Object

# Count tagged questions
Select-String -Path "frontend\app.jsx" -Pattern "challenge_tags:" | Measure-Object
```

## Important Notes

1. **Every question needs at least one tag** for the Weekly Coach system to work
2. **Use multiple tags** when a question truly covers multiple challenge areas
3. **Tag based on the skill being tested**, not just the topic
4. **Review auto-tagged questions** - the algorithm is good but not perfect
5. **Back up your work** regularly during this process

## Next Steps After Tagging

Once questions are tagged:

1. **Seed the database:**

   ```
   POST /api/admin/challenges/seed
   ```

   (Run this once as admin to populate the `challenge_tag_catalog` table)

2. **Test the full workflow:**

   - User selects challenges in Profile
   - System generates weekly plan
   - User clicks "Start" on coach tasks
   - Quiz contains only tagged questions for that challenge

3. **Monitor and adjust:**
   - Review user feedback
   - Adjust tags as needed
   - Add more specific tags if patterns emerge
