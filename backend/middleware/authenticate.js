const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const profileRepository = require("../modules/profile/repository");

async function authenticate(request, response, next) {
  const authorization = request.get("authorization") || "";
  const tokenMatch = authorization.match(/^Bearer\s+(.+)$/i);

  if (!tokenMatch) {
    return response.status(401).json({
      status: "error",
      message: "Authentication required",
    });
  }

  try {
    const payload = jwt.verify(tokenMatch[1], authConfig.jwtSecret);
    const auth = { userId: String(payload.sub), tokenId: payload.jti };
    const session = await profileRepository.findActiveSession(auth);

    if (!session) {
      return response.status(401).json({
        status: "error",
        message: "Authentication session is no longer active",
      });
    }

    request.auth = auth;
    return next();
  } catch (error) {
    return response.status(401).json({
      status: "error",
      message: "Invalid or expired authentication token",
    });
  }
}

module.exports = authenticate;
