import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { getAuthentication } from "../services/authStorage";

export const FavoriteButton = ({ movie, compact = false }) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const { favoriteMovieIds, loading, addMovie, removeMovie } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();
  const isFavorite = favoriteMovieIds.has(String(movie.id));
  const movieTitle = movie.title || movie.original_title || "movie";
  const busy = loading || updating;

  const toggleFavorite = async () => {
    if (!getAuthentication()) {
      navigate("/account", {
        state: { backgroundPath: location.pathname, returnPath: location.pathname },
      });
      return;
    }

    setUpdating(true);
    setError("");
    try {
      if (isFavorite) await removeMovie(movie.id);
      else await addMovie(movie);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdating(false);
    }
  };

  const heart = (
    <button type="button" onClick={toggleFavorite} disabled={busy} aria-pressed={isFavorite} aria-label={isFavorite ? `Remove ${movieTitle} from Favorites` : `Add ${movieTitle} to Favorites`} title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} className={compact ? "absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/95 shadow-lg transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900/95" : "flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 dark:border-gray-600 dark:bg-gray-800"}>
      <svg className={`${compact ? "h-6 w-6" : "h-7 w-7"} ${isFavorite ? "fill-red-600 text-red-600" : "fill-transparent text-gray-600 dark:text-gray-300"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );

  if (compact) return heart;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {heart}
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{busy ? "Updating..." : isFavorite ? "In Favorites" : "Add to Favorites"}</span>
      {error && <span className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</span>}
    </div>
  );
};
