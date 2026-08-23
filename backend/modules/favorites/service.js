const favoritesRepository = require("./repository");

function getFavorites(userId) {
  return favoritesRepository.findFavorites(userId);
}

function addFavorite({ userId, movie }) {
  return favoritesRepository.addFavorite({ userId, movie });
}

function removeFavorite({ userId, movieId }) {
  return favoritesRepository.removeFavorite({ userId, movieId });
}

module.exports = { getFavorites, addFavorite, removeFavorite };
