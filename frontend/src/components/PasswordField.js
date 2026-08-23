import { useState } from "react";

export const PasswordField = ({ id, value, onChange, autoComplete, placeholder }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200" htmlFor={id}>Password</label>
      <div className="relative">
        <input id={id} name="password" type={visible ? "text" : "password"} value={value} onChange={onChange} minLength="8" maxLength="128" autoComplete={autoComplete} placeholder={placeholder} required className="auth-input block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 pr-16 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
        <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-16 items-center justify-center text-xs font-medium text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white">{visible ? "Hide" : "Show"}</button>
      </div>
    </div>
  );
};
