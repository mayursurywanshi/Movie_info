const pool = require("../../config/database");

async function createUser({ username, email, passwordHash }) {
  const result = await pool.query(
    `INSERT INTO user_details (username, display_name, email, password_hash)
     VALUES ($1, $1, $2, $3)
     RETURNING id, username, display_name, email, created_at`,
    [username, email, passwordHash]
  );

  return result.rows[0];
}

module.exports = { createUser };
