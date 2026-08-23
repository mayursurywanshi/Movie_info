import { getAuthentication } from "./authStorage";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

async function favoritesRequest(path, options = {}) {
  const authentication = getAuthentication();
  if (!authentication?.token) throw new Error("Please sign in to continue");

  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error("Unable to connect to the server. Please try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete your request");
  return data;
}

export function getFavorites() {
  return favoritesRequest("/api/users/favorites");
}

export function addFavorite(movie) {
  return favoritesRequest("/api/users/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      movie_id: movie.id,
      title: movie.title || movie.original_title,
      overview: movie.overview || null,
      poster_path: movie.poster_path || null,
      release_date: movie.release_date || null,
      vote_average: movie.vote_average ?? null,
    }),
  });
}

export function removeFavorite(movieId) {
  return favoritesRequest(`/api/users/favorites/${movieId}`, { method: "DELETE" });
}
