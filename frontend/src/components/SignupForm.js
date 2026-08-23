import { useState } from "react";
import { PasswordField } from "./PasswordField";
import { AuthFormSkeleton } from "./AuthFormSkeleton";
import { signupUser } from "../services/authApi";

export const SignupForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const passwordIsValid = form.password.length >= 8;

  const updateField = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!passwordIsValid) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the terms and privacy policy.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await signupUser(form);
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
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="signup-username">Username</label>
      <input id="signup-username" name="username" value={form.username} onChange={updateField} minLength="3" maxLength="50" pattern="[a-zA-Z0-9_]+" autoComplete="username" placeholder="Enter your username" required className="auth-input mb-5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />

      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor="signup-email">Email</label>
      <input id="signup-email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="Enter your email address" required className="auth-input mb-5 block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />

      <PasswordField id="signup-password" value={form.password} onChange={updateField} autoComplete="new-password" placeholder="Enter at least 8 characters" />
      <p className={`mt-2 text-sm ${form.password.length > 0 && !passwordIsValid ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`} role={form.password.length > 0 && !passwordIsValid ? "alert" : undefined}>
        Password must be at least 8 characters.
      </p>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}

      <label className="mt-5 flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
        <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500" />
        <span>By creating an account, you agree to Cinemate’s terms and privacy policy.</span>
      </label>

      <button type="submit" disabled={submitting || !acceptedTerms} className="auth-submit mt-6 w-full rounded-lg bg-blue-700 px-4 py-3 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Creating account..." : "Create my account"}</button>
    </form>
  );
};
