import { useState } from "react";
import { PasswordField } from "./PasswordField";
import { AuthFormSkeleton } from "./AuthFormSkeleton";
import { loginUser } from "../services/authApi";
import { storeAuthentication } from "../services/authStorage";

export const LoginForm = ({ onSuccess, successMessage = "" }) => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await loginUser(form);
      storeAuthentication(result, rememberMe);
      onSuccess?.(result.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) return <AuthFormSkeleton />;

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <p className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300" role="status">
          {successMessage}
        </p>
      )}
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="login-identifier">Username or email</label>
      <input id="login-identifier" name="identifier" value={form.identifier} onChange={updateField} autoComplete="username" placeholder="Enter your username or email" required className="auth-input mb-5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
      <PasswordField id="login-password" value={form.password} onChange={updateField} autoComplete="current-password" placeholder="Enter your password" />

      <div className="my-5 flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />Remember me</label>
        <span className="text-gray-400">Forgot password?</span>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
      <button type="submit" disabled={submitting} className="auth-submit w-full rounded-lg bg-blue-700 px-4 py-3 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Logging in..." : "Login to Cinemate"}</button>
    </form>
  );
};
