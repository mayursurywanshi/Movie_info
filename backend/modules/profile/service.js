const bcrypt = require("bcryptjs");
const profileRepository = require("./repository");

function getProfile(userId) {
  return profileRepository.findProfile(userId);
}

function updateName({ userId, displayName }) {
  return profileRepository.updateDisplayName({ userId, displayName });
}

function updatePicture({ userId, file }) {
  return profileRepository.updateProfilePicture({
    userId,
    picture: file.buffer,
    mimeType: file.mimetype,
  });
}

function getPicture(userId) {
  return profileRepository.findProfilePicture(userId);
}

function logout(auth) {
  return profileRepository.logout(auth);
}

async function changePassword({ userId, currentPassword, newPassword }) {
  const user = await profileRepository.findPasswordHash(userId);
  if (!user) return { status: "not_found" };

  const currentPasswordMatches = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );
  if (!currentPasswordMatches) return { status: "invalid_password" };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const updatedUser = await profileRepository.updatePasswordAndCloseSessions({
    userId,
    passwordHash,
  });

  return updatedUser ? { status: "success" } : { status: "not_found" };
}

module.exports = { getProfile, updateName, updatePicture, getPicture, logout, changePassword };
