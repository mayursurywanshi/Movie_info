const express = require("express");
const userController = require("./controller");
const userValidator = require("./validator");

const router = express.Router();

router.post("/signup", userValidator.validateSignup, userController.signup);

module.exports = router;
