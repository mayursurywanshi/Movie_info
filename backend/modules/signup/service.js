const bcrypt = require("bcryptjs");
const userRepository = require("./repository");

async function signup({ username, email, password }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return userRepository.createUser({ username, email, passwordHash });
}

module.exports = { signup };
