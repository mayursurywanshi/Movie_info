const pool = require("../../config/database");

async function findActiveSession({ userId, tokenId }) {
  const result = await pool.query(
    `SELECT id
     FROM user_login_details
     WHERE user_id = $1
       AND token_id = $2
       AND logout_at IS NULL
       AND token_expires_at > CURRENT_TIMESTAMP
     LIMIT 1`,
    [userId, tokenId]
  );
  return result.rows[0] || null;
}

async function findProfile(userId) {
  const result = await pool.query(
    `SELECT
       id,
       username,
       display_name,
       email,
       profile_picture IS NOT NULL AS has_profile_picture,
       profile_picture_updated_at,
       created_at,
       updated_at
     FROM user_details
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] || null;
}

async function updateDisplayName({ userId, displayName }) {
  const result = await pool.query(
    `UPDATE user_details
     SET display_name = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING
       id,
       username,
       display_name,
       email,
       profile_picture IS NOT NULL AS has_profile_picture,
       profile_picture_updated_at,
       created_at,
       updated_at`,
    [userId, displayName]
  );
  return result.rows[0] || null;
}

async function updateProfilePicture({ userId, picture, mimeType }) {
  const result = await pool.query(
    `UPDATE user_details
     SET
       profile_picture = $2,
       profile_picture_mime_type = $3,
       profile_picture_updated_at = CURRENT_TIMESTAMP,
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING profile_picture_updated_at, updated_at`,
    [userId, picture, mimeType]
  );
  return result.rows[0] || null;
}

async function findProfilePicture(userId) {
  const result = await pool.query(
    `SELECT profile_picture, profile_picture_mime_type
     FROM user_details
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] || null;
}

async function logout({ userId, tokenId }) {
  const result = await pool.query(
    `UPDATE user_login_details
     SET logout_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
       AND token_id = $2
       AND logout_at IS NULL
     RETURNING logout_at`,
    [userId, tokenId]
  );
  return result.rows[0] || null;
}

module.exports = {
  findActiveSession,
  findProfile,
  updateDisplayName,
  updateProfilePicture,
  findProfilePicture,
  logout,
};
