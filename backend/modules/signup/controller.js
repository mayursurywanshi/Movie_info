const userService = require("./service");

async function signup(request, response) {
  try {
    const user = await userService.signup(request.validatedBody);
    return response.status(201).json({ status: "success", message: "User account created successfully", user });
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({ status: "error", message: "Username or email is already registered" });
    }

    console.error("User signup failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to create user account" });
  }
}

module.exports = { signup };
