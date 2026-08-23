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

module.exports = { getProfile, updateName, updatePicture, getPicture, logout };
