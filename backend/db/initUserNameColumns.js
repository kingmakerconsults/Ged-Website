const db = require('../db');

/**
 * Ensures that users table has first_name, last_name, and display_name columns.
 * Also enforces email uniqueness and backfills display_name from existing name.
 */
module.exports = async function ensureUserNameColumns() {
  try {
    // Check if columns exist
    const columnCheck = await db.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users'
        AND column_name IN ('first_name', 'last_name', 'display_name')
    `);

    const existingColumns = columnCheck.rows.map((r) => r.column_name);
    const hasFirstName = existingColumns.includes('first_name');
    const hasLastName = existingColumns.includes('last_name');
    const hasDisplayName = existingColumns.includes('display_name');

    // Add missing columns
    if (!hasFirstName) {
      console.log('[initUserNameColumns] Adding first_name column...');
      await db.query(`ALTER TABLE users ADD COLUMN first_name TEXT`);
    }

    if (!hasLastName) {
      console.log('[initUserNameColumns] Adding last_name column...');
      await db.query(`ALTER TABLE users ADD COLUMN last_name TEXT`);
    }

    if (!hasDisplayName) {
      console.log('[initUserNameColumns] Adding display_name column...');
      await db.query(`ALTER TABLE users ADD COLUMN display_name TEXT`);
    }

    // Backfill display_name from existing name column where display_name is null
    if (!hasDisplayName) {
      console.log(
        '[initUserNameColumns] Backfilling display_name from name...'
      );
      await db.query(`
        UPDATE users
        SET display_name = name
        WHERE display_name IS NULL AND name IS NOT NULL
      `);
    }

    // Backfill first_name and last_name by splitting name
    if (!hasFirstName || !hasLastName) {
      console.log(
        '[initUserNameColumns] Backfilling first_name and last_name from name...'
      );

      const usersToSplit = await db.many(`
        SELECT id, name
        FROM users
        WHERE name IS NOT NULL
          AND name != ''
          AND (first_name IS NULL OR last_name IS NULL)
      `);

      for (const user of usersToSplit) {
        const nameParts = user.name.trim().split(/\s+/);
        const firstName = nameParts[0] || null;
        const lastName =
          nameParts.length > 1 ? nameParts.slice(1).join(' ') : null;

        await db.query(
          `UPDATE users
           SET first_name = COALESCE(first_name, $1),
               last_name = COALESCE(last_name, $2)
           WHERE id = $3`,
          [firstName, lastName, user.id]
        );
      }

      console.log(
        `[initUserNameColumns] Backfilled ${usersToSplit.length} user records.`
      );
    }

    // Enforce email uniqueness
    console.log('[initUserNameColumns] Ensuring email uniqueness...');

    // Check if ANY unique constraint or index exists on email
    const constraintCheck = await db.query(`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE table_name = 'users'
        AND constraint_type = 'UNIQUE'
        AND constraint_name IN ('users_email_key', 'users_email_unique')
    `);

    const indexCheck = await db.query(`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename = 'users'
        AND indexname IN ('users_email_unique_idx', 'users_email_key')
    `);

    if (constraintCheck.rows.length === 0 && indexCheck.rows.length === 0) {
      // Find and handle duplicates before adding constraint
      const duplicates = await db.many(`
        SELECT email, COUNT(*) as count
        FROM users
        WHERE email IS NOT NULL
        GROUP BY email
        HAVING COUNT(*) > 1
      `);

      if (duplicates.length > 0) {
        console.warn(
          `[initUserNameColumns] Found ${duplicates.length} duplicate emails. Keeping oldest record for each.`
        );

        for (const dup of duplicates) {
          // Keep the oldest user (lowest id), delete the rest
          await db.query(
            `
            DELETE FROM users
            WHERE email = $1
              AND id NOT IN (
                SELECT MIN(id)
                FROM users
                WHERE email = $1
              )
          `,
            [dup.email]
          );
        }
      }

      // Now add the unique constraint
      await db.query(`
        ALTER TABLE users
        ADD CONSTRAINT users_email_key UNIQUE (email)
      `);
      console.log('[initUserNameColumns] Email uniqueness constraint added.');
    } else {
      console.log(
        '[initUserNameColumns] Email uniqueness constraint already exists.'
      );
    }

    console.log(
      '[initUserNameColumns] User name columns initialized successfully.'
    );
  } catch (error) {
    console.error('[initUserNameColumns] Migration failed:', error);
    throw error;
  }
};
