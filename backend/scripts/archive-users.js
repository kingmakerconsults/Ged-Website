#!/usr/bin/env node
/**
 * archive-users.js \u2014 fresh-start gating script.
 *
 * Moves every user (and all user-tied rows) into *_archive tables, EXCEPT
 * the two preserved accounts:
 *   1. kingmakerconsults@gmail.com   (super_admin)
 *   2. zsmith@commonpoint.org        (Commonpoint Bronx org_admin)
 *
 * SAFETY:
 *   * Default mode is --dry-run. Nothing is written/deleted.
 *   * Running with --commit is irreversible; back up the DB first.
 *   * Idempotent: rows are inserted into *_archive tables additively. Re-run
 *     after a partial failure is safe (you'll just see duplicate archive
 *     rows for whatever was already archived).
 *
 * USAGE:
 *   node backend/scripts/archive-users.js               # dry run (default)
 *   node backend/scripts/archive-users.js --commit      # actually archive
 *
 * EXIT CODES:
 *   0 on success, 1 on any error.
 */

'use strict';

const path = require('path');
const db = require(path.join(__dirname, '..', 'db'));

const PRESERVE_EMAILS = [
  'kingmakerconsults@gmail.com',
  'zsmith@commonpoint.org',
];

const COMMIT = process.argv.includes('--commit');
const ARCHIVE_REASON = '2026-04-28-relicense-fresh-start';

// Tables that have user_id FK \u2014 we archive then delete rows that belong
// to non-preserved users. The companion *_archive table is created by the
// migration; if it exists we use it, otherwise we skip with a warning.
const USER_OWNED_TABLES = [
  'profiles',
  'auth_identities',
  'quiz_attempts',
  'essay_scores',
  'study_plans',
  'challenges',
  'coach_composite_usage',
  'user_challenge_stats',
  'user_challenge_suggestions',
  'user_selected_challenges',
  'essay_challenge_log',
  'exam_sessions',
  'notifications',
];

function log(msg) {
  console.log(`[archive] ${msg}`);
}

async function tableExists(name) {
  const r = await db.query(
    `SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = $1 LIMIT 1`,
    [name]
  );
  return r.rowCount > 0;
}

async function fetchPreservedIds() {
  const r = await db.query(
    `SELECT id, email FROM users WHERE LOWER(email) = ANY($1::text[])`,
    [PRESERVE_EMAILS]
  );
  return r.rows;
}

async function ensurePreservedUsers() {
  // Make sure both preserved accounts exist with the right role and status.
  // We do NOT set passwords \u2014 they re-authenticate via existing OAuth or
  // password-reset flow.
  const orgRes = await db.query(
    `SELECT id FROM organizations WHERE LOWER(name) = LOWER('Commonpoint Bronx') LIMIT 1`
  );
  const bronxId = orgRes.rows[0]?.id || null;

  // 1) super_admin
  if (COMMIT) {
    await db.query(
      `INSERT INTO users (email, name, role, account_status)
       VALUES ('kingmakerconsults@gmail.com', 'Kingmaker Super Admin', 'super_admin', 'active')
       ON CONFLICT (email) DO UPDATE
         SET role = 'super_admin', account_status = 'active'`
    );
  }
  log(
    `super_admin row ensured: kingmakerconsults@gmail.com${COMMIT ? '' : ' (dry-run)'}`
  );

  // 2) Commonpoint Bronx org_admin
  if (COMMIT) {
    await db.query(
      `INSERT INTO users (email, name, role, organization_id, account_status)
       VALUES ('zsmith@commonpoint.org', 'Z Smith', 'org_admin', $1, 'active')
       ON CONFLICT (email) DO UPDATE
         SET role = 'org_admin',
             organization_id = COALESCE(EXCLUDED.organization_id, users.organization_id),
             account_status = 'active'`,
      [bronxId]
    );
  }
  log(
    `org_admin row ensured: zsmith@commonpoint.org -> Commonpoint Bronx (id=${bronxId})${COMMIT ? '' : ' (dry-run)'}`
  );
}

async function archiveUserOwnedTable(tableName, preservedIds) {
  const exists = await tableExists(tableName);
  if (!exists) {
    log(`skip ${tableName}: table not present`);
    return { archived: 0, deleted: 0 };
  }
  const archiveTable = `${tableName}_archive`;
  const archiveExists = await tableExists(archiveTable);
  if (!archiveExists) {
    log(
      `WARN ${tableName}: ${archiveTable} missing; skipping (run the migration first)`
    );
    return { archived: 0, deleted: 0 };
  }

  const idsList = preservedIds.length ? preservedIds.join(',') : 'NULL';
  // Count first so the dry-run output is meaningful.
  const cntRes = await db.query(
    `SELECT COUNT(*) AS c FROM ${tableName}
      WHERE user_id IS NOT NULL AND user_id NOT IN (${idsList})`
  );
  const willArchive = Number(cntRes.rows[0].c) || 0;

  if (!COMMIT) {
    log(`DRY ${tableName}: would archive ${willArchive} rows`);
    return { archived: 0, deleted: 0, candidate: willArchive };
  }

  // Snapshot rows to *_archive as JSONB then delete.
  const insertRes = await db.query(
    `INSERT INTO ${archiveTable} (raw)
     SELECT to_jsonb(t.*) FROM ${tableName} t
      WHERE t.user_id IS NOT NULL AND t.user_id NOT IN (${idsList})`
  );
  const delRes = await db.query(
    `DELETE FROM ${tableName}
      WHERE user_id IS NOT NULL AND user_id NOT IN (${idsList})`
  );
  log(
    `OK  ${tableName}: archived ${insertRes.rowCount}, deleted ${delRes.rowCount}`
  );
  return { archived: insertRes.rowCount, deleted: delRes.rowCount };
}

async function archiveUsers(preservedIds) {
  const idsList = preservedIds.length ? preservedIds.join(',') : 'NULL';
  const cntRes = await db.query(
    `SELECT COUNT(*) AS c FROM users WHERE id NOT IN (${idsList})`
  );
  const willArchive = Number(cntRes.rows[0].c) || 0;

  if (!COMMIT) {
    log(`DRY users: would archive ${willArchive} rows`);
    return { archived: 0, deleted: 0, candidate: willArchive };
  }

  // Insert one column per known users field plus raw JSONB catch-all.
  const ins = await db.query(
    `INSERT INTO users_archive
       (archive_reason, id, email, name, password_hash, role, organization_id,
        organization_join_code, picture_url, created_at, last_login,
        last_seen_at, account_status, raw)
     SELECT $1,
            id, email, name, password_hash, role, organization_id,
            organization_join_code, picture_url, created_at, last_login,
            last_seen_at,
            COALESCE(account_status, 'active'),
            to_jsonb(u.*)
       FROM users u
      WHERE id NOT IN (${idsList})`,
    [ARCHIVE_REASON]
  );
  // Delete users last (cascades will handle anything we missed, but we
  // already wiped user-owned tables explicitly above).
  const del = await db.query(`DELETE FROM users WHERE id NOT IN (${idsList})`);
  log(`OK  users: archived ${ins.rowCount}, deleted ${del.rowCount}`);
  return { archived: ins.rowCount, deleted: del.rowCount };
}

async function main() {
  log(
    `mode = ${COMMIT ? 'COMMIT (writes will happen)' : 'DRY-RUN (no writes)'}`
  );
  log(`preserved emails: ${PRESERVE_EMAILS.join(', ')}`);

  await ensurePreservedUsers();

  const preserved = await fetchPreservedIds();
  log(
    `preserved user ids: ${preserved.map((r) => `${r.email}=${r.id}`).join(', ') || 'NONE FOUND'}`
  );
  const preservedIds = preserved.map((r) => r.id);

  if (!preservedIds.length && COMMIT) {
    throw new Error(
      'Refusing to commit: zero preserved users matched. Run dry-run first.'
    );
  }

  // Archive user-owned tables BEFORE users so FK cascades stay consistent.
  let totals = { candidate: 0, archived: 0, deleted: 0 };
  for (const t of USER_OWNED_TABLES) {
    const r = await archiveUserOwnedTable(t, preservedIds);
    totals.archived += r.archived || 0;
    totals.deleted += r.deleted || 0;
    totals.candidate += r.candidate || 0;
  }

  const u = await archiveUsers(preservedIds);
  totals.archived += u.archived || 0;
  totals.deleted += u.deleted || 0;
  totals.candidate += u.candidate || 0;

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
    console.error('[archive] FAILED:', err.stack || err.message || err);
    process.exit(1);
  });
