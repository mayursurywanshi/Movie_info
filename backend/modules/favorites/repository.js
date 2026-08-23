const pool = require("../../config/database");

async function findFavorites(userId) {
  const result = await pool.query(
    `SELECT id, movie_id, title, overview, poster_path, release_date, vote_average, added_at
     FROM user_favorites
     WHERE user_id = $1
     ORDER BY added_at DESC`,
    [userId]
  );
  return result.rows;
}

async function addFavorite({ userId, movie }) {
  const result = await pool.query(
    `INSERT INTO user_favorites (
       user_id, movie_id, title, overview, poster_path, release_date, vote_average
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (user_id, movie_id)
     DO UPDATE SET
       title = EXCLUDED.title,
       overview = EXCLUDED.overview,
       poster_path = EXCLUDED.poster_path,
       release_date = EXCLUDED.release_date,
       vote_average = EXCLUDED.vote_average
     RETURNING id, movie_id, title, overview, poster_path, release_date, vote_average, added_at`,
    [
      userId,
      movie.movieId,
      movie.title,
      movie.overview,
      movie.posterPath,
      movie.releaseDate,
      movie.voteAverage,
    ]
  );
  return result.rows[0];
}

async function removeFavorite({ userId, movieId }) {
  const result = await pool.query(
    `DELETE FROM user_favorites
     WHERE user_id = $1 AND movie_id = $2
     RETURNING movie_id`,
    [userId, movieId]
  );
  return result.rows[0] || null;
}

module.exports = { findFavorites, addFavorite, removeFavorite };
