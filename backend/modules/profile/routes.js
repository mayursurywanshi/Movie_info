const express = require("express");
const authenticate = require("../../middleware/authenticate");
const uploadProfilePicture = require("../../middleware/uploadProfilePicture");
const profileController = require("./controller");
const profileValidator = require("./validator");

const router = express.Router();

router.get("/profile", authenticate, profileController.getProfile);
router.patch(
  "/profile/name",
  authenticate,
  profileValidator.validateDisplayName,
  profileController.updateName
);
router.put(
  "/profile/picture",
  authenticate,
  uploadProfilePicture,
  profileController.updatePicture
);
router.get("/profile/picture", authenticate, profileController.getPicture);
router.post("/logout", authenticate, profileController.logout);

module.exports = router;
