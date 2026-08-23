const pool = require("../../config/database");

async function findUserByIdentifier(identifier) {
  const result = await pool.query(
    `
      SELECT
        id,
        username,
        display_name,
        email,
        password_hash,
        profile_picture IS NOT NULL AS has_profile_picture,
        profile_picture_updated_at,
        created_at
      FROM user_details
      WHERE LOWER(username) = LOWER($1)
         OR LOWER(email) = LOWER($1)
      LIMIT 1
    `,
    [identifier]
  );

  return result.rows[0] || null;
}

async function createLoginRecord({
  userId,
  username,
  ipAddress,
  userAgent,
  tokenId,
  tokenExpiresAt,
}) {
  const result = await pool.query(
    `
      INSERT INTO user_login_details (
        user_id,
        username,
        ip_address,
        user_agent,
        token_id,
        token_expires_at
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, login_at, token_expires_at
    `,
    [userId, username, ipAddress, userAgent, tokenId, tokenExpiresAt]
  );

  return result.rows[0];
}

async function createFailedLoginRecord({
  userId,
  identifier,
  failureReason,
  ipAddress,
  userAgent,
}) {
  await pool.query(
    `
      INSERT INTO failed_login (
        user_id,
        identifier,
        failure_reason,
        ip_address,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5)
    `,
    [userId, identifier, failureReason, ipAddress, userAgent]
  );
}

module.exports = {
  findUserByIdentifier,
  createLoginRecord,
  createFailedLoginRecord,
};
