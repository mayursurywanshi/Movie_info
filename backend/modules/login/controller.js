const loginService = require("./service");

async function login(request, response) {
  try {
    const result = await loginService.login({
      ...request.validatedBody,
      ipAddress: request.ip || request.socket.remoteAddress || null,
      userAgent: request.get("user-agent") || null,
    });

    if (!result) {
      return response.status(401).json({
        status: "error",
        message: "Invalid username, email, or password",
      });
    }

    return response.status(200).json({
      status: "success",
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    console.error("User login failed:", error.message);

    return response.status(500).json({
      status: "error",
      message: "Unable to log in",
    });
  }
}

module.exports = {
  login,
};
