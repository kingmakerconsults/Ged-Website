const express = require('express');
const db = require('../db');

const router = express.Router();

function daysUntil(dateStr) {
  if (!dateStr) return null;
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = dateStr.split('-').map(Number);
    const target = new Date(y, (m || 1) - 1, d || 1);
    const ms = target - today;
    return ms < 0 ? 0 : Math.floor(ms / 86400000);
  } catch (err) {
    return null;
  }
}

async function ensureProfile(userId) {
  await db.query(
    'INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
    [userId]
  );
}

async function loadProfile(userId) {
  await ensureProfile(userId);

  const profileRow = await db.oneOrNone(
    `SELECT user_id, test_date, test_location, reminder_enabled, timezone, updated_at
       FROM profiles
      WHERE user_id = $1`,
    [userId]
  );

  const challengeRows = await db.many(
    `SELECT id, text, created_at
       FROM profile_challenges
      WHERE user_id = $1
      ORDER BY created_at DESC`,
    [userId]
  );

  const bySubjectRows = await db.many(
    `WITH latest AS (
        SELECT DISTINCT ON (subject) subject, score_percent AS latest, taken_at
          FROM assessment_scores
         WHERE user_id = $1
         ORDER BY subject, taken_at DESC
      )
      SELECT s.subject,
             ROUND(AVG(s.score_percent)::numeric, 1) AS avg,
             l.latest
        FROM assessment_scores s
        LEFT JOIN latest l ON l.subject = s.subject
       WHERE s.user_id = $1
       GROUP BY s.subject, l.latest
       ORDER BY s.subject`,
    [userId]
  );

  const bySubtopicRows = await db.many(
    `WITH latest AS (
        SELECT DISTINCT ON (subject, subtopic) subject, subtopic, score_percent AS latest, taken_at
          FROM assessment_scores
         WHERE user_id = $1
         ORDER BY subject, subtopic, taken_at DESC
      )
      SELECT s.subject, s.subtopic,
             ROUND(AVG(s.score_percent)::numeric, 1) AS avg,
             l.latest
        FROM assessment_scores s
        LEFT JOIN latest l
          ON l.subject = s.subject AND l.subtopic = s.subtopic
       WHERE s.user_id = $1
       GROUP BY s.subject, s.subtopic, l.latest
       ORDER BY s.subject, s.subtopic`,
    [userId]
  );

  return {
    profile: {
      testDate: profileRow?.test_date || null,
      testLocation: profileRow?.test_location || null,
      reminderEnabled: profileRow?.reminder_enabled ?? true,
      timezone: profileRow?.timezone || 'America/New_York',
      daysUntilTest: daysUntil(profileRow?.test_date),
    },
    challenges: challengeRows.map((row) => ({
      id: row.id,
      text: row.text,
      createdAt: row.created_at,
    })),
    scores: {
      bySubject: bySubjectRows.map((row) => ({
        subject: row.subject,
        avg: row.avg != null ? Number(row.avg) : null,
        latest: row.latest != null ? Number(row.latest) : null,
      })),
      bySubtopic: bySubtopicRows.map((row) => ({
        subject: row.subject,
        subtopic: row.subtopic,
        avg: row.avg != null ? Number(row.avg) : null,
        latest: row.latest != null ? Number(row.latest) : null,
      })),
    },
  };
}

router.get('/me', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    const data = await loadProfile(userId);
    return res.json(data);
  } catch (e) {
    console.error('GET /api/profile/me error:', e);
    return res.status(500).json({ error: 'Failed to load profile' });
  }
});

router.patch('/me', async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    await ensureProfile(userId);

    const { testDate, testLocation, reminderEnabled, timezone } = req.body || {};
    if (testDate && !/^\d{4}-\d{2}-\d{2}$/.test(testDate)) {
      return res.status(400).json({ error: 'Invalid testDate (YYYY-MM-DD)' });
    }

    await db.query(
      `UPDATE profiles
          SET test_date = COALESCE($2, test_date),
              test_location = COALESCE($3, test_location),
              reminder_enabled = COALESCE($4, reminder_enabled),
              timezone = COALESCE($5, timezone),
              updated_at = now()
        WHERE user_id = $1`,
      [
        userId,
        testDate || null,
        testLocation || null,
        reminderEnabled == null ? null : !!reminderEnabled,
        timezone || null,
      ]
    );

    const data = await loadProfile(userId);
    return res.json(data);
  } catch (e) {
    console.error('PATCH /api/profile/me error:', e);
    return res.status(500).json({ error: 'Failed to update profile' });
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
  } catch (e) {
    console.error('POST /api/profile/challenges error:', e);
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
  } catch (e) {
    console.error('DELETE /api/profile/challenges/:id error:', e);
    return res.status(500).json({ error: 'Failed to delete challenge' });
  }
});

module.exports = router;
