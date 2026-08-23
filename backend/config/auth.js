const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

if (!jwtSecret) {
  throw new Error("Missing authentication configuration: JWT_SECRET");
}

module.exports = {
  jwtSecret,
  jwtExpiresIn,
};
