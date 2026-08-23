function validateLogin(request, response, next) {
  const identifier =
    typeof request.body.identifier === "string"
      ? request.body.identifier.trim()
      : "";

  const password =
    typeof request.body.password === "string"
      ? request.body.password
      : "";

  if (!identifier || !password) {
    return response.status(400).json({
      status: "error",
      message: "Username or email and password are required",
    });
  }

  if (password.length > 128) {
    return response.status(400).json({
      status: "error",
      message: "Invalid login credentials",
    });
  }

  request.validatedBody = {
    identifier,
    password,
  };

  return next();
}

module.exports = {
  validateLogin,
};
