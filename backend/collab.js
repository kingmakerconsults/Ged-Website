// backend/collab.js
// Real-time collaboration ("Play Together") feature.
// Exposes: registerCollabRest(app, deps), attachCollabSockets(io, deps).
//
// Session types:
//   'instructor_led' — host advances; supports locked/free pace mode
//   'peer'           — two students; per-question reveal after both answer
//   'essay'          — shared turn-based essay editor

const jwt = require('jsonwebtoken');
const db = require('./db');

// ---------- Helpers ----------

function generateRoomCode() {
  // GED + 3 alphanumeric (no easily-confused chars)
  const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 3; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `GED${suffix}`;
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
  const { correctAnswer, answer, explanation, ...safe } = q;
  return safe;
}

function buildRoomState(
  session,
  participants,
  { includeAnswers = false } = {}
) {
  const state = session.session_state || {};
  const revealed = new Set(state.revealedQuestions || []);
  const quiz = session.quiz_snapshot || null;
  const sanitizedQuiz = quiz
    ? {
        ...quiz,
        questions: Array.isArray(quiz.questions)
          ? quiz.questions.map((q, idx) =>
              includeAnswers || revealed.has(idx)
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
      // For privacy, do not include raw answers; collab events stream answer counts.
      answeredQuestions: p.answers ? Object.keys(p.answers).map(Number) : [],
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
    // ALL_QUIZZES is { subject: { quizId: { title, questions } } } or flat — try both.
    if (all[quizId]) return { id: quizId, ...all[quizId] };
    for (const subjectKey of Object.keys(all)) {
      const subj = all[subjectKey];
      if (subj && typeof subj === 'object' && subj[quizId]) {
        return { id: quizId, subject: subjectKey, ...subj[quizId] };
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
        const {
          sessionType,
          quizId,
          subject,
          title,
          classId,
          questions, // optional inline questions array
          config,
        } = req.body || {};

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
        };

        const roomCode = await generateUniqueRoomCode();

        const inserted = await db.one(
          `INSERT INTO collab_sessions
          (room_code, session_type, host_id, class_id, organization_id, title, subject, quiz_id, quiz_snapshot, quiz_config, session_state, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'lobby')
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
             AND ($1::int IS NULL OR s.organization_id = $1::int OR s.organization_id IS NULL)
           GROUP BY s.id
           ORDER BY s.created_at DESC
           LIMIT 50`,
            [orgId]
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
      s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
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
}

// ---------- Socket.io ----------

function attachCollabSockets(io, { getAllQuizzes }) {
  const nsp = io.of('/collab');

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
              correctAnswer: q.correctAnswer ?? q.answer ?? null,
              explanation: q.explanation || null,
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
          correctAnswer: q.correctAnswer ?? q.answer ?? null,
          explanation: q.explanation || null,
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
      nsp.to(`session:${sessionId}`).emit('session:ended', {});
      if (ack) ack({ ok: true });
    });

    // ---------- Essay events ----------

    socket.on('essay:update', async ({ content } = {}) => {
      const sessionId = socket.data.sessionId;
      if (!sessionId) return;
      try {
        const session = await loadSessionById(sessionId);
        if (!session || session.session_type !== 'essay') return;
        if (session.session_state?.essayTurn !== user.id) return; // not your turn
        const newState = {
          ...(session.session_state || {}),
          essayContent: String(content || ''),
        };
        await db.none(
          `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
          [JSON.stringify(newState), sessionId]
        );
        socket.to(`session:${sessionId}`).emit('essay:content_changed', {
          content: newState.essayContent,
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
        if (session.session_state?.essayTurn !== user.id) {
          return ack && ack({ error: 'not your turn' });
        }
        const participants = await loadParticipants(sessionId);
        const ids = participants
          .map((p) => p.user_id)
          .filter((id) => id != null);
        if (ids.length < 2) return ack && ack({ error: 'need partner' });
        const currIdx = ids.indexOf(user.id);
        const nextId = ids[(currIdx + 1) % ids.length];
        const nextDisplay =
          participants.find((p) => p.user_id === nextId)?.display_name ||
          'Partner';
        const newState = {
          ...(session.session_state || {}),
          essayTurn: nextId,
          essayHistory: [
            ...(session.session_state?.essayHistory || []),
            { fromUserId: user.id, at: new Date().toISOString() },
          ],
        };
        await db.none(
          `UPDATE collab_sessions SET session_state = $1 WHERE id = $2`,
          [JSON.stringify(newState), sessionId]
        );
        nsp.to(`session:${sessionId}`).emit('essay:turn_changed', {
          nextUserId: nextId,
          displayName: nextDisplay,
        });
        if (ack) ack({ ok: true });
      } catch (err) {
        console.error('[collab] essay:pass_turn error:', err);
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
            const pick = matching[Math.floor(Math.random() * matching.length)];
            snapshotQuestions = pick.questions.slice(0, 10);
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
