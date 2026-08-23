const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

async function sendAuthRequest(path, body) {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error("Unable to connect to the server. Please try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Unable to complete your request");
  }
  return data;
}

export function signupUser({ username, email, password }) {
  return sendAuthRequest("/api/users/signup", { username, email, password });
}

export function loginUser({ identifier, password }) {
  return sendAuthRequest("/api/users/login", { identifier, password });
}
