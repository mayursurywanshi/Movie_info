const express = require("express");
const loginController = require("./controller");
const loginValidator = require("./validator");

const router = express.Router();

router.post("/login", loginValidator.validateLogin, loginController.login);

module.exports = router;
