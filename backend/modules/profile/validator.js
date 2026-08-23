function validateDisplayName(request, response, next) {
  const displayName =
    typeof request.body.display_name === "string"
      ? request.body.display_name.trim()
      : "";

  if (displayName.length < 2 || displayName.length > 80) {
    return response.status(400).json({
      status: "error",
      message: "Name must contain between 2 and 80 characters",
    });
  }

  request.validatedBody = { displayName };
  return next();
}

module.exports = { validateDisplayName };
