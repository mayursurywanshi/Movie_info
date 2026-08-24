import { getAuthentication } from "./authStorage";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

async function authenticatedRequest(path, options = {}) {
  const authentication = getAuthentication();
  if (!authentication?.token) throw new Error("Please sign in to continue");

  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error("Unable to connect to the server. Please try again.");
  }

  return response;
}

async function jsonRequest(path, options = {}) {
  const response = await authenticatedRequest(path, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Unable to complete your request");
  return data;
}

export function getProfile() {
  return jsonRequest("/api/users/profile");
}

export function updateProfileName(displayName) {
  return jsonRequest("/api/users/profile/name", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ display_name: displayName }),
  });
}

export function changeProfilePassword(passwords) {
  return jsonRequest("/api/users/profile/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(passwords),
  });
}

export function uploadProfilePicture(file) {
  const body = new FormData();
  body.append("profile_picture", file);
  return jsonRequest("/api/users/profile/picture", { method: "PUT", body });
}

export async function getProfilePictureUrl() {
  const response = await authenticatedRequest("/api/users/profile/picture");
  if (response.status === 404) return null;
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Unable to load profile picture");
  }
  return URL.createObjectURL(await response.blob());
}

export function logoutUser() {
  return jsonRequest("/api/users/logout", { method: "POST" });
}
