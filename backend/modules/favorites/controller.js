const favoritesService = require("./service");

async function getFavorites(request, response) {
  try {
    const favorites = await favoritesService.getFavorites(request.auth.userId);
    return response.json({ status: "success", favorites });
  } catch (error) {
    console.error("Get favorites failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to load Favorites" });
  }
}

async function addFavorite(request, response) {
  try {
    const favorite = await favoritesService.addFavorite({
      userId: request.auth.userId,
      movie: request.validatedBody,
    });
    return response.status(201).json({
      status: "success",
      message: "Movie added to Favorites",
      favorite,
    });
  } catch (error) {
    console.error("Add favorite failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to add movie to Favorites" });
  }
}

async function removeFavorite(request, response) {
  try {
    const removed = await favoritesService.removeFavorite({
      userId: request.auth.userId,
      movieId: request.validatedMovieId,
    });
    if (!removed) {
      return response.status(404).json({ status: "error", message: "Movie is not in Favorites" });
    }
    return response.json({ status: "success", message: "Movie removed from Favorites" });
  } catch (error) {
    console.error("Remove favorite failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to remove movie from Favorites" });
  }
}

module.exports = { getFavorites, addFavorite, removeFavorite };
