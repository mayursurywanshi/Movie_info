const usernamePattern = /^[a-zA-Z0-9_]{3,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignup(request, response, next) {
  const username = typeof request.body.username === "string" ? request.body.username.trim() : "";
  const email = typeof request.body.email === "string" ? request.body.email.trim().toLowerCase() : "";
  const password = typeof request.body.password === "string" ? request.body.password : "";

  if (!username || !email || !password) {
    return response.status(400).json({ status: "error", message: "Username, email, and password are required" });
  }

  if (!usernamePattern.test(username)) {
    return response.status(400).json({ status: "error", message: "Username must contain 3–50 letters, numbers, or underscores" });
  }

  if (!emailPattern.test(email)) {
    return response.status(400).json({ status: "error", message: "Enter a valid email address" });
  }

  if (password.length < 8 || password.length > 128) {
    return response.status(400).json({ status: "error", message: "Password must contain between 8 and 128 characters" });
  }

  request.validatedBody = { username, email, password };
  return next();
}

module.exports = { validateSignup };
