import { useState } from "react";
import { getAuthenticatedUser, updateStoredUser } from "../../services/authStorage";
import { updateProfileName } from "../../services/profileApi";
import { useTitle } from "../../hooks/useTitle";

export const UpdateName = () => {
  const currentUser = getAuthenticatedUser();
  const [displayName, setDisplayName] = useState(currentUser?.display_name || currentUser?.username || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useTitle("Update Name");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);
    try {
      const result = await updateProfileName(displayName);
      updateStoredUser(result.user);
      setDisplayName(result.user.display_name);
      setMessage(result.message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Account identity</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Update name</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Current name</span>
          <strong className="text-gray-900 dark:text-white">{currentUser?.display_name || currentUser?.username}</strong>
        </div>

        <div className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center">
          <label htmlFor="display-name" className="text-sm font-medium text-gray-700 dark:text-gray-200">New display name</label>
          <input id="display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} minLength="2" maxLength="80" required className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
        </div>

        {message && <p className="mt-4 text-sm text-green-700 dark:text-green-400" role="status">{message}</p>}
        {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
        <div className="sm:pl-[160px]">
          <button type="submit" disabled={submitting} className="rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 disabled:opacity-60">{submitting ? "Updating..." : "Update name"}</button>
        </div>
      </form>
    </div>
  );
};
