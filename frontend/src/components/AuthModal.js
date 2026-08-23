import { useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const AuthModal = ({ mode, message, onClose, onModeChange, onLoginSuccess }) => {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  if (!mode) return null;

  const isLogin = mode === "login";
  const isChoice = mode === "choice";
  const modalTitle = isChoice
    ? "Sign in"
    : isLogin
      ? "Welcome back"
      : "Create account";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/65 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="auth-modal-panel max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <div className="relative mb-6 flex min-h-[48px] items-start justify-center px-12 text-center">
          <div className="text-center">
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">Cinemate account</p>
            <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">{modalTitle}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close account form" className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white">&times;</button>
        </div>

        {isChoice ? (
          <div>
            <p className="mb-5 text-center text-sm leading-6 text-gray-600 dark:text-gray-300">
              Choose how you would like to continue your Cinemate journey.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onModeChange("signup")}
                className="min-h-[76px] rounded-xl bg-blue-700 px-3 py-4 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-lg sm:px-5 sm:text-base"
              >
                Create your Cinemate account
              </button>

              <button
                type="button"
                onClick={() => onModeChange("login")}
                className="min-h-[76px] rounded-xl border border-blue-200 bg-blue-50 px-3 py-4 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/50 sm:px-5 sm:text-base"
              >
                Sign in to your existing account
              </button>
            </div>
          </div>
        ) : isLogin ? (
          <LoginForm successMessage={message} onSuccess={onLoginSuccess} />
        ) : (
          <SignupForm onSuccess={() => onModeChange("login", "Account created successfully. Please log in.")} />
        )}

        {!isChoice && (
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            {isLogin ? "New to Cinemate?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => onModeChange(isLogin ? "signup" : "login")} className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        )}
      </section>
    </div>
  );
};
