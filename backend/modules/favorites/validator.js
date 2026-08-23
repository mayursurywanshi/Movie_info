function validateFavorite(request, response, next) {
  const movieId = Number(request.body.movie_id);
  const title = typeof request.body.title === "string" ? request.body.title.trim() : "";
  const overview = typeof request.body.overview === "string" ? request.body.overview.trim() : null;
  const posterPath = typeof request.body.poster_path === "string" ? request.body.poster_path.trim() : null;
  const releaseDate = typeof request.body.release_date === "string" && request.body.release_date ? request.body.release_date : null;
  const voteAverage = request.body.vote_average === null || request.body.vote_average === undefined ? null : Number(request.body.vote_average);

  if (!Number.isSafeInteger(movieId) || movieId <= 0) {
    return response.status(400).json({ status: "error", message: "A valid movie ID is required" });
  }
  if (!title || title.length > 255) {
    return response.status(400).json({ status: "error", message: "Movie title is required and must not exceed 255 characters" });
  }
  if (releaseDate && !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
    return response.status(400).json({ status: "error", message: "Release date must use YYYY-MM-DD format" });
  }
  if (voteAverage !== null && (!Number.isFinite(voteAverage) || voteAverage < 0 || voteAverage > 10)) {
    return response.status(400).json({ status: "error", message: "Vote average must be between 0 and 10" });
  }

  request.validatedBody = { movieId, title, overview, posterPath, releaseDate, voteAverage };
  return next();
}

function validateMovieId(request, response, next) {
  const movieId = Number(request.params.movieId);
  if (!Number.isSafeInteger(movieId) || movieId <= 0) {
    return response.status(400).json({ status: "error", message: "A valid movie ID is required" });
  }
  request.validatedMovieId = movieId;
  return next();
}

module.exports = { validateFavorite, validateMovieId };
