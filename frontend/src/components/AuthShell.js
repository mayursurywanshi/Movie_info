import { NavLink } from "react-router-dom";

export const AuthShell = ({ title, subtitle, children }) => {
  const tabClass = ({ isActive }) =>
    `rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${isActive ? "bg-white text-blue-800 shadow dark:bg-gray-700 dark:text-white" : "text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"}`;

  return (
    <main className="auth-page max-w-none p-0">
      <section className="auth-shell mx-auto grid min-h-[620px] max-w-7xl items-stretch gap-6 p-3 sm:p-6 lg:grid-cols-[minmax(280px,0.7fr)_minmax(460px,1.3fr)]">
        <div className="auth-hero flex min-h-[240px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700 p-7 text-center text-white shadow-lg sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">Your personal movie space</p>
          <h1 className="max-w-md text-4xl font-bold leading-tight">Save stories worth remembering.</h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-blue-100">Create an account to build your watchlist, revisit favorites, and keep your movie journey in one place.</p>
        </div>

        <div className="auth-panel flex items-center rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-10 lg:p-12">
          <div className="w-full">
            <div className="auth-tabs mb-8 grid grid-cols-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
              <NavLink to="/signup" className={tabClass}>Sign up</NavLink>
              <NavLink to="/login" className={tabClass}>Login</NavLink>
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <p className="mb-7 mt-2 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
