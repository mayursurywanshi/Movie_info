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

function validatePasswordChange(request, response, next) {
  const currentPassword =
    typeof request.body.current_password === "string"
      ? request.body.current_password
      : "";
  const newPassword =
    typeof request.body.new_password === "string"
      ? request.body.new_password
      : "";
  const confirmPassword =
    typeof request.body.confirm_password === "string"
      ? request.body.confirm_password
      : "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    return response.status(400).json({
      status: "error",
      message: "Current password, new password, and confirmation are required",
    });
  }

  if (currentPassword.length > 128 || newPassword.length < 8 || newPassword.length > 128) {
    return response.status(400).json({
      status: "error",
      message: "New password must contain between 8 and 128 characters",
    });
  }

  if (newPassword !== confirmPassword) {
    return response.status(400).json({
      status: "error",
      message: "New password and confirmation do not match",
    });
  }

  if (currentPassword === newPassword) {
    return response.status(400).json({
      status: "error",
      message: "New password must be different from the current password",
    });
  }

  request.validatedBody = { currentPassword, newPassword };
  return next();
}

module.exports = { validateDisplayName, validatePasswordChange };
