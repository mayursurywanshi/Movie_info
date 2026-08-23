const express = require("express");
const authenticate = require("../../middleware/authenticate");
const favoritesController = require("./controller");
const favoritesValidator = require("./validator");

const router = express.Router();

router.get("/favorites", authenticate, favoritesController.getFavorites);
router.post(
  "/favorites",
  authenticate,
  favoritesValidator.validateFavorite,
  favoritesController.addFavorite
);
router.delete(
  "/favorites/:movieId",
  authenticate,
  favoritesValidator.validateMovieId,
  favoritesController.removeFavorite
);

module.exports = router;
