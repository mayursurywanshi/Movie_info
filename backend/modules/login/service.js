const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const authConfig = require("../../config/auth");
const loginRepository = require("./repository");

async function login({ identifier, password, ipAddress, userAgent }) {
  const user = await loginRepository.findUserByIdentifier(identifier);

  if (!user) {
    await loginRepository.createFailedLoginRecord({
      userId: null,
      identifier,
      failureReason: "user_not_found",
      ipAddress,
      userAgent,
    });

    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    await loginRepository.createFailedLoginRecord({
      userId: user.id,
      identifier,
      failureReason: "invalid_password",
      ipAddress,
      userAgent,
    });

    return null;
  }

  const tokenId = randomUUID();

  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    authConfig.jwtSecret,
    {
      subject: String(user.id),
      jwtid: tokenId,
      expiresIn: authConfig.jwtExpiresIn,
    }
  );

  const decodedToken = jwt.decode(token);
  const tokenExpiresAt = new Date(decodedToken.exp * 1000);

  const loginRecord = await loginRepository.createLoginRecord({
    userId: user.id,
    username: user.username,
    ipAddress,
    userAgent,
    tokenId,
    tokenExpiresAt,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    },
    session: {
      id: loginRecord.id,
      login_at: loginRecord.login_at,
      expires_at: loginRecord.token_expires_at,
    },
  };
}

module.exports = {
  login,
};
