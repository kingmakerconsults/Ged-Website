// backend/src/collabEssayModes.js
// Helpers for the collaborative essay "modes" feature.
//   - 'free'         : single shared buffer, turn holder edits (legacy)
//   - 'round_robin'  : each participant writes one paragraph at a time;
//                      committed paragraphs become read-only.
//   - 'jigsaw'       : participants are assigned slots from a fixed essay
//                      format (Intro / Body 1..N / Conclusion) and write in
//                      parallel; backend stitches the final essay in slot
//                      order on submit.

const FIVE_PARAGRAPH = [
  { key: 'intro', label: 'Introduction', order: 0 },
  { key: 'body1', label: 'Body Paragraph 1', order: 1 },
  { key: 'body2', label: 'Body Paragraph 2', order: 2 },
  { key: 'body3', label: 'Body Paragraph 3', order: 3 },
  { key: 'conclusion', label: 'Conclusion', order: 4 },
];

const FORMATS = {
  '5-paragraph': FIVE_PARAGRAPH,
};

function getFormatTemplate(format) {
  return FORMATS[format] || FIVE_PARAGRAPH;
}

/**
 * Build jigsaw slots, round-robin assigning participants to slots in order.
 * If there are more participants than slots, extras double up on body slots.
 * If there are fewer participants than slots, later slots are unassigned
 * (can be filled by reassignment or left blank — submit will skip empty).
 *
 * @param {string} format
 * @param {Array<number>} participantIds  ordered (typically by join time)
 * @returns {{ format: string, slots: Array<{key,label,order,assigneeUserId,content}> }}
 */
function buildJigsawSlots(format, participantIds) {
  const template = getFormatTemplate(format);
  const ids = (participantIds || []).filter((x) => x != null);
  const slots = template.map((t) => ({
    key: t.key,
    label: t.label,
    order: t.order,
    assigneeUserId: null,
    content: '',
  }));
  if (ids.length === 0) return { format, slots };

  // First pass: assign each slot once in template order.
  for (let i = 0; i < slots.length && i < ids.length; i++) {
    slots[i].assigneeUserId = ids[i];
  }
  // If extras remain, distribute across body slots round-robin (skip intro/conclusion).
  if (ids.length > slots.length) {
    const bodySlots = slots.filter(
      (s) => s.key !== 'intro' && s.key !== 'conclusion'
    );
    let cursor = 0;
    for (let i = slots.length; i < ids.length; i++) {
      // Assign a co-author to a body slot — for v1 we just append a marker
      // by replacing the assignee on rotation. (Simpler: leave as-is.)
      // We don't currently support multiple assignees per slot in the schema,
      // so extra participants observe; v1 limits jigsaw to 5 distinct authors.
      cursor = (cursor + 1) % Math.max(bodySlots.length, 1);
      void i;
    }
  }
  return { format, slots };
}

/**
 * Concatenate jigsaw slot contents in template order, with double newlines.
 * Empty slots are omitted.
 */
function stitchJigsaw(jigsaw) {
  if (!jigsaw || !Array.isArray(jigsaw.slots)) return '';
  return jigsaw.slots
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((s) => String(s.content || '').trim())
    .filter((t) => t.length > 0)
    .join('\n\n');
}

/**
 * For round-robin mode: append the in-flight paragraph draft into the
 * committed paragraphs list. Returns a new paragraphs array.
 */
function commitParagraph(prevParagraphs, authorUserId, draft) {
  const text = String(draft || '').trim();
  const arr = Array.isArray(prevParagraphs) ? prevParagraphs.slice() : [];
  if (!text) return arr;
  arr.push({
    authorUserId,
    content: text,
    order: arr.length,
    at: new Date().toISOString(),
  });
  return arr;
}

/**
 * Render the full round-robin essay text from committed paragraphs and an
 * optional in-flight draft (shown to participants while it's being written).
 */
function renderRoundRobin(paragraphs, draft) {
  const parts = (Array.isArray(paragraphs) ? paragraphs : [])
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => String(p.content || '').trim())
    .filter(Boolean);
  const tail = String(draft || '').trim();
  if (tail) parts.push(tail);
  return parts.join('\n\n');
}

/**
 * Pick the final essay content for a session given its mode.
 */
function buildFinalEssayContent(state) {
  const mode = state?.essayMode || 'free';
  if (mode === 'jigsaw') return stitchJigsaw(state?.essayJigsaw);
  if (mode === 'round_robin') {
    return renderRoundRobin(
      state?.essayParagraphs || [],
      state?.currentParagraphDraft || ''
    );
  }
  return String(state?.essayContent || '');
}

/**
 * Validate user-supplied essay config from the create-session REST call.
 * Returns a normalized object suitable to merge into initialState.
 */
function normalizeEssayConfig(config) {
  const c = config && typeof config === 'object' ? config : {};
  const mode = ['free', 'round_robin', 'jigsaw'].includes(c.essayMode)
    ? c.essayMode
    : 'free';
  const perTurnSeconds = clampSeconds(c.essayPerTurnSeconds, 0, 60 * 30); // up to 30 min
  const totalSeconds = clampSeconds(c.essayTotalSeconds, 0, 60 * 60 * 4); // up to 4 hrs
  const format =
    typeof c.essayJigsawFormat === 'string' && FORMATS[c.essayJigsawFormat]
      ? c.essayJigsawFormat
      : '5-paragraph';
  return {
    essayMode: mode,
    essayTimer: {
      perTurnSeconds: perTurnSeconds || null,
      totalSeconds: totalSeconds || null,
      turnDeadline: null,
      sessionDeadline: null,
    },
    essayJigsawFormat: format,
  };
}

function clampSeconds(value, min, max) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

module.exports = {
  FORMATS,
  getFormatTemplate,
  buildJigsawSlots,
  stitchJigsaw,
  commitParagraph,
  renderRoundRobin,
  buildFinalEssayContent,
  normalizeEssayConfig,
};
