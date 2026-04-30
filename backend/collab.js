// backend/collab.js
// Real-time collaboration ("Play Together") feature.
// Exposes: registerCollabRest(app, deps), attachCollabSockets(io, deps).
//
// Session types:
//   'instructor_led' — host advances; supports locked/free pace mode
//   'peer'           — two students; per-question reveal after both answer
//   'essay'          — shared turn-based essay editor

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('./db');
const {
  buildJigsawSlots,
  stitchJigsaw,
  commitParagraph,
  renderRoundRobin,
  normalizeEssayConfig,
} = require('./src/collabEssayModes');
const { scoreEssayWithAI } = require('./src/essayScoringService');

// Shared between REST and socket modules so REST handlers (e.g. session
// create) can emit "class:session_started" presence events.
let _collabNsp = null;

// ---------- Helpers ----------

function generateRoomCode() {
  // GED + 3 alphanumeric (no easily-confused chars)
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 3; i++) {
    suffix += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `GED${suffix}`;
}

function randomInt(maxExclusive) {
  const max = Math.floor(Number(maxExclusive));
  if (!Number.isFinite(max) || max <= 0) return 0;
  if (typeof crypto.randomInt === 'function') return crypto.randomInt(max);
  return Math.floor(Math.random() * max);
}

function shuffleArray(list) {
  const shuffled = Array.isArray(list) ? list.slice() : [];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function generateUniqueRoomCode() {
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = generateRoomCode();
    const existing = await db.oneOrNone(
      'SELECT 1 FROM collab_sessions WHERE room_code = $1 AND status != $2',
      [code, 'complete']
    );
    if (!existing) return code;
  }
  // Fallback: append timestamp suffix
  return `GED${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

function isInstructorRole(role) {
  return [
    'instructor',
    'teacher',
    'org_admin',
    'orgAdmin',
    'super_admin',
    'superAdmin',
    'admin',
  ].includes(String(role || '').toLowerCase());
}

function sanitizeQuestionForClient(q) {
  // Strip answer fields when sending to non-host before reveal.
  if (!q || typeof q !== 'object') return q;
  const { correctAnswer, answer, explanation, rationale, ...safe } = q;
  // Project schema: answerOptions = [{text, isCorrect, rationale}, ...]
  // Strip isCorrect + rationale from each option so non-host can't peek.
  if (Array.isArray(safe.answerOptions)) {
    safe.answerOptions = safe.answerOptions.map((o) => {
      if (!o || typeof o !== 'object') return o;
      const { isCorrect, rationale, ...rest } = o;
      return rest;
    });
  }
  if (Array.isArray(safe.options)) {
    safe.options = safe.options.map((o) => {
      if (!o || typeof o !== 'object') return o;
      const { isCorrect, rationale, ...rest } = o;
      return rest;
    });
  }
  return safe;
}

function deriveCorrectAnswer(q) {
  if (!q) return null;
  if (q.correctAnswer != null) return q.correctAnswer;
  if (q.answer != null) return q.answer;
  if (q.correct != null) return q.correct;
  if (Array.isArray(q.answerOptions)) {
    const c = q.answerOptions.find((o) => o && o.isCorrect);
    if (c) return c.text ?? c.value ?? c.label ?? null;
  }
  if (Array.isArray(q.options)) {
    const c = q.options.find((o) => o && typeof o === 'object' && o.isCorrect);
    if (c) return c.value ?? c.text ?? c.label ?? null;
  }
  return null;
}

function deriveExplanation(q, correctValue) {
  if (!q) return null;
  if (q.explanation) return q.explanation;
  if (q.rationale) return q.rationale;
  if (Array.isArray(q.answerOptions)) {
    const match = q.answerOptions.find(
      (o) => o && (o.text === correctValue || o.value === correctValue)
    );
    if (match && match.rationale) return match.rationale;
    const correctOpt = q.answerOptions.find((o) => o && o.isCorrect);
    if (correctOpt && correctOpt.rationale) return correctOpt.rationale;
  }
  return null;
}

function buildRoomState(
  session,
  participants,
  { includeAnswers = false } = {}
) {
  const state = session.session_state || {};
  const isComplete = session.status === 'complete';
  const revealed = new Set(state.revealedQuestions || []);
  const quiz = session.quiz_snapshot || null;
  const sanitizedQuiz = quiz
    ? {
        ...quiz,
        questions: Array.isArray(quiz.questions)
          ? quiz.questions.map((q, idx) =>
              includeAnswers || isComplete || revealed.has(idx)
                ? q
                : sanitizeQuestionForClient(q)
            )
          : [],
      }
    : null;

  return {
    sessionId: session.id,
    roomCode: session.room_code,
    sessionType: session.session_type,
    title: session.title,
    subject: session.subject,
    quizId: session.quiz_id,
    hostId: session.host_id,
    classId: session.class_id,
    organizationId: session.organization_id,
    status: session.status,
    maxParticipants: session.max_participants,
    quiz: sanitizedQuiz,
    state,
    participants: participants.map((p) => ({
      id: p.id,
      userId: p.user_id,
      displayName: p.display_name,
      role: p.role,
      connected: p.connected,
      answeredQuestions: p.answers ? Object.keys(p.answers).map(Number) : [],
      // Include raw answers when session is complete (for the review screen)
      // or when the consumer explicitly asks (host-side).
      answers: includeAnswers || isComplete ? p.answers || {} : undefined,
    })),
  };
}

async function loadSessionByRoomCode(roomCode) {
  return db.oneOrNone('SELECT * FROM collab_sessions WHERE room_code = $1', [
    roomCode,
  ]);
}

async function loadSessionById(id) {
  return db.oneOrNone('SELECT * FROM collab_sessions WHERE id = $1', [id]);
}

async function loadParticipants(sessionId) {
  return db
    .many(
      'SELECT * FROM collab_participants WHERE session_id = $1 ORDER BY joined_at ASC',
      [sessionId]
    )
    .catch(() => []);
}

async function upsertParticipant(sessionId, user) {
  // Returns the participant row.
  const displayName = user.name || user.email || `Learner ${user.id}`;
  const existing = await db.oneOrNone(
    'SELECT * FROM collab_participants WHERE session_id = $1 AND user_id = $2',
    [sessionId, user.id]
  );
  if (existing) {
    await db.none(
      'UPDATE collab_participants SET last_active_at = NOW() WHERE id = $1',
      [existing.id]
    );
    return existing;
  }
  return db.one(
    `INSERT INTO collab_participants (session_id, user_id, display_name, role)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [sessionId, user.id, displayName, 'participant']
  );
}

async function getQuizById(quizId, allQuizzesGetter) {
  if (!quizId) return null;
  try {
    const all =
      typeof allQuizzesGetter === 'function' ? allQuizzesGetter() : null;
    if (!all) return null;
    // Legacy flat shapes: { quizId: {...} } or { subject: { quizId: {...} } }
    if (all[quizId] && Array.isArray(all[quizId].questions)) {
      return { id: quizId, ...all[quizId] };
    }
    for (const subjectKey of Object.keys(all)) {
      const subj = all[subjectKey];
      if (!subj || typeof subj !== 'object') continue;
      if (subj[quizId] && Array.isArray(subj[quizId].questions)) {
        return { id: quizId, subject: subjectKey, ...subj[quizId] };
      }
      // Nested catalog shape: subj.categories[catName].topics[].quizzes[]
      const cats = subj.categories || {};
      for (const catName of Object.keys(cats)) {
        const cat = cats[catName];
        const topics = (cat && cat.topics) || [];
        for (const topic of topics) {
          if (Array.isArray(topic.quizzes)) {
            for (const q of topic.quizzes) {
              if (
                q &&
                (q.quizId === quizId || q.id === quizId) &&
                Array.isArray(q.questions)
              ) {
                return {
                  id: quizId,
                  subject: subjectKey,
                  title: q.title || quizId,
                  questions: q.questions,
                };
              }
            }
          }
          // Topic itself may be a "quiz" (legacy: topic.questions, no quizzes array)
          if (
            (topic.id === quizId || topic.title === quizId) &&
            Array.isArray(topic.questions) &&
            topic.questions.length > 0
          ) {
            return {
              id: quizId,
              subject: subjectKey,
              title: topic.title || quizId,
              questions: topic.questions,
            };
          }
        }
        if (Array.isArray(cat && cat.quizzes)) {
          for (const q of cat.quizzes) {
            if (
              q &&
              (q.quizId === quizId || q.id === quizId) &&
              Array.isArray(q.questions)
            ) {
              return {
                id: quizId,
                subject: subjectKey,
                title: q.title || quizId,
                questions: q.questions,
              };
            }
          }
        }
      }
    }
  } catch (_) {}
  return null;
}

// ---------- REST ----------

function registerCollabRest(app, { authenticateBearerToken, getAllQuizzes }) {
  // Create a session
  app.post(
    '/api/collab/sessions',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        let {
          sessionType,
          quizId,
          subject,
          title,
          classId,
          curriculumItemId,
          questions, // optional inline questions array
          config,
        } = req.body || {};

        // If launching from a curriculum item, resolve it server-side and
        // force instructor_led + locked. The curriculum item is the source
        // of truth for class, subject, quiz, and title.
        let curriculumItem = null;
        if (curriculumItemId) {
          if (!isInstructorRole(user.role)) {
            return res.status(403).json({ error: 'Instructor role required' });
          }
          curriculumItem = await db.oneOrNone(
            `SELECT ci.*, c.teacher_id, c.organization_id AS class_org_id
               FROM class_curriculum_items ci
               JOIN classes c ON c.id = ci.class_id
              WHERE ci.id = $1`,
            [Number(curriculumItemId)]
          );
          if (!curriculumItem) {
            return res.status(404).json({ error: 'Curriculum item not found' });
          }
          const isOwner = Number(curriculumItem.teacher_id) === Number(user.id);
          const isSuper =
            String(user.role || '').toLowerCase() === 'super_admin';
          if (!isOwner && !isSuper) {
            return res.status(403).json({ error: 'You do not own this class' });
          }
          sessionType = 'instructor_led';
          classId = curriculumItem.class_id;
          quizId = curriculumItem.quiz_id || quizId;
          subject = curriculumItem.subject || subject;
          title = curriculumItem.title || title;
        }

        if (!['instructor_led', 'peer', 'essay'].includes(sessionType)) {
          return res.status(400).json({ error: 'Invalid sessionType' });
        }

        let quizSnapshot = null;
        if (sessionType !== 'essay') {
          if (Array.isArray(questions) && questions.length > 0) {
            quizSnapshot = {
              id: quizId || null,
              title: title || 'Live Quiz',
              questions,
            };
          } else if (quizId) {
            const found = await getQuizById(quizId, getAllQuizzes);
            if (!found) {
              return res.status(404).json({ error: 'Quiz not found' });
            }
            quizSnapshot = {
              id: quizId,
              title: found.title || title || quizId,
              questions: Array.isArray(found.questions) ? found.questions : [],
            };
          } else {
            return res
              .status(400)
              .json({ error: 'quizId or inline questions required' });
          }
        }

        const initialEssayTurn =
          sessionType === 'essay' ? Number(user.id) : null;
        const essayDefaults =
          sessionType === 'essay'
            ? normalizeEssayConfig(config || {})
            : { essayMode: 'free', essayTimer: null, essayJigsawFormat: null };
        const initialState = {
          phase: 'lobby',
          currentQuestion: 0,
          paceMode: sessionType === 'instructor_led' ? 'locked' : 'free',
          revealedQuestions: [],
          essayContent: '',
          essayTurn: initialEssayTurn,
          essayHistory: [],
          essayPrompt:
            sessionType === 'essay'
              ? config?.essayPrompt ||
                'Write a collaborative essay on a topic of your choice.'
              : null,
          essayTopic:
            sessionType === 'essay' ? config?.essayTopic || null : null,
          // ----- new collab essay fields (mode + timer + per-mode buffers) -----
          essayMode: essayDefaults.essayMode,
          essayTimer: essayDefaults.essayTimer,
          essayJigsawFormat: essayDefaults.essayJigsawFormat,
          // round_robin: committed paragraphs + in-flight draft
          essayParagraphs: [],
          currentParagraphDraft: '',
          // jigsaw: { format, slots:[{key,label,order,assigneeUserId,content}] }
          essayJigsaw: null,
          // ai review (filled in after submit)
          aiReview: null,
        };

        const roomCode = await generateUniqueRoomCode();

        const inserted = await db.one(
          `INSERT INTO collab_sessions
          (room_code, session_type, host_id, class_id, organization_id, title, subject, quiz_id, quiz_snapshot, quiz_config, session_state, status, curriculum_item_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'lobby', $12)
         RETURNING *`,
          [
            roomCode,
            sessionType,
            user.id || null,
            classId || null,
            user.organization_id || null,
            title || quizSnapshot?.title || 'Live Session',
            subject || null,
            quizId || null,
            quizSnapshot ? JSON.stringify(quizSnapshot) : null,
            JSON.stringify(config || {}),
            JSON.stringify(initialState),
            curriculumItem ? curriculumItem.id : null,
          ]
        );

        // Add host as participant with role 'host'
        const hostName = user.name || user.email || `Host ${user.id}`;
        await db.none(
          `INSERT INTO collab_participants (session_id, user_id, display_name, role)
         VALUES ($1, $2, $3, 'host')
         ON CONFLICT (session_id, user_id) DO NOTHING`,
          [inserted.id, user.id, hostName]
        );

        // If session is tied to a class, pre-create participant rows for
        // every enrolled student. They start `connected = false` and don't
        // consume a slot until they actually join. Then broadcast a
        // "class:session_started" presence event so their app can show the
        // one-click join banner without them needing to type the code.
        if (classId && sessionType === 'instructor_led') {
          try {
            const enrollees = await db
              .many(
                `SELECT u.id AS user_id,
                        COALESCE(u.name, u.email, 'Learner ' || u.id::text) AS display_name
                   FROM class_enrollments e
                   JOIN users u ON u.id = e.user_id
                  WHERE e.class_id = $1 AND u.id != $2`,
                [classId, user.id]
              )
              .catch(() => []);
            for (const en of enrollees) {
              await db.none(
                `INSERT INTO collab_participants (session_id, user_id, display_name, role)
                 VALUES ($1, $2, $3, 'participant')
                 ON CONFLICT (session_id, user_id) DO NOTHING`,
                [inserted.id, en.user_id, en.display_name]
              );
            }

            if (_collabNsp) {
              _collabNsp.to(`class:${classId}`).emit('class:session_started', {
                classId: Number(classId),
                roomCode: inserted.room_code,
                sessionId: inserted.id,
                title: inserted.title,
                subject: inserted.subject,
                instructorName: hostName,
                curriculumItemId: curriculumItem ? curriculumItem.id : null,
              });
            }
          } catch (e) {
            console.error(
              '[collab] class auto-enroll/presence emit failed:',
              e?.message || e
            );
          }
        }

        return res.json({
          sessionId: inserted.id,
          roomCode: inserted.room_code,
          sessionType: inserted.session_type,
        });
      } catch (err) {
        console.error('[collab] create session error:', err);
        return res.status(500).json({ error: 'Failed to create session' });
      }
    }
  );

  // Get session by room code
  app.get(
    '/api/collab/sessions/:roomCode',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const session = await loadSessionByRoomCode(req.params.roomCode);
        if (!session) {
          return res.status(404).json({ error: 'Session not found' });
        }
        if (new Date(session.expires_at) < new Date()) {
          return res.status(410).json({ error: 'Session expired' });
        }
        const participants = await loadParticipants(session.id);
        const isHost = req.user && req.user.id === session.host_id;
        return res.json(
          buildRoomState(session, participants, { includeAnswers: isHost })
        );
      } catch (err) {
        console.error('[collab] get session error:', err);
        return res.status(500).json({ error: 'Failed to load session' });
      }
    }
  );

  // List active sessions in user's org
  app.get(
    '/api/collab/sessions/active',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        const orgId = user.organization_id || null;
        const rows = await db
          .many(
            `SELECT s.*, COUNT(p.id)::int AS participant_count
           FROM collab_sessions s
           LEFT JOIN collab_participants p ON p.session_id = s.id
           WHERE s.status != 'complete'
             AND s.expires_at > NOW()
           GROUP BY s.id
           ORDER BY s.created_at DESC
           LIMIT 50`,
            []
          )
          .catch(() => []);
        return res.json({
          sessions: rows.map((s) => ({
            sessionId: s.id,
            roomCode: s.room_code,
            sessionType: s.session_type,
            title: s.title,
            subject: s.subject,
            status: s.status,
            participantCount: s.participant_count || 0,
            maxParticipants: s.max_participants,
            createdAt: s.created_at,
          })),
        });
      } catch (err) {
        console.error('[collab] active sessions error:', err);
        return res.status(500).json({ error: 'Failed to list sessions' });
      }
    }
  );

  // ---------- Classes ----------

  function genClassJoinCode() {
    const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 6; i++) {
      s += ALPHABET[randomInt(ALPHABET.length)];
    }
    return s;
  }

  app.post('/api/classes', authenticateBearerToken, async (req, res) => {
    try {
      const user = req.user || {};
      if (!isInstructorRole(user.role)) {
        return res.status(403).json({ error: 'Instructor role required' });
      }
      const { name, color } = req.body || {};
      if (!name || !String(name).trim()) {
        return res.status(400).json({ error: 'Class name required' });
      }
      let joinCode;
      for (let i = 0; i < 6; i++) {
        joinCode = genClassJoinCode();
        const exists = await db.oneOrNone(
          'SELECT 1 FROM classes WHERE join_code = $1',
          [joinCode]
        );
        if (!exists) break;
      }
      const row = await db.one(
        `INSERT INTO classes (organization_id, teacher_id, name, color, join_code)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          user.organization_id || null,
          user.id,
          name.trim(),
          color || null,
          joinCode,
        ]
      );
      return res.json(row);
    } catch (err) {
      console.error('[collab] create class error:', err);
      return res.status(500).json({ error: 'Failed to create class' });
    }
  });

  app.get('/api/classes', authenticateBearerToken, async (req, res) => {
    try {
      const user = req.user || {};
      let rows = [];
      if (isInstructorRole(user.role)) {
        rows = await db
          .many(
            `SELECT c.*, COUNT(e.id)::int AS member_count
           FROM classes c
           LEFT JOIN class_enrollments e ON e.class_id = c.id
           WHERE c.teacher_id = $1 OR c.organization_id = $2
           GROUP BY c.id
           ORDER BY c.created_at DESC`,
            [user.id, user.organization_id || -1]
          )
          .catch(() => []);
      } else {
        rows = await db
          .many(
            `SELECT c.*
           FROM classes c
           JOIN class_enrollments e ON e.class_id = c.id
           WHERE e.user_id = $1
           ORDER BY c.created_at DESC`,
            [user.id]
          )
          .catch(() => []);
      }
      return res.json({ classes: rows });
    } catch (err) {
      console.error('[collab] list classes error:', err);
      return res.status(500).json({ error: 'Failed to list classes' });
    }
  });

  app.post('/api/classes/enroll', authenticateBearerToken, async (req, res) => {
    try {
      const user = req.user || {};
      const { joinCode } = req.body || {};
      if (!joinCode)
        return res.status(400).json({ error: 'joinCode required' });
      const cls = await db.oneOrNone(
        'SELECT * FROM classes WHERE join_code = $1 AND is_active = TRUE',
        [String(joinCode).trim().toUpperCase()]
      );
      if (!cls) return res.status(404).json({ error: 'Class not found' });
      await db.none(
        `INSERT INTO class_enrollments (class_id, user_id)
           VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [cls.id, user.id]
      );
      return res.json({ ok: true, classId: cls.id, name: cls.name });
    } catch (err) {
      console.error('[collab] enroll error:', err);
      return res.status(500).json({ error: 'Failed to enroll' });
    }
  });

  app.get(
    '/api/classes/:id/members',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const id = Number(req.params.id);
        const members = await db
          .many(
            `SELECT u.id, u.email, u.name, e.enrolled_at
           FROM class_enrollments e
           JOIN users u ON u.id = e.user_id
           WHERE e.class_id = $1
           ORDER BY e.enrolled_at ASC`,
            [id]
          )
          .catch(() => []);
        return res.json({ members });
      } catch (err) {
        console.error('[collab] members error:', err);
        return res.status(500).json({ error: 'Failed to load members' });
      }
    }
  );

  // ---------- Class roster: add/remove from org ----------

  async function loadClassForInstructor(classId, user) {
    const cls = await db.oneOrNone('SELECT * FROM classes WHERE id = $1', [
      Number(classId),
    ]);
    if (!cls) return { error: 404 };
    const isOwner = Number(cls.teacher_id) === Number(user.id);
    const isSuper = String(user.role || '').toLowerCase() === 'super_admin';
    const isOrgAdmin =
      ['org_admin', 'orgadmin', 'admin'].includes(
        String(user.role || '').toLowerCase()
      ) && Number(cls.organization_id) === Number(user.organization_id || -1);
    if (!isOwner && !isSuper && !isOrgAdmin) return { error: 403 };
    return { cls };
  }

  app.get(
    '/api/classes/:id/eligible-students',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        if (!cls.organization_id) {
          return res.json({ students: [] });
        }
        const rows = await db
          .many(
            `SELECT u.id, u.email, u.name
               FROM users u
              WHERE u.organization_id = $1
                AND LOWER(COALESCE(u.role, 'student')) IN ('student','learner')
                AND NOT EXISTS (
                  SELECT 1 FROM class_enrollments e
                   WHERE e.class_id = $2 AND e.user_id = u.id
                )
              ORDER BY COALESCE(u.name, u.email) ASC
              LIMIT 500`,
            [cls.organization_id, cls.id]
          )
          .catch(() => []);
        return res.json({ students: rows });
      } catch (err) {
        console.error('[collab] eligible-students error:', err);
        return res.status(500).json({ error: 'Failed to load students' });
      }
    }
  );

  app.post(
    '/api/classes/:id/members',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const userIds = Array.isArray(req.body?.userIds)
          ? req.body.userIds.map((n) => Number(n)).filter((n) => n > 0)
          : [];
        if (userIds.length === 0) {
          return res.status(400).json({ error: 'userIds required' });
        }
        // Verify each user belongs to the same org as the class
        const sameOrg = await db
          .many(
            `SELECT id FROM users WHERE id = ANY($1) AND organization_id = $2`,
            [userIds, cls.organization_id]
          )
          .catch(() => []);
        const valid = sameOrg.map((r) => r.id);
        let added = 0;
        for (const uid of valid) {
          const r = await db.result(
            `INSERT INTO class_enrollments (class_id, user_id)
               VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [cls.id, uid]
          );
          if (r.rowCount > 0) added += 1;
        }
        return res.json({
          added,
          requested: userIds.length,
          valid: valid.length,
        });
      } catch (err) {
        console.error('[collab] add members error:', err);
        return res.status(500).json({ error: 'Failed to add members' });
      }
    }
  );

  app.delete(
    '/api/classes/:id/members/:userId',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const uid = Number(req.params.userId);
        await db.none(
          'DELETE FROM class_enrollments WHERE class_id = $1 AND user_id = $2',
          [cls.id, uid]
        );
        return res.json({ ok: true });
      } catch (err) {
        console.error('[collab] remove member error:', err);
        return res.status(500).json({ error: 'Failed to remove member' });
      }
    }
  );

  // ---------- Curriculum CRUD ----------

  async function userCanViewClass(classId, user) {
    if (isInstructorRole(user.role)) {
      const r = await loadClassForInstructor(classId, user);
      if (!r.error) return r.cls;
    }
    const enrolled = await db.oneOrNone(
      `SELECT c.* FROM classes c
         JOIN class_enrollments e ON e.class_id = c.id
        WHERE c.id = $1 AND e.user_id = $2`,
      [Number(classId), Number(user.id)]
    );
    return enrolled || null;
  }

  app.get(
    '/api/classes/:id/curriculum',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        const cls = await userCanViewClass(req.params.id, user);
        if (!cls) return res.status(403).json({ error: 'Forbidden' });
        const items = await db
          .many(
            `SELECT * FROM class_curriculum_items
              WHERE class_id = $1
              ORDER BY position ASC, id ASC`,
            [cls.id]
          )
          .catch(() => []);
        const coverage = await db
          .many(
            `SELECT DISTINCT ON (curriculum_item_id)
                    curriculum_item_id, covered_at, source, session_id
               FROM class_curriculum_coverage
              WHERE class_id = $1
              ORDER BY curriculum_item_id, covered_at DESC`,
            [cls.id]
          )
          .catch(() => []);
        const covMap = new Map(coverage.map((c) => [c.curriculum_item_id, c]));
        // Expose any active live session per item so the student UI can
        // show "in progress now" markers.
        const liveSessions = await db
          .many(
            `SELECT curriculum_item_id, room_code
               FROM collab_sessions
              WHERE class_id = $1
                AND curriculum_item_id IS NOT NULL
                AND status != 'complete'
                AND expires_at > NOW()`,
            [cls.id]
          )
          .catch(() => []);
        const liveMap = new Map(
          liveSessions.map((s) => [s.curriculum_item_id, s.room_code])
        );
        return res.json({
          classId: cls.id,
          className: cls.name,
          joinCode: cls.join_code,
          isInstructor: Number(cls.teacher_id) === Number(user.id),
          items: items.map((it) => ({
            id: it.id,
            position: it.position,
            subject: it.subject,
            categoryName: it.category_name,
            topicId: it.topic_id,
            quizId: it.quiz_id,
            title: it.title,
            plannedDate: it.planned_date,
            manuallyMarkedCovered: it.manually_marked_covered,
            coverage: covMap.get(it.id)
              ? {
                  coveredAt: covMap.get(it.id).covered_at,
                  source: covMap.get(it.id).source,
                  sessionId: covMap.get(it.id).session_id,
                }
              : null,
            liveRoomCode: liveMap.get(it.id) || null,
          })),
        });
      } catch (err) {
        console.error('[collab] curriculum get error:', err);
        return res.status(500).json({ error: 'Failed to load curriculum' });
      }
    }
  );

  app.post(
    '/api/classes/:id/curriculum',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const { subject, categoryName, topicId, quizId, title, plannedDate } =
          req.body || {};
        if (!title || !String(title).trim()) {
          return res.status(400).json({ error: 'title required' });
        }
        const max = await db.oneOrNone(
          'SELECT COALESCE(MAX(position), -1) AS m FROM class_curriculum_items WHERE class_id = $1',
          [cls.id]
        );
        const nextPos = (max?.m ?? -1) + 1;
        const row = await db.one(
          `INSERT INTO class_curriculum_items
             (class_id, position, subject, category_name, topic_id, quiz_id, title, planned_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING *`,
          [
            cls.id,
            nextPos,
            subject || null,
            categoryName || null,
            topicId || null,
            quizId || null,
            String(title).trim(),
            plannedDate || null,
          ]
        );
        return res.json({ item: row });
      } catch (err) {
        console.error('[collab] curriculum create error:', err);
        return res.status(500).json({ error: 'Failed to create item' });
      }
    }
  );

  app.patch(
    '/api/classes/:id/curriculum/:itemId',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const itemId = Number(req.params.itemId);
        const fields = req.body || {};
        const map = {
          subject: 'subject',
          categoryName: 'category_name',
          topicId: 'topic_id',
          quizId: 'quiz_id',
          title: 'title',
          plannedDate: 'planned_date',
        };
        const sets = [];
        const vals = [];
        let i = 1;
        for (const [k, col] of Object.entries(map)) {
          if (k in fields) {
            sets.push(`${col} = $${i++}`);
            vals.push(fields[k] === '' ? null : fields[k]);
          }
        }
        if (sets.length === 0) return res.json({ ok: true });
        sets.push(`updated_at = NOW()`);
        vals.push(itemId, cls.id);
        await db.none(
          `UPDATE class_curriculum_items SET ${sets.join(', ')}
             WHERE id = $${i++} AND class_id = $${i}`,
          vals
        );
        return res.json({ ok: true });
      } catch (err) {
        console.error('[collab] curriculum update error:', err);
        return res.status(500).json({ error: 'Failed to update item' });
      }
    }
  );

  app.post(
    '/api/classes/:id/curriculum/reorder',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const ids = Array.isArray(req.body?.orderedIds)
          ? req.body.orderedIds.map((n) => Number(n)).filter((n) => n > 0)
          : [];
        for (let pos = 0; pos < ids.length; pos++) {
          await db.none(
            `UPDATE class_curriculum_items SET position = $1, updated_at = NOW()
               WHERE id = $2 AND class_id = $3`,
            [pos, ids[pos], cls.id]
          );
        }
        return res.json({ ok: true });
      } catch (err) {
        console.error('[collab] curriculum reorder error:', err);
        return res.status(500).json({ error: 'Failed to reorder' });
      }
    }
  );

  app.delete(
    '/api/classes/:id/curriculum/:itemId',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const itemId = Number(req.params.itemId);
        await db.none(
          'DELETE FROM class_curriculum_items WHERE id = $1 AND class_id = $2',
          [itemId, cls.id]
        );
        return res.json({ ok: true });
      } catch (err) {
        console.error('[collab] curriculum delete error:', err);
        return res.status(500).json({ error: 'Failed to delete item' });
      }
    }
  );

  app.post(
    '/api/classes/:id/curriculum/:itemId/cover',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        if (!isInstructorRole(user.role)) {
          return res.status(403).json({ error: 'Instructor role required' });
        }
        const { cls, error } = await loadClassForInstructor(
          req.params.id,
          user
        );
        if (error) return res.status(error).json({ error: 'Forbidden' });
        const itemId = Number(req.params.itemId);
        const covered = !!req.body?.covered;
        if (covered) {
          await db.none(
            `UPDATE class_curriculum_items
                SET manually_marked_covered = TRUE, updated_at = NOW()
              WHERE id = $1 AND class_id = $2`,
            [itemId, cls.id]
          );
          await db.none(
            `INSERT INTO class_curriculum_coverage
                 (class_id, curriculum_item_id, source)
               VALUES ($1, $2, 'manual')`,
            [cls.id, itemId]
          );
        } else {
          await db.none(
            `UPDATE class_curriculum_items
                SET manually_marked_covered = FALSE, updated_at = NOW()
              WHERE id = $1 AND class_id = $2`,
            [itemId, cls.id]
          );
          // Remove manual coverage rows; preserve session-based coverage history.
          await db.none(
            `DELETE FROM class_curriculum_coverage
              WHERE class_id = $1 AND curriculum_item_id = $2 AND source = 'manual'`,
            [cls.id, itemId]
          );
        }
        return res.json({ ok: true });
      } catch (err) {
        console.error('[collab] coverage toggle error:', err);
        return res.status(500).json({ error: 'Failed to toggle coverage' });
      }
    }
  );

  // ---------- Class-led one-click join ----------
  app.post(
    '/api/classes/:id/join-current-session',
    authenticateBearerToken,
    async (req, res) => {
      try {
        const user = req.user || {};
        const classId = Number(req.params.id);
        const enrolled = await db.oneOrNone(
          `SELECT 1 FROM class_enrollments
            WHERE class_id = $1 AND user_id = $2`,
          [classId, user.id]
        );
        const isOwnerInstructor = await db.oneOrNone(
          `SELECT 1 FROM classes WHERE id = $1 AND teacher_id = $2`,
          [classId, user.id]
        );
        if (!enrolled && !isOwnerInstructor) {
          return res.status(403).json({ error: 'Not enrolled in this class' });
        }
        const live = await db.oneOrNone(
          `SELECT room_code FROM collab_sessions
            WHERE class_id = $1
              AND status != 'complete'
              AND expires_at > NOW()
            ORDER BY created_at DESC
            LIMIT 1`,
          [classId]
        );
        if (!live) return res.status(404).json({ error: 'No active session' });
        return res.json({ roomCode: live.room_code });
      } catch (err) {
        console.error('[collab] join-current-session error:', err);
        return res.status(500).json({ error: 'Failed' });
      }
    }
  );
}

// ---------- Socket.io ----------

function attachCollabSockets(io, { getAllQuizzes }) {
  const nsp = io.of('/collab');
  _collabNsp = nsp;

  // ---- Essay timer registry (in-memory) ----
  // Map<sessionId, { turnTimer:Timeout|null, sessionTimer:Timeout|null,
  //                  turnDeadline:number|null, sessionDeadline:number|null }>
  const essayTimers = new Map();

  function clearEssayTimers(sessionId, which = 'all') {
    const entry = essayTimers.get(sessionId);
    if (!entry) return;
    if ((which === 'all' || which === 'turn') && entry.turnTimer) {
      clearTimeout(entry.turnTimer);
      entry.turnTimer = null;
      entry.turnDeadline = null;
    }
    if ((which === 'all' || which === 'session') && entry.sessionTimer) {
      clearTimeout(entry.sessionTimer);
      entry.sessionTimer = null;
      entry.sessionDeadline = null;
    }
    if (!entry.turnTimer && !entry.sessionTimer) {
      essayTimers.delete(sessionId);
    }
  }

  function getOrCreateEssayTimerEntry(sessionId) {
    let entry = essayTimers.get(sessionId);
    if (!entry) {
      entry = {
        turnTimer: null,
        sessionTimer: null,
        turnDeadline: null,
        sessionDeadline: null,
      };
      essayTimers.set(sessionId, entry);
    }
    return entry;
  }

  // Re-arm or set a per-turn timer using the (possibly already-set) deadline
  // in session_state. When fired, auto-pass the turn.
  async function armPerTurnTimer(sessionId) {
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return;
    const state = session.session_state || {};
    const deadlineIso = state.essayTimer?.turnDeadline || null;
    clearEssayTimers(sessionId, 'turn');
    if (!deadlineIso) return;
    const ms = new Date(deadlineIso).getTime() - Date.now();
    if (!Number.isFinite(ms)) return;
    const entry = getOrCreateEssayTimerEntry(sessionId);
    entry.turnDeadline = deadlineIso;
    entry.turnTimer = setTimeout(
      () => onPerTurnTimeout(sessionId).catch(() => {}),
      Math.max(0, ms)
    );
  }

  async function armSessionTimer(sessionId) {
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return;
    const state = session.session_state || {};
    const deadlineIso = state.essayTimer?.sessionDeadline || null;
    clearEssayTimers(sessionId, 'session');
    if (!deadlineIso) return;
    const ms = new Date(deadlineIso).getTime() - Date.now();
    if (!Number.isFinite(ms)) return;
    const entry = getOrCreateEssayTimerEntry(sessionId);
    entry.sessionDeadline = deadlineIso;
    entry.sessionTimer = setTimeout(
      () => onSessionTimeout(sessionId).catch(() => {}),
      Math.max(0, ms)
    );
  }

  // Auto-pass the current turn (round_robin / free). Jigsaw doesn't use turns;
  // for jigsaw we just clear the per-turn deadline and notify clients.
  async function onPerTurnTimeout(sessionId) {
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return;
    if (session.status === 'complete') return;
    const state = session.session_state || {};
    const mode = state.essayMode || 'free';
    nsp
      .to(`session:${sessionId}`)
      .emit('essay:turn_timeout', { mode, at: new Date().toISOString() });
    if (mode === 'jigsaw') {
      // For jigsaw the per-turn timer is repurposed as a soft reminder only.
      return;
    }
    await advanceEssayTurn(sessionId, { reason: 'timeout' });
  }

  async function onSessionTimeout(sessionId) {
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return;
    if (session.status === 'complete') return;
    nsp
      .to(`session:${sessionId}`)
      .emit('essay:session_timeout', { at: new Date().toISOString() });
    await finalizeEssaySubmission(sessionId, {
      submittedBy: null,
      reason: 'session_timeout',
    });
  }

  // Compute the next per-turn deadline ISO from state.essayTimer; null if disabled.
  function computeNextTurnDeadline(state) {
    const secs = state?.essayTimer?.perTurnSeconds;
    if (!Number.isFinite(secs) || secs <= 0) return null;
    return new Date(Date.now() + secs * 1000).toISOString();
  }

  // Rotate the essay turn to the next participant; returns the new state delta.
  async function advanceEssayTurn(sessionId, { reason } = {}) {
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return null;
    const state = session.session_state || {};
    const mode = state.essayMode || 'free';
    if (mode === 'jigsaw') return null; // jigsaw has no turn rotation
    const participants = await loadParticipants(sessionId);
    const ids = participants.map((p) => p.user_id).filter((id) => id != null);
    if (ids.length === 0) return null;
    const currIdx = ids.indexOf(state.essayTurn);
    const nextId = ids[(currIdx + 1 + ids.length) % ids.length] || ids[0];
    const nextDisplay =
      participants.find((p) => p.user_id === nextId)?.display_name || 'Partner';

    const next = { ...state };
    // round_robin: commit any in-flight draft into the paragraphs list before passing
    if (mode === 'round_robin') {
      next.essayParagraphs = commitParagraph(
        state.essayParagraphs,
        state.essayTurn,
        state.currentParagraphDraft
      );
      next.currentParagraphDraft = '';
      next.essayContent = renderRoundRobin(next.essayParagraphs, '');
    }
    next.essayTurn = nextId;
    next.essayHistory = [
      ...(state.essayHistory || []),
      {
        fromUserId: state.essayTurn,
        at: new Date().toISOString(),
        reason: reason || 'pass',
      },
    ];
    // Refresh per-turn deadline
    const newTurnDeadline = computeNextTurnDeadline(next);
    next.essayTimer = {
      ...(state.essayTimer || {}),
      turnDeadline: newTurnDeadline,
    };
    await db.none(
      `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
      [JSON.stringify(next), sessionId]
    );
    nsp.to(`session:${sessionId}`).emit('essay:turn_changed', {
      nextUserId: nextId,
      displayName: nextDisplay,
      reason: reason || 'pass',
      turnDeadline: newTurnDeadline,
    });
    // Re-arm timer for the new turn holder
    armPerTurnTimer(sessionId).catch(() => {});
    // Emit room-state so paragraph commits propagate
    if (mode === 'round_robin') {
      const probeSocket = (
        await nsp.in(`session:${sessionId}`).fetchSockets()
      )[0];
      if (probeSocket) {
        await emitRoomState(probeSocket, sessionId, { toAll: true });
      }
    }
    return next;
  }

  // Finalize an essay submission (manual or session_timeout). Marks the
  // session complete, broadcasts essay:submitted, kicks off AI review, then
  // broadcasts essay:ai_review_ready.
  async function finalizeEssaySubmission(sessionId, opts = {}) {
    const { submittedBy = null, reason = 'manual' } = opts;
    const session = await loadSessionById(sessionId);
    if (!session || session.session_type !== 'essay') return;
    if (session.status === 'complete') return;
    const state = session.session_state || {};
    const mode = state.essayMode || 'free';
    // Compute the final stitched/merged essay content per mode
    let finalContent = '';
    let finalState = { ...state, phase: 'complete' };
    if (mode === 'round_robin') {
      // Commit any in-flight draft from the current turn holder before stitching.
      const merged = commitParagraph(
        state.essayParagraphs,
        state.essayTurn,
        state.currentParagraphDraft
      );
      finalState.essayParagraphs = merged;
      finalState.currentParagraphDraft = '';
      finalContent = renderRoundRobin(merged, '');
    } else if (mode === 'jigsaw') {
      finalContent = stitchJigsaw(state.essayJigsaw);
    } else {
      finalContent = String(state.essayContent || '');
    }
    finalState.essayContent = finalContent;
    finalState.essaySubmittedBy = submittedBy;
    finalState.essaySubmittedAt = new Date().toISOString();
    finalState.essaySubmitReason = reason;
    finalState.aiReview = { status: 'pending', generatedAt: null };
    // Clear deadlines on the persisted state too
    finalState.essayTimer = {
      ...(state.essayTimer || {}),
      turnDeadline: null,
      sessionDeadline: null,
    };

    await db.none(
      `UPDATE collab_sessions
          SET status = 'complete', session_state = $1
        WHERE id = $2`,
      [JSON.stringify(finalState), sessionId]
    );
    clearEssayTimers(sessionId, 'all');

    nsp.to(`session:${sessionId}`).emit('essay:submitted', {
      submittedBy,
      content: finalContent,
      reason,
    });
    const probeSocket = (
      await nsp.in(`session:${sessionId}`).fetchSockets()
    )[0];
    if (probeSocket) {
      await emitRoomState(probeSocket, sessionId, { toAll: true });
    }

    // Fire-and-forget AI review (no DB persistence to essay_scores)
    runCollabEssayAIReview(sessionId, finalContent).catch((err) =>
      console.error(
        '[collab] essay AI review pipeline error:',
        err?.message || err
      )
    );
  }

  async function runCollabEssayAIReview(sessionId, finalContent) {
    const text = String(finalContent || '').trim();
    let aiReview;
    if (!text) {
      aiReview = {
        status: 'error',
        generatedAt: new Date().toISOString(),
        error: 'Essay was empty.',
      };
    } else {
      const result = await scoreEssayWithAI(text, {
        completion: true,
        logTag: 'COLLAB-ESSAY-AI',
      });
      if (result.ok) {
        aiReview = {
          status: 'ready',
          generatedAt: new Date().toISOString(),
          ...result.normalized,
        };
      } else {
        aiReview = {
          status: 'error',
          generatedAt: new Date().toISOString(),
          error: result.error || 'AI review unavailable',
        };
      }
    }
    try {
      const session = await loadSessionById(sessionId);
      if (!session) return;
      const merged = { ...(session.session_state || {}), aiReview };
      await db.none(
        `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
        [JSON.stringify(merged), sessionId]
      );
      nsp
        .to(`session:${sessionId}`)
        .emit('essay:ai_review_ready', { aiReview });
      const probeSocket = (
        await nsp.in(`session:${sessionId}`).fetchSockets()
      )[0];
      if (probeSocket) {
        await emitRoomState(probeSocket, sessionId, { toAll: true });
      }
    } catch (err) {
      console.error(
        '[collab] failed to persist AI review:',
        err?.message || err
      );
    }
  }

  // On startup, rehydrate timers for any in-progress essay session whose
  // deadlines are still in the future. Fires once shortly after attach.
  setTimeout(() => {
    db.many(
      `SELECT id FROM collab_sessions
        WHERE session_type = 'essay' AND status != 'complete'`
    )
      .then((rows) => {
        for (const r of rows || []) {
          armPerTurnTimer(r.id).catch(() => {});
          armSessionTimer(r.id).catch(() => {});
        }
      })
      .catch(() => {});
  }, 1000).unref();

  // Periodic cleanup: stale matchmaking entries (> 5 min) and expired sessions
  setInterval(async () => {
    try {
      await db.none(
        `DELETE FROM matchmaking_queue WHERE queued_at < NOW() - INTERVAL '5 minutes'`
      );
      await db.none(
        `UPDATE collab_sessions SET status = 'complete'
         WHERE expires_at < NOW() AND status != 'complete'`
      );
    } catch (err) {
      console.error('[collab] cleanup error:', err?.message || err);
    }
  }, 60_000).unref();

  nsp.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token ||
        (socket.handshake.headers?.authorization || '').replace(/^Bearer /, '');
      if (!token) return next(new Error('auth required'));
      const secret = process.env.JWT_SECRET;
      if (!secret) return next(new Error('server auth not configured'));
      const payload = jwt.verify(token, secret);
      const userId =
        payload?.sub ?? payload?.userId ?? payload?.user_id ?? null;
      if (!userId) return next(new Error('invalid token'));
      socket.user = {
        id: Number(userId),
        email: payload.email,
        role: payload.role || 'student',
        organization_id: payload.organization_id || null,
        name: payload.name || payload.email || `Learner ${userId}`,
      };
      return next();
    } catch (err) {
      return next(new Error('auth failed'));
    }
  });

  async function emitRoomState(socket, sessionId, { toAll = false } = {}) {
    const session = await loadSessionById(sessionId);
    if (!session) return;
    const participants = await loadParticipants(sessionId);
    const target = toAll ? nsp.to(`session:${sessionId}`) : socket;
    // Send sanitized state to all; host gets full answers via separate emit when needed.
    const baseState = buildRoomState(session, participants, {
      includeAnswers: false,
    });
    target.emit('room:state', baseState);
    if (toAll && session.host_id) {
      // Send host their privileged view (with all questions) on host's sockets
      const hostSockets = await nsp.in(`session:${sessionId}`).fetchSockets();
      for (const s of hostSockets) {
        if (s.user && s.user.id === session.host_id) {
          s.emit(
            'room:state',
            buildRoomState(session, participants, { includeAnswers: true })
          );
        }
      }
    }
  }

  nsp.on('connection', (socket) => {
    const user = socket.user;

    // Subscribe to class presence rooms so this user receives
    // `class:session_started` / `class:session_ended` for any class they're
    // enrolled in (or teach). The client may also call this with an explicit
    // list of classIds; we still verify membership server-side.
    socket.on('class:subscribe', async (_payload, ack) => {
      try {
        const rows = await db
          .many(
            `SELECT id FROM classes WHERE teacher_id = $1
             UNION
             SELECT class_id AS id FROM class_enrollments WHERE user_id = $1`,
            [user.id]
          )
          .catch(() => []);
        const classIds = rows.map((r) => Number(r.id)).filter(Boolean);
        for (const cid of classIds) {
          socket.join(`class:${cid}`);
        }
        socket.data.classIds = classIds;
        if (ack) ack({ ok: true, classIds });
      } catch (err) {
        if (ack) ack({ error: 'failed' });
      }
    });

    socket.on('room:join', async ({ roomCode } = {}, ack) => {
      try {
        const session = await loadSessionByRoomCode(roomCode);
        if (!session) {
          if (ack) ack({ error: 'Session not found' });
          return;
        }
        if (new Date(session.expires_at) < new Date()) {
          if (ack) ack({ error: 'Session expired' });
          return;
        }

        // Enforce host-controlled "lock joining". Participants who are
        // already in the session may always reconnect; only brand-new
        // joiners are blocked when the host has locked the room.
        const isHostUser = session.host_id && session.host_id === user.id;
        const joinLocked = !!(
          session.session_state && session.session_state.joinLocked
        );
        if (!isHostUser && joinLocked) {
          const existing = await db.oneOrNone(
            'SELECT id FROM collab_participants WHERE session_id = $1 AND user_id = $2',
            [session.id, user.id]
          );
          if (!existing) {
            if (ack)
              ack({
                error:
                  'This session is locked. The host is not allowing new joiners right now.',
              });
            return;
          }
        }

        const participant = await upsertParticipant(session.id, user);
        await db.none(
          'UPDATE collab_participants SET socket_id = $1, connected = TRUE WHERE id = $2',
          [socket.id, participant.id]
        );

        socket.join(`session:${session.id}`);
        socket.data.sessionId = session.id;
        socket.data.participantId = participant.id;

        // Notify others
        socket.to(`session:${session.id}`).emit('participant:joined', {
          userId: user.id,
          displayName: participant.display_name || user.name,
          role: participant.role,
        });

        await emitRoomState(socket, session.id, { toAll: true });
        if (ack) ack({ ok: true, sessionId: session.id });
      } catch (err) {
        console.error('[collab] room:join error:', err);
        if (ack) ack({ error: 'Failed to join' });
      }
    });

    socket.on('room:leave', async () => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return;
      try {
        await db.none(
          'UPDATE collab_participants SET connected = FALSE WHERE session_id = $1 AND user_id = $2',
          [sessionId, user.id]
        );
        socket
          .to(`session:${sessionId}`)
          .emit('participant:left', { userId: user.id });
        socket.leave(`session:${sessionId}`);
        socket.data.sessionId = null;
      } catch (err) {
        console.error('[collab] room:leave error:', err);
      }
    });

    socket.on('disconnect', async () => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return;
      try {
        await db.none(
          'UPDATE collab_participants SET connected = FALSE WHERE session_id = $1 AND user_id = $2',
          [sessionId, user.id]
        );
        nsp
          .to(`session:${sessionId}`)
          .emit('participant:left', { userId: user.id });

        // Remove from matchmaking
        await db.none('DELETE FROM matchmaking_queue WHERE user_id = $1', [
          user.id,
        ]);
      } catch (err) {
        console.error('[collab] disconnect cleanup error:', err);
      }
    });

    // ---------- Quiz events ----------

    socket.on('answer:submit', async ({ questionIndex, answer } = {}, ack) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return ack && ack({ error: 'not in session' });
      try {
        const session = await loadSessionById(sessionId);
        if (!session) return ack && ack({ error: 'no session' });

        // Persist answer
        await db.none(
          `UPDATE collab_participants
           SET answers = jsonb_set(COALESCE(answers, '{}'::jsonb), $1, $2::jsonb, true),
               last_active_at = NOW()
           WHERE session_id = $3 AND user_id = $4`,
          [
            `{${Number(questionIndex)}}`,
            JSON.stringify(answer),
            sessionId,
            user.id,
          ]
        );

        // Broadcast updated room state so everyone sees the live
        // "X of N answered" count update for this question. The sanitized
        // state only exposes per-participant `answeredQuestions` (indices),
        // not the actual answer values, so this does not leak choices
        // before reveal.
        await emitRoomState(socket, sessionId, { toAll: true });

        // Notify host (instructor_led free mode) of progress
        if (session.session_type === 'instructor_led' && session.host_id) {
          const sockets = await nsp.in(`session:${sessionId}`).fetchSockets();
          for (const s of sockets) {
            if (s.user && s.user.id === session.host_id) {
              s.emit('participant:answered', {
                questionIndex: Number(questionIndex),
                userId: user.id,
              });
            }
          }
        }

        // Instructor-led auto-reveal: when every student (everyone except
        // the host) has submitted an answer for this question, automatically
        // reveal the answer + per-student breakdown to the whole room.
        if (session.session_type === 'instructor_led' && session.host_id) {
          const idx = Number(questionIndex);
          const alreadyRevealed = (
            session.session_state?.revealedQuestions || []
          ).includes(idx);
          if (!alreadyRevealed) {
            const participants = await loadParticipants(sessionId);
            const students = participants.filter(
              (p) => Number(p.user_id) !== Number(session.host_id)
            );
            const allAnswered =
              students.length > 0 &&
              students.every(
                (p) => p.answers && p.answers[String(idx)] !== undefined
              );
            if (allAnswered) {
              const newRevealed = Array.from(
                new Set([
                  ...(session.session_state?.revealedQuestions || []),
                  idx,
                ])
              );
              await db.none(
                `UPDATE collab_sessions
                 SET session_state = jsonb_set(session_state, '{revealedQuestions}', $1::jsonb)
                 WHERE id = $2`,
                [JSON.stringify(newRevealed), sessionId]
              );
              const quiz = session.quiz_snapshot || {};
              const q = (quiz.questions || [])[idx] || {};
              const correct = deriveCorrectAnswer(q);
              nsp.to(`session:${sessionId}`).emit('answer:revealed', {
                questionIndex: idx,
                answers: students.map((p) => ({
                  userId: p.user_id,
                  displayName: p.display_name,
                  answer: p.answers ? p.answers[String(idx)] : null,
                })),
                correctAnswer: correct,
                explanation: deriveExplanation(q, correct),
                auto: true,
              });
              await emitRoomState(socket, sessionId, { toAll: true });
            }
          }
        }

        // Peer auto-reveal
        if (session.session_type === 'peer') {
          const participants = await loadParticipants(sessionId);
          const allAnswered = participants
            .filter((p) => p.role === 'participant' || p.role === 'host')
            .every(
              (p) => p.answers && p.answers[String(questionIndex)] !== undefined
            );
          if (allAnswered && participants.length >= 2) {
            const quiz = session.quiz_snapshot || {};
            const q = (quiz.questions || [])[Number(questionIndex)] || {};
            const newRevealed = Array.from(
              new Set([
                ...(session.session_state?.revealedQuestions || []),
                Number(questionIndex),
              ])
            );
            await db.none(
              `UPDATE collab_sessions
               SET session_state = jsonb_set(session_state, '{revealedQuestions}', $1::jsonb)
               WHERE id = $2`,
              [JSON.stringify(newRevealed), sessionId]
            );
            nsp.to(`session:${sessionId}`).emit('answer:revealed', {
              questionIndex: Number(questionIndex),
              answers: participants.map((p) => ({
                userId: p.user_id,
                displayName: p.display_name,
                answer: p.answers ? p.answers[String(questionIndex)] : null,
              })),
              correctAnswer: deriveCorrectAnswer(q),
              explanation: deriveExplanation(q, deriveCorrectAnswer(q)),
            });
          }
        }

        if (ack) ack({ ok: true });
      } catch (err) {
        console.error('[collab] answer:submit error:', err);
        if (ack) ack({ error: 'failed' });
      }
    });

    // ---------- Host controls ----------

    async function ensureHost(sessionId) {
      const session = await loadSessionById(sessionId);
      if (!session) return null;
      if (session.host_id !== user.id) return null;
      return session;
    }

    socket.on('instructor:start', async (_payload, ack) => {
      const sessionId = socket.data.sessionId;
      const session = await ensureHost(sessionId);
      if (!session) return ack && ack({ error: 'not host' });
      const newState = { ...(session.session_state || {}), phase: 'active' };
      await db.none(
        `UPDATE collab_sessions SET status = 'active', session_state = $1 WHERE id = $2`,
        [JSON.stringify(newState), sessionId]
      );
      nsp.to(`session:${sessionId}`).emit('session:started', {});
      await emitRoomState(socket, sessionId, { toAll: true });
      if (ack) ack({ ok: true });
    });

    socket.on('instructor:set_question', async ({ index } = {}, ack) => {
      const sessionId = socket.data.sessionId;
      const session = await ensureHost(sessionId);
      if (!session) return ack && ack({ error: 'not host' });
      const newState = {
        ...(session.session_state || {}),
        currentQuestion: Number(index),
      };
      await db.none(
        `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
        [JSON.stringify(newState), sessionId]
      );
      nsp
        .to(`session:${sessionId}`)
        .emit('question:changed', { index: Number(index) });
      if (ack) ack({ ok: true });
    });

    socket.on('instructor:toggle_mode', async ({ mode } = {}, ack) => {
      const sessionId = socket.data.sessionId;
      const session = await ensureHost(sessionId);
      if (!session) return ack && ack({ error: 'not host' });
      const paceMode = mode === 'free' ? 'free' : 'locked';
      const newState = { ...(session.session_state || {}), paceMode };
      await db.none(
        `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
        [JSON.stringify(newState), sessionId]
      );
      nsp.to(`session:${sessionId}`).emit('mode:changed', { paceMode });
      if (ack) ack({ ok: true });
    });

    socket.on('instructor:set_join_lock', async ({ locked } = {}, ack) => {
      const sessionId = socket.data.sessionId;
      const session = await ensureHost(sessionId);
      if (!session) return ack && ack({ error: 'not host' });
      const joinLocked = !!locked;
      const newState = { ...(session.session_state || {}), joinLocked };
      await db.none(
        `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
        [JSON.stringify(newState), sessionId]
      );
      nsp.to(`session:${sessionId}`).emit('join_lock:changed', { joinLocked });
      await emitRoomState(socket, sessionId, { toAll: true });
      if (ack) ack({ ok: true, joinLocked });
    });

    socket.on(
      'instructor:reveal_answers',
      async ({ questionIndex } = {}, ack) => {
        const sessionId = socket.data.sessionId;
        const session = await ensureHost(sessionId);
        if (!session) return ack && ack({ error: 'not host' });
        const idx = Number(questionIndex);
        const revealed = Array.from(
          new Set([...(session.session_state?.revealedQuestions || []), idx])
        );
        await db.none(
          `UPDATE collab_sessions
         SET session_state = jsonb_set(session_state, '{revealedQuestions}', $1::jsonb)
         WHERE id = $2`,
          [JSON.stringify(revealed), sessionId]
        );
        const participants = await loadParticipants(sessionId);
        const quiz = session.quiz_snapshot || {};
        const q = (quiz.questions || [])[idx] || {};
        nsp.to(`session:${sessionId}`).emit('answer:revealed', {
          questionIndex: idx,
          answers: participants.map((p) => ({
            userId: p.user_id,
            displayName: p.display_name,
            answer: p.answers ? p.answers[String(idx)] : null,
          })),
          correctAnswer: deriveCorrectAnswer(q),
          explanation: deriveExplanation(q, deriveCorrectAnswer(q)),
        });
        if (ack) ack({ ok: true });
      }
    );

    socket.on('instructor:end', async (_payload, ack) => {
      const sessionId = socket.data.sessionId;
      const session = await ensureHost(sessionId);
      if (!session) return ack && ack({ error: 'not host' });
      await db.none(
        `UPDATE collab_sessions SET status = 'complete' WHERE id = $1`,
        [sessionId]
      );

      // Auto-mark curriculum coverage + notify class presence subscribers.
      try {
        if (session.curriculum_item_id && session.class_id) {
          await db.none(
            `INSERT INTO class_curriculum_coverage
                 (class_id, curriculum_item_id, session_id, source)
               SELECT $1, $2, $3, 'session'
               WHERE NOT EXISTS (
                 SELECT 1 FROM class_curriculum_coverage
                  WHERE curriculum_item_id = $2 AND session_id = $3
               )`,
            [session.class_id, session.curriculum_item_id, session.id]
          );
        }
        if (session.class_id) {
          nsp.to(`class:${session.class_id}`).emit('class:session_ended', {
            classId: Number(session.class_id),
            roomCode: session.room_code,
            sessionId: session.id,
          });
        }
      } catch (e) {
        console.error(
          '[collab] end-of-session coverage/presence error:',
          e?.message || e
        );
      }

      nsp.to(`session:${sessionId}`).emit('session:ended', {});
      // Push a final room-state snapshot that includes answers + full questions
      // so every client can render the review screen.
      await emitRoomState(socket, sessionId, { toAll: true });
      if (ack) ack({ ok: true });
    });

    // ---------- Essay events ----------

    // Host transitions an essay session from 'lobby' -> 'active'. For jigsaw
    // mode this is when slots get assigned; for any timed mode this is when
    // the session/turn deadlines are computed.
    socket.on('essay:start', async (_payload, ack) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return ack && ack({ error: 'not in session' });
      try {
        const session = await loadSessionById(sessionId);
        if (!session || session.session_type !== 'essay') {
          return ack && ack({ error: 'not essay session' });
        }
        if (session.host_id && session.host_id !== user.id) {
          return ack && ack({ error: 'host only' });
        }
        if (session.status === 'complete') {
          return ack && ack({ error: 'session already complete' });
        }
        const state = session.session_state || {};
        if (state.phase === 'active') {
          if (ack) ack({ ok: true, alreadyActive: true });
          return;
        }
        const participants = await loadParticipants(sessionId);
        const ids = participants
          .map((p) => p.user_id)
          .filter((id) => id != null);
        const mode = state.essayMode || 'free';
        const next = { ...state, phase: 'active' };

        if (mode === 'jigsaw') {
          const fmt = state.essayJigsawFormat || '5-paragraph';
          next.essayJigsaw = buildJigsawSlots(fmt, ids);
          next.essayContent = '';
          next.essayTurn = null; // jigsaw doesn't use turns
        } else {
          // free / round_robin: ensure turn holder is the first participant
          if (!ids.includes(state.essayTurn)) {
            next.essayTurn = ids[0] || state.essayTurn;
          }
          if (mode === 'round_robin') {
            next.essayParagraphs = state.essayParagraphs || [];
            next.currentParagraphDraft = '';
          }
        }

        // Compute deadlines from configured durations
        const timer = state.essayTimer || {};
        const turnDeadline =
          mode !== 'jigsaw' && Number(timer.perTurnSeconds) > 0
            ? new Date(Date.now() + timer.perTurnSeconds * 1000).toISOString()
            : null;
        const sessionDeadline =
          Number(timer.totalSeconds) > 0
            ? new Date(Date.now() + timer.totalSeconds * 1000).toISOString()
            : null;
        next.essayTimer = {
          perTurnSeconds: timer.perTurnSeconds || null,
          totalSeconds: timer.totalSeconds || null,
          turnDeadline,
          sessionDeadline,
        };

        await db.none(
          `UPDATE collab_sessions
              SET status = 'active', session_state = $1
            WHERE id = $2`,
          [JSON.stringify(next), sessionId]
        );
        nsp.to(`session:${sessionId}`).emit('essay:started', {
          mode,
          turnDeadline,
          sessionDeadline,
          jigsaw: next.essayJigsaw || null,
          essayTurn: next.essayTurn,
        });
        await emitRoomState(socket, sessionId, { toAll: true });
        if (turnDeadline) armPerTurnTimer(sessionId).catch(() => {});
        if (sessionDeadline) armSessionTimer(sessionId).catch(() => {});
        if (ack) ack({ ok: true });
      } catch (err) {
        console.error('[collab] essay:start error:', err);
        if (ack) ack({ error: 'failed' });
      }
    });

    socket.on('essay:update', async (payload = {}) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return;
      try {
        const session = await loadSessionById(sessionId);
        if (!session || session.session_type !== 'essay') return;
        if (session.status === 'complete') return;
        const state = session.session_state || {};
        const mode = state.essayMode || 'free';
        const content = String(payload.content || '');

        if (mode === 'jigsaw') {
          const slotKey = payload.slotKey;
          const jigsaw = state.essayJigsaw;
          if (!slotKey || !jigsaw || !Array.isArray(jigsaw.slots)) return;
          const slot = jigsaw.slots.find((s) => s.key === slotKey);
          if (!slot || slot.assigneeUserId !== user.id) return; // not your slot
          slot.content = content;
          const newJigsaw = { ...jigsaw, slots: [...jigsaw.slots] };
          const merged = stitchJigsaw(newJigsaw);
          const next = {
            ...state,
            essayJigsaw: newJigsaw,
            essayContent: merged,
          };
          await db.none(
            `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
            [JSON.stringify(next), sessionId]
          );
          socket.to(`session:${sessionId}`).emit('essay:slot_updated', {
            slotKey,
            content,
            editingUserId: user.id,
            stitched: merged,
          });
          return;
        }

        if (mode === 'round_robin') {
          if (state.essayTurn !== user.id) return; // not your turn
          const next = {
            ...state,
            currentParagraphDraft: content,
            essayContent: renderRoundRobin(state.essayParagraphs, content),
          };
          await db.none(
            `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
            [JSON.stringify(next), sessionId]
          );
          socket.to(`session:${sessionId}`).emit('essay:content_changed', {
            content: next.essayContent,
            draft: content,
            editingUserId: user.id,
          });
          return;
        }

        // free mode (legacy behavior)
        if (state.essayTurn !== user.id) return;
        const next = { ...state, essayContent: content };
        await db.none(
          `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
          [JSON.stringify(next), sessionId]
        );
        socket.to(`session:${sessionId}`).emit('essay:content_changed', {
          content,
          editingUserId: user.id,
        });
      } catch (err) {
        console.error('[collab] essay:update error:', err);
      }
    });

    socket.on('essay:pass_turn', async (_payload, ack) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return ack && ack({ error: 'not in session' });
      try {
        const session = await loadSessionById(sessionId);
        if (!session || session.session_type !== 'essay') {
          return ack && ack({ error: 'not essay session' });
        }
        const state = session.session_state || {};
        const mode = state.essayMode || 'free';
        if (mode === 'jigsaw') {
          return ack && ack({ error: 'jigsaw mode does not use turns' });
        }
        if (state.essayTurn !== user.id) {
          return ack && ack({ error: 'not your turn' });
        }
        const participants = await loadParticipants(sessionId);
        const ids = participants
          .map((p) => p.user_id)
          .filter((id) => id != null);
        if (ids.length < 2) return ack && ack({ error: 'need partner' });
        await advanceEssayTurn(sessionId, { reason: 'pass' });
        if (ack) ack({ ok: true });
      } catch (err) {
        console.error('[collab] essay:pass_turn error:', err);
        if (ack) ack({ error: 'failed' });
      }
    });

    // Finalize the collaborative essay. Any participant in the room may hit
    // the Submit button — once submitted the room status flips to 'complete'
    // so the review screen renders for everyone. AI review is then run
    // server-side and broadcast via essay:ai_review_ready.
    socket.on('essay:submit', async (_payload, ack) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return ack && ack({ error: 'not in session' });
      try {
        const session = await loadSessionById(sessionId);
        if (!session || session.session_type !== 'essay') {
          return ack && ack({ error: 'not essay session' });
        }
        if (session.status === 'complete') {
          if (ack) ack({ ok: true, alreadyComplete: true });
          return;
        }
        await finalizeEssaySubmission(sessionId, {
          submittedBy: user.id,
          reason: 'manual',
        });
        if (ack) ack({ ok: true });
      } catch (err) {
        console.error('[collab] essay:submit error:', err);
        if (ack) ack({ error: 'failed' });
      }
    });

    // ---------- Matchmaking ----------

    socket.on('matchmaking:queue', async ({ subject, topic } = {}, ack) => {
      try {
        await db.none('DELETE FROM matchmaking_queue WHERE user_id = $1', [
          user.id,
        ]);
        const orgId = user.organization_id || null;

        // Look for an existing queued partner in same org + subject
        const partner = await db.oneOrNone(
          `SELECT * FROM matchmaking_queue
           WHERE user_id != $1
             AND ($2::int IS NULL OR organization_id = $2::int)
             AND ($3::text IS NULL OR subject = $3::text)
           ORDER BY queued_at ASC
           LIMIT 1`,
          [user.id, orgId, subject || null]
        );

        if (partner) {
          // Create a peer session with a small inline question set picked from the catalog.
          const quizPool =
            (typeof getAllQuizzes === 'function' && getAllQuizzes()) || {};
          let snapshotQuestions = [];
          let snapshotTitle = `Random ${subject || 'Practice'}`;
          // Try to find any quiz matching subject
          const subjectKey = subject ? String(subject).toLowerCase() : null;
          const matching = [];
          for (const k of Object.keys(quizPool)) {
            const subj = quizPool[k];
            if (!subj || typeof subj !== 'object') continue;
            for (const qid of Object.keys(subj)) {
              const q = subj[qid];
              if (!q || !Array.isArray(q.questions)) continue;
              if (!subjectKey || k.toLowerCase().includes(subjectKey)) {
                matching.push({ subject: k, id: qid, ...q });
              }
            }
          }
          if (matching.length) {
            const pick = matching[randomInt(matching.length)];
            snapshotQuestions = shuffleArray(pick.questions)
              .slice(0, 10)
              .map((q, idx) => ({ ...q, questionNumber: idx + 1 }));
            snapshotTitle = pick.title || snapshotTitle;
          }

          if (!snapshotQuestions.length) {
            if (ack)
              ack({ error: 'No practice content available; try again later.' });
            return;
          }

          const roomCode = await generateUniqueRoomCode();
          const initialState = {
            phase: 'active',
            currentQuestion: 0,
            paceMode: 'free',
            revealedQuestions: [],
            essayContent: '',
            essayTurn: null,
            essayHistory: [],
          };
          const session = await db.one(
            `INSERT INTO collab_sessions
              (room_code, session_type, host_id, organization_id, title, subject, quiz_snapshot, session_state, status)
             VALUES ($1, 'peer', $2, $3, $4, $5, $6, $7, 'active') RETURNING *`,
            [
              roomCode,
              partner.user_id,
              orgId,
              snapshotTitle,
              subject || null,
              JSON.stringify({
                id: 'matchmaking',
                title: snapshotTitle,
                questions: snapshotQuestions,
              }),
              JSON.stringify(initialState),
            ]
          );
          // Add both participants
          await db.none(
            `INSERT INTO collab_participants (session_id, user_id, display_name, role)
             VALUES ($1, $2, $3, 'host'), ($1, $4, $5, 'participant')
             ON CONFLICT DO NOTHING`,
            [
              session.id,
              partner.user_id,
              `Learner ${partner.user_id}`,
              user.id,
              user.name || `Learner ${user.id}`,
            ]
          );

          await db.none(
            'DELETE FROM matchmaking_queue WHERE user_id IN ($1, $2)',
            [user.id, partner.user_id]
          );

          // Notify both
          socket.emit('matchmaking:matched', {
            roomCode,
            partnerName: `Learner ${partner.user_id}`,
          });
          if (partner.socket_id) {
            const partnerSock = nsp.sockets.get(partner.socket_id);
            if (partnerSock) {
              partnerSock.emit('matchmaking:matched', {
                roomCode,
                partnerName: user.name || `Learner ${user.id}`,
              });
            }
          }
          if (ack) ack({ ok: true, matched: true, roomCode });
          return;
        }

        // No partner — enqueue
        await db.none(
          `INSERT INTO matchmaking_queue (user_id, organization_id, subject, topic, socket_id)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (user_id) DO UPDATE
             SET organization_id = EXCLUDED.organization_id,
                 subject = EXCLUDED.subject,
                 topic = EXCLUDED.topic,
                 socket_id = EXCLUDED.socket_id,
                 queued_at = NOW()`,
          [user.id, orgId, subject || null, topic || null, socket.id]
        );
        if (ack) ack({ ok: true, matched: false });
      } catch (err) {
        console.error('[collab] matchmaking error:', err);
        if (ack) ack({ error: 'matchmaking failed' });
      }
    });

    socket.on('matchmaking:cancel', async (_payload, ack) => {
      try {
        await db.none('DELETE FROM matchmaking_queue WHERE user_id = $1', [
          user.id,
        ]);
        if (ack) ack({ ok: true });
      } catch (err) {
        if (ack) ack({ error: 'failed' });
      }
    });
  });
}

module.exports = {
  registerCollabRest,
  attachCollabSockets,
};
