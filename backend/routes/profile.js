const express = require('express');
const db = require('../db');
const ProfileData = require('../services/profileData');

const router = express.Router();

const VALID_SIZES = new Set(['sm', 'md', 'lg', 'xl']);
const VALID_THEMES = new Set(['light', 'dark', 'system']);
const VALID_SUBJECTS = new Set(ProfileData.TEST_SUBJECTS || ['Math', 'RLA', 'Science', 'Social Studies']);

async function ensureProfile(userId) {
  if (!userId) {
    return;
  }
  // TODO: INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING
  await db.query(
    'INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
    [userId]
  );
}

function isValidDate(input) {
  return /^\d{4}-\d{2}-\d{2}$/.test(input);
}

router.get('/me', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    await ensureProfile(userId);
    const bundle = await ProfileData.loadProfileBundle(userId);
    return res.json(bundle);
  } catch (error) {
    console.error('GET /api/profile/me error:', error);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});

router.patch('/name', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const { name } = req.body || {};
    const clean = String(name || '').trim();
    if (!clean) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (clean.length > 80) {
      return res.status(400).json({ error: 'Name too long (max 80)' });
    }

    // TODO: UPDATE users SET name = $2 WHERE id = $1
    await db.query('UPDATE users SET name = $2 WHERE id = $1', [userId, clean]);
    ProfileData.updateProfileFields(userId, { name: clean });

    return res.json({ ok: true, name: clean });
  } catch (error) {
    console.error('PATCH /api/profile/name', error);
    return res.status(500).json({ error: 'Failed to update name' });
  }
});

router.patch('/test', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    await ensureProfile(userId);
    const { subject, testDate, testLocation, passed } = req.body || {};

    if (!subject || !VALID_SUBJECTS.has(subject)) {
      return res.status(400).json({ error: 'Invalid subject' });
    }

    if (testDate && !isValidDate(testDate)) {
      return res.status(400).json({ error: 'Invalid testDate (YYYY-MM-DD)' });
    }

    const normalizedDate = testDate ? String(testDate).trim() : null;
    const normalizedLocation = testLocation ? String(testLocation).trim() : null;
    const passedValue = !!passed;

    // TODO: UPSERT INTO test_plans (user_id, subject, test_date, test_location, passed)
    ProfileData.upsertTestPlanEntry(userId, {
      subject,
      testDate: normalizedDate || null,
      testLocation: normalizedLocation || null,
      passed: passedValue,
    });

    const bundle = await ProfileData.loadProfileBundle(userId);
    return res.json(bundle);
  } catch (error) {
    console.error('PATCH /api/profile/test error:', error);
    return res.status(500).json({ error: 'Failed to update test info' });
  }
});

router.patch('/challenges/tags', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const { selectedIds = [] } = req.body || {};

    // TODO:
    // 1. DELETE FROM user_challenge_tags WHERE user_id = $1
    // 2. INSERT INTO user_challenge_tags (user_id, challenge_id) VALUES ($1, eachSelectedId)
    ProfileData.replaceChallengeSelections(userId, Array.isArray(selectedIds) ? selectedIds : []);

    return res.json({ ok: true });
  } catch (error) {
    console.error('PATCH /api/profile/challenges/tags error:', error);
    return res.status(500).json({ error: 'Failed to update challenge tags' });
  }
});

router.post('/complete-onboarding', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    await ensureProfile(userId);

    // TODO: SELECT name FROM users WHERE id = $1
    // TODO: SELECT passed, test_date FROM profiles WHERE user_id = $1
    // TODO: SELECT COUNT(*) FROM user_challenge_tags WHERE user_id = $1
    const bundle = await ProfileData.loadProfileBundle(userId);
    const hasName = !!(bundle.profile?.name && bundle.profile.name.trim());
    const hasTestInfo = Array.isArray(bundle.testPlan)
      ? bundle.testPlan.some((entry) => entry.passed || entry.testDate)
      : !!(bundle.profile?.passed || bundle.profile?.testDate);
    const challengeCount = ProfileData.selectedChallengeCount(userId);
    const hasChallenges = challengeCount > 0;

    const missing = {
      name: !hasName,
      testInfo: !hasTestInfo,
      challenges: !hasChallenges,
    };

    if (!missing.name && !missing.testInfo && !missing.challenges) {
      // TODO: UPDATE profiles SET onboarding_complete = TRUE WHERE user_id = $1
      ProfileData.markOnboardingComplete(userId, true);
      return res.json({ ok: true });
    }

    return res.json({ ok: false, missing });
  } catch (error) {
    console.error('POST /api/profile/complete-onboarding error:', error);
    return res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

router.patch('/preferences', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    await ensureProfile(userId);

    let { fontSize, theme } = req.body || {};
    if (fontSize && !VALID_SIZES.has(fontSize)) {
      return res.status(400).json({ error: 'Invalid fontSize' });
    }
    if (theme && !VALID_THEMES.has(theme)) {
      return res.status(400).json({ error: 'Invalid theme' });
    }

    // TODO: UPDATE profiles SET font_size = $2, theme = $3, updated_at = now() WHERE user_id = $1
    const currentBundle = await ProfileData.loadProfileBundle(userId);

    await db.query(
      `UPDATE profiles
          SET font_size = COALESCE($2, font_size),
              theme = COALESCE($3, theme),
              updated_at = now()
        WHERE user_id = $1`,
      [userId, fontSize || null, theme || null]
    );

    const updatedFontSize = fontSize || currentBundle.profile.fontSize;
    const updatedTheme = theme || currentBundle.profile.theme;
    ProfileData.updateProfileFields(userId, {
      fontSize: updatedFontSize,
      theme: updatedTheme,
    });

    const row = await db.oneOrNone(
      `SELECT font_size, theme FROM profiles WHERE user_id = $1`,
      [userId]
    );

    return res.json({
      ok: true,
      fontSize: row?.font_size || 'md',
      theme: row?.theme || 'system',
    });
  } catch (error) {
    console.error('PATCH /api/profile/preferences', error);
    return res.status(500).json({ error: 'Failed to update preferences' });
  }
});

router.post('/challenges', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const text = String(req.body?.text || '').trim();
    if (!text) {
      return res.status(400).json({ error: 'Challenge text required' });
    }
    if (text.length > 280) {
      return res.status(400).json({ error: 'Max 280 characters' });
    }

    const row = await db.oneOrNone(
      `INSERT INTO profile_challenges (id, user_id, text)
       VALUES (gen_random_uuid(), $1, $2)
       RETURNING id, text, created_at`,
      [userId, text]
    );
    return res.status(201).json(row);
  } catch (error) {
    console.error('POST /api/profile/challenges error:', error);
    return res.status(500).json({ error: 'Failed to add challenge' });
  }
});

router.delete('/challenges/:id', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const { id } = req.params;
    await db.query(
      `DELETE FROM profile_challenges WHERE user_id = $1 AND id = $2`,
      [userId, id]
    );
    return res.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/profile/challenges/:id error:', error);
    return res.status(500).json({ error: 'Failed to delete challenge' });
  }
});

module.exports = router;
