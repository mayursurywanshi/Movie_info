import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAuthentication } from "../services/authStorage";
import { addFavorite, getFavorites, removeFavorite } from "../services/favoritesApi";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshFavorites = useCallback(async () => {
    if (!getAuthentication()) {
      setFavorites([]);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getFavorites();
      setFavorites(result.favorites);
      setError("");
    } catch (requestError) {
      setFavorites([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFavorites();
    window.addEventListener("cinemate-auth-changed", refreshFavorites);
    window.addEventListener("storage", refreshFavorites);
    return () => {
      window.removeEventListener("cinemate-auth-changed", refreshFavorites);
      window.removeEventListener("storage", refreshFavorites);
    };
  }, [refreshFavorites]);

  const addMovie = async (movie) => {
    const result = await addFavorite(movie);
    setFavorites((current) => [
      result.favorite,
      ...current.filter((favorite) => String(favorite.movie_id) !== String(result.favorite.movie_id)),
    ]);
    return result.favorite;
  };

  const removeMovie = async (movieId) => {
    await removeFavorite(movieId);
    setFavorites((current) => current.filter((favorite) => String(favorite.movie_id) !== String(movieId)));
  };

  const favoriteMovieIds = useMemo(
    () => new Set(favorites.map((favorite) => String(favorite.movie_id))),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteMovieIds, loading, error, addMovie, removeMovie, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used inside FavoritesProvider");
  return context;
}
