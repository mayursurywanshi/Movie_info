import { useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useFavorites } from "../context/FavoritesContext";
import Backup from "../assets/images/backup.png";

export const Favorites = () => {
  const [removingId, setRemovingId] = useState(null);
  const [actionError, setActionError] = useState("");
  const { favorites, loading, error, removeMovie } = useFavorites();
  useTitle("Favorites");

  const handleRemoveMovie = async (movieId) => {
    setRemovingId(String(movieId));
    setActionError("");
    try {
      await removeMovie(movieId);
    } catch (requestError) {
      setActionError(requestError.message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Your collection</p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">Favorite movies</h1>
      </div>

      {(error || actionError) && <p className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400" role="alert">{actionError || error}</p>}

      {loading ? (
        <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading Favorites">
          {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-[480px] rounded-xl bg-gray-200 dark:bg-gray-700" />)}
        </div>
      ) : favorites.length === 0 ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl text-red-600 dark:bg-red-950/30">♡</div>
          <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">No favorite movies yet</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-300">Open a movie and select the heart to add it to your collection.</p>
          <Link to="/" className="mt-7 inline-flex rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800">Explore movies</Link>
        </section>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((favorite) => {
            const image = favorite.poster_path ? `https://image.tmdb.org/t/p/w342${favorite.poster_path}` : Backup;
            const isRemoving = removingId === String(favorite.movie_id);
            return (
              <article key={favorite.movie_id} className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                <Link to={`/movie/${favorite.movie_id}`}>
                  <img src={image} alt={`${favorite.title} poster`} width="342" height="513" loading="lazy" decoding="async" className="aspect-[2/3] w-full bg-gray-100 object-cover dark:bg-gray-900" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <Link to={`/movie/${favorite.movie_id}`} className="text-xl font-bold text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400">{favorite.title}</Link>
                  <p className="movie-card-overview mt-3 text-sm text-gray-600 dark:text-gray-400">{favorite.overview || "No overview available."}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <Link to={`/movie/${favorite.movie_id}`} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">View movie</Link>
                    <button type="button" onClick={() => handleRemoveMovie(favorite.movie_id)} disabled={isRemoving} aria-label={`Remove ${favorite.title} from Favorites`} className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-xl text-red-600 hover:bg-red-100 disabled:opacity-60 dark:bg-red-950/30 dark:hover:bg-red-950/50">♥</button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
};
