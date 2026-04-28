#!/usr/bin/env node
/**
 * wipe-user-progress.js — clean-slate progress reset.
 *
 * Snapshots every per-user PROGRESS row to its companion *_archive table,
 * then deletes those rows. Preserves:
 *   - users, profiles, auth_identities                (accounts intact)
 *   - organizations, org membership / pending_org / account_status
 *   - users.test_dates, users.onboarding_state        (re-onboarding optional)
 *
 * In other words: every student keeps their login, their org, and (if any)
 * their pending-approval state, but their dashboard "Stats Hub" reads zero.
 *
 * SAFETY:
 *   * Default mode is --dry-run. Nothing is written/deleted.
 *   * Running with --commit is irreversible; back up the DB first.
 *   * Re-runnable. Archive rows are appended; subsequent runs after a wipe
 *     simply find nothing left to archive.
 *
 * USAGE:
 *   node backend/scripts/wipe-user-progress.js               # dry run
 *   node backend/scripts/wipe-user-progress.js --commit      # actually wipe
 *
 * Requires DATABASE_URL in env (same as the rest of the backend).
 *
 * Prereq migrations (run first if not already applied):
 *   backend/migrations/2026-04-28-user-archive-and-membership.sql
 *   backend/migrations/2026-04-28-progress-archive-tables.sql
 */

'use strict';

const path = require('path');
const db = require(path.join(__dirname, '..', 'db'));

const COMMIT = process.argv.includes('--commit');
const ARCHIVE_REASON = '2026-04-28-progress-wipe-fresh-start';

// (sourceTable, archiveTable). All listed source tables have a user_id FK.
// Order matters: child tables (FK → parent) come before their parents so the
// DELETE on the parent doesn't cascade rows we haven't archived yet.
const PROGRESS_TABLES = [
  // children of quiz_attempts must be archived/deleted FIRST
  ['quiz_attempt_items', 'quiz_attempt_items_archive'], // FK -> quiz_attempts(id)
  ['quiz_surveys', 'quiz_surveys_archive'],            // FK -> quiz_attempts(id) (SET NULL, but archive anyway)

  // primary attempts table
  ['quiz_attempts', 'quiz_attempts_archive'],

  // essays
  ['essay_scores', 'essay_scores_archive'],
  ['essay_challenge_log', 'essay_challenge_log_archive'],

  // vocabulary
  ['vocabulary_attempts', 'vocabulary_attempts_archive'],

  // mastery / status
  ['user_premade_quiz_mastery', 'user_premade_quiz_mastery_archive'],
  ['user_subject_status', 'user_subject_status_archive'],

  // challenge system
  ['user_challenge_stats', 'user_challenge_stats_archive'],
  ['user_challenge_suggestions', 'user_challenge_suggestions_archive'],
  ['user_selected_challenges', 'user_selected_challenges_archive'],

  // study/coach
  ['study_plans', 'study_plans_archive'],
  ['coach_daily_progress', 'coach_daily_progress_archive'],
  ['coach_weekly_plans', 'coach_weekly_plans_archive'],
  ['coach_advice_usage', 'coach_advice_usage_archive'],
  ['coach_chat_usage', 'coach_chat_usage_archive'],
  ['coach_composite_usage', 'coach_composite_usage_archive'],
  ['coach_conversations', 'coach_conversations_archive'],

  // exams + quotas + notifications
  ['active_exam_sessions', 'active_exam_sessions_archive'],
  ['user_quota_daily', 'user_quota_daily_archive'],
  ['notifications', 'notifications_archive'],

  // legacy "challenges" table (only if it still exists in this deployment)
  ['challenges', 'challenges_archive'],
];

function log(msg) {
  console.log(`[wipe-progress] ${msg}`);
}

async function tableExists(name) {
  const r = await db.query(
    `SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = $1 LIMIT 1`,
    [name]
  );
  return r.rowCount > 0;
}

async function archiveAndWipe(sourceTable, archiveTable) {
  const srcExists = await tableExists(sourceTable);
  if (!srcExists) {
    log(`skip ${sourceTable}: source table not present`);
    return { archived: 0, deleted: 0, candidate: 0 };
  }
  const archExists = await tableExists(archiveTable);
  if (!archExists) {
    log(
      `WARN ${sourceTable}: ${archiveTable} missing; skipping (run the progress-archive migration first)`
    );
    return { archived: 0, deleted: 0, candidate: 0 };
  }

  const cnt = await db.query(`SELECT COUNT(*)::int AS c FROM ${sourceTable}`);
  const candidate = Number(cnt.rows[0].c) || 0;
  if (candidate === 0) {
    log(`OK  ${sourceTable}: already empty`);
    return { archived: 0, deleted: 0, candidate: 0 };
  }

  if (!COMMIT) {
    log(`DRY ${sourceTable}: would archive + delete ${candidate} rows`);
    return { archived: 0, deleted: 0, candidate };
  }

  const ins = await db.query(
    `INSERT INTO ${archiveTable} (archive_reason, raw)
     SELECT $1, to_jsonb(t.*) FROM ${sourceTable} t`,
    [ARCHIVE_REASON]
  );
  const del = await db.query(`DELETE FROM ${sourceTable}`);
  log(
    `OK  ${sourceTable}: archived ${ins.rowCount}, deleted ${del.rowCount}`
  );
  return { archived: ins.rowCount, deleted: del.rowCount, candidate };
}

async function main() {
  log(
    `mode = ${COMMIT ? 'COMMIT (writes will happen)' : 'DRY-RUN (no writes)'}`
  );
  log('preserving: users, profiles, auth_identities, organizations,');
  log('            org memberships, account_status, test_dates, onboarding_state');

  const totals = { candidate: 0, archived: 0, deleted: 0 };
  for (const [src, arch] of PROGRESS_TABLES) {
    try {
      const r = await archiveAndWipe(src, arch);
      totals.archived += r.archived || 0;
      totals.deleted += r.deleted || 0;
      totals.candidate += r.candidate || 0;
    } catch (err) {
      log(`ERR ${src}: ${err?.message || err}`);
      throw err;
    }
  }

  log('---');
  log(
    COMMIT
      ? `DONE: total archived=${totals.archived}, deleted=${totals.deleted}`
      : `DRY-RUN: would archive ~${totals.candidate} rows total. Re-run with --commit to execute.`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[wipe-progress] FAILED:', err.stack || err.message || err);
    process.exit(1);
  });
