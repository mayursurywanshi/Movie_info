const authStorageKeys = [
  "cinemate_token",
  "cinemate_user",
  "cinemate_session",
];

function clearStorage(storage) {
  authStorageKeys.forEach((key) => storage.removeItem(key));
}

function readAuthentication(storage) {
  try {
    const token = storage.getItem("cinemate_token");
    const user = JSON.parse(storage.getItem("cinemate_user") || "null");
    const session = JSON.parse(storage.getItem("cinemate_session") || "null");

    if (!token || !user || !session?.expires_at) return null;

    const expiresAt = new Date(session.expires_at).getTime();
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      clearStorage(storage);
      return null;
    }

    return { token, user, session };
  } catch (error) {
    clearStorage(storage);
    return null;
  }
}

export function getAuthenticatedUser() {
  return getAuthentication()?.user || null;
}

export function getAuthentication() {
  return readAuthentication(localStorage) || readAuthentication(sessionStorage);
}

export function storeAuthentication(result, rememberMe = false) {
  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;

  clearStorage(otherStorage);
  storage.setItem("cinemate_token", result.token);
  storage.setItem("cinemate_user", JSON.stringify(result.user));
  storage.setItem("cinemate_session", JSON.stringify(result.session));
  window.dispatchEvent(new Event("cinemate-auth-changed"));
}
