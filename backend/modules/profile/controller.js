const profileService = require("./service");

async function getProfile(request, response) {
  try {
    const user = await profileService.getProfile(request.auth.userId);
    if (!user) {
      return response.status(404).json({ status: "error", message: "User profile not found" });
    }
    return response.json({ status: "success", user });
  } catch (error) {
    console.error("Get profile failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to load profile" });
  }
}

async function updateName(request, response) {
  try {
    const user = await profileService.updateName({
      userId: request.auth.userId,
      displayName: request.validatedBody.displayName,
    });
    if (!user) {
      return response.status(404).json({ status: "error", message: "User profile not found" });
    }
    return response.json({ status: "success", message: "Name updated successfully", user });
  } catch (error) {
    console.error("Update profile name failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to update name" });
  }
}

async function updatePicture(request, response) {
  if (!request.file) {
    return response.status(400).json({ status: "error", message: "Select a profile picture" });
  }

  try {
    const picture = await profileService.updatePicture({
      userId: request.auth.userId,
      file: request.file,
    });
    if (!picture) {
      return response.status(404).json({ status: "error", message: "User profile not found" });
    }
    return response.json({
      status: "success",
      message: "Profile picture updated successfully",
      picture: { has_profile_picture: true, ...picture },
    });
  } catch (error) {
    console.error("Update profile picture failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to update profile picture" });
  }
}

async function getPicture(request, response) {
  try {
    const picture = await profileService.getPicture(request.auth.userId);
    if (!picture?.profile_picture) {
      return response.status(404).json({ status: "error", message: "Profile picture not found" });
    }
    return response
      .type(picture.profile_picture_mime_type)
      .set("Cache-Control", "private, no-cache")
      .send(picture.profile_picture);
  } catch (error) {
    console.error("Get profile picture failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to load profile picture" });
  }
}

async function logout(request, response) {
  try {
    await profileService.logout(request.auth);
    return response.json({ status: "success", message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to log out" });
  }
}

async function changePassword(request, response) {
  try {
    const result = await profileService.changePassword({
      userId: request.auth.userId,
      ...request.validatedBody,
    });

    if (result.status === "not_found") {
      return response.status(404).json({ status: "error", message: "User profile not found" });
    }

    if (result.status === "invalid_password") {
      return response.status(400).json({ status: "error", message: "Current password is incorrect" });
    }

    return response.json({
      status: "success",
      message: "Password changed successfully. Please log in again.",
    });
  } catch (error) {
    console.error("Change password failed:", error.message);
    return response.status(500).json({ status: "error", message: "Unable to change password" });
  }
}

module.exports = { getProfile, updateName, updatePicture, getPicture, logout, changePassword };
