const express = require('express');
const db = require('../db');
const ProfileData = require('../services/profileData');

const router = express.Router();

const VALID_SIZES = new Set(['sm', 'md', 'lg', 'xl']);
const VALID_THEMES = new Set(['light', 'dark', 'system']);

async function ensureProfile(userId) {
  if (!userId) {
    return;
  }
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
    const bundle = await ProfileData.loadProfileBundle(req.userId);
    return res.json(bundle);
  } catch (err) {
    console.error('GET /api/profile/me error', err);
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

    await db.query('UPDATE users SET name = $2 WHERE id = $1', [userId, clean]);
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

    const validSubjects = ['Math', 'RLA', 'Science', 'Social Studies'];
    if (!validSubjects.includes(subject)) {
      return res.status(400).json({ error: 'Invalid or missing subject' });
    }

    if (testDate && !isValidDate(testDate)) {
      return res.status(400).json({ error: 'Invalid testDate, use YYYY-MM-DD' });
    }

    await db.query(
      `
      INSERT INTO test_plans (user_id, subject, test_date, test_location, passed, updated_at)
      VALUES ($1, $2, $3, $4, $5, now())
      ON CONFLICT (user_id, subject)
      DO UPDATE
        SET test_date = EXCLUDED.test_date,
            test_location = EXCLUDED.test_location,
            passed = EXCLUDED.passed,
            updated_at = now()
      `,
      [userId, subject, testDate || null, testLocation || null, !!passed]
    );

    const bundle = await ProfileData.loadProfileBundle(userId);
    return res.json(bundle);
  } catch (error) {
    console.error('PATCH /api/profile/test error', error);
    return res.status(500).json({ error: 'Failed to save test info' });
  }
});

router.patch('/challenges/tags', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const { selectedIds = [] } = req.body || {};
    const ids = Array.isArray(selectedIds) ? selectedIds : [];

    await db.query('DELETE FROM user_challenge_tags WHERE user_id = $1', [userId]);

    for (const challengeId of ids) {
      await db.query(
        `INSERT INTO user_challenge_tags (user_id, challenge_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, challenge_id) DO NOTHING`,
        [userId, challengeId]
      );
    }

    const bundle = await ProfileData.loadProfileBundle(userId);
    return res.json(bundle);
  } catch (error) {
    console.error('PATCH /api/profile/challenges/tags error', error);
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

    const bundle = await ProfileData.loadProfileBundle(userId);
    const hasName = !!(bundle.profile?.name && bundle.profile.name.trim());
    const hasTestInfo = Array.isArray(bundle.testPlan)
      ? bundle.testPlan.some((entry) => entry.passed || entry.testDate)
      : false;
    const hasChallenges = Array.isArray(bundle.challengeOptions)
      ? bundle.challengeOptions.some((opt) => opt.selected)
      : false;

    const missing = {
      name: !hasName,
      testInfo: !hasTestInfo,
      challenges: !hasChallenges,
    };

    if (!missing.name && !missing.testInfo && !missing.challenges) {
      await db.query(
        `UPDATE profiles
            SET onboarding_complete = TRUE,
                updated_at = now()
          WHERE user_id = $1`,
        [userId]
      );
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

    await db.query(
      `UPDATE profiles
          SET font_size = COALESCE($2, font_size),
              theme = COALESCE($3, theme),
              updated_at = now()
        WHERE user_id = $1`,
      [userId, fontSize || null, theme || null]
    );

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
