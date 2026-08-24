import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { changeProfilePassword } from "../../services/profileApi";
import { clearAuthentication } from "../../services/authStorage";

const initialForm = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

const PasswordInput = ({ id, name, label, value, onChange, autoComplete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="grid gap-2 sm:grid-cols-[180px_1fr] sm:items-center">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          minLength={name === "current_password" ? undefined : 8}
          maxLength="128"
          autoComplete={autoComplete}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          className="absolute inset-y-0 right-0 flex w-16 items-center justify-center text-xs font-medium text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useTitle("Change Password");

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.new_password.length < 8) {
      setError("New password must contain at least 8 characters");
      return;
    }
    if (form.new_password !== form.confirm_password) {
      setError("New password and confirmation do not match");
      return;
    }
    if (form.current_password === form.new_password) {
      setError("New password must be different from the current password");
      return;
    }

    setSubmitting(true);
    try {
      const result = await changeProfilePassword(form);
      clearAuthentication();
      navigate("/login", {
        state: { authMessage: result.message, backgroundPath: "/" },
        replace: true,
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Account security</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">Change password</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Changing your password will sign you out from every active session.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <PasswordInput id="current-password" name="current_password" label="Current password" value={form.current_password} onChange={updateField} autoComplete="current-password" />
        <PasswordInput id="new-password" name="new_password" label="New password" value={form.new_password} onChange={updateField} autoComplete="new-password" />
        <PasswordInput id="confirm-password" name="confirm_password" label="Confirm new password" value={form.confirm_password} onChange={updateField} autoComplete="new-password" />

        <p className="text-sm text-gray-500 dark:text-gray-400 sm:pl-[180px]">The new password must contain at least 8 characters.</p>
        {error && <p className="text-sm text-red-600 dark:text-red-400 sm:pl-[180px]" role="alert">{error}</p>}

        <div className="sm:pl-[180px]">
          <button type="submit" disabled={submitting} className="rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Changing password..." : "Change password"}
          </button>
        </div>
      </form>
    </div>
  );
};
