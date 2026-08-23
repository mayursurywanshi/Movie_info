import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthModal } from "./AuthModal";
import { ProfileDropdown } from "./profile/ProfileDropdown";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { clearAuthentication, getAuthentication } from "../services/authStorage";
import { logoutUser } from "../services/profileApi";

const authPaths = {
  choice: "/account",
  signup: "/signup",
  login: "/login",
};

const authModes = Object.fromEntries(
  Object.entries(authPaths).map(([mode, path]) => [path, mode]),
);

export const Header = () => {
  const [hidden, setHidden] = useState(true);
  const [authentication, setAuthentication] = useState(() =>
    getAuthentication(),
  );
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return JSON.parse(localStorage.getItem("darkMode")) ? "dark" : "light";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const authModalMode = authModes[location.pathname] || null;
  const authenticatedUser = authentication?.user;
  const profilePictureUrl = useProfilePicture(authenticatedUser);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("darkMode", JSON.stringify(theme === "dark"));
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("tricolor", theme === "tricolor");
  }, [theme]);

  useEffect(() => {
    const refreshAuthentication = () => {
      setAuthentication(getAuthentication());
    };

    refreshAuthentication();
    window.addEventListener("cinemate-auth-changed", refreshAuthentication);
    window.addEventListener("storage", refreshAuthentication);

    return () => {
      window.removeEventListener("cinemate-auth-changed", refreshAuthentication);
      window.removeEventListener("storage", refreshAuthentication);
    };
  }, [location.pathname]);

  useEffect(() => {
    setHidden(true);
  }, [location.pathname, location.search]);

  const toggleDarkMode = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const toggleTricolorTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "tricolor" ? "light" : "tricolor",
    );
  };

  const activeClass =
    "text-base block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white";
  const inActiveClass =
    "text-base block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700";
  const handleSubmit = (event) => {
    event.preventDefault();
    const queryTerm = event.target.search.value.trim();
    event.target.reset();
    setHidden(true);
    if (queryTerm) return navigate(`/search?q=${encodeURIComponent(queryTerm)}`);
  };

  const closeMobileMenu = () => setHidden(true);

  const openAuthentication = () => {
    navigate(authPaths.choice, {
      state: { backgroundPath: location.pathname },
    });
  };

  const changeAuthenticationMode = (mode, message = "") => {
    navigate(authPaths[mode], {
      state: {
        ...location.state,
        authMessage: message,
      },
    });
  };

  const closeAuthentication = () => {
    navigate(location.state?.backgroundPath || "/", { replace: true });
  };

  const completeAuthentication = () => {
    navigate(
      location.state?.returnPath || location.state?.backgroundPath || "/",
      { replace: true },
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // Local authentication is cleared even if the session already expired.
    } finally {
      clearAuthentication();
      navigate("/", { replace: true });
    }
  };

  return (
    <header>
      <nav className="bg-white border-b-2 border-gray-200 px-2 sm:px-4 py-2 dark:bg-gray-900 dark:border-b-1 dark:border-gray-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between">
          <Link to="/" className="flex min-w-0 shrink-0 items-center">
            <img
              src="/logo.png"
              width="36"
              height="36"
              className="h-8 w-8 rounded-full object-cover sm:mr-2 sm:h-9 sm:w-9"
              alt="Mayur's Logo"
            />
            <span className="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:inline">
              IBM
            </span>
          </Link>

          <div id="mobile-nav" className="flex min-w-0 items-center lg:order-2">
            <button
              onClick={toggleDarkMode}
              title="Toggle light and dark theme"
              aria-label="Toggle light and dark theme"
              type="button"
              className="flex items-center justify-center p-2 mr-2 min-w-[42px] h-[42px] text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a4 4 0 100 8 4 4 0 000-8zm0-4a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 13a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm8-5a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm10.657-5.657a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM6.464 13.536a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zm9.193.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM6.464 5.05A1 1 0 015.05 6.464l-.707-.707a1 1 0 011.414-1.414l.707.707z" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleTricolorTheme}
              title="Toggle Indian tricolor theme"
              aria-label="Toggle Indian tricolor theme"
              aria-pressed={theme === "tricolor"}
              type="button"
              className="tricolor-toggle flex flex-col overflow-hidden mr-2 w-[42px] h-[42px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              <span className="flex-1 w-full bg-[#ff9933]"></span>
              <span className="tricolor-white-band flex-1 w-full bg-white"></span>
              <span className="flex-1 w-full bg-[#138808]"></span>
            </button>
            <div className="hidden relative lg:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="search-navbar"
                  name="search"
                  className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </form>
            </div>
            <button
              onClick={() => setHidden(!hidden)}
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={!hidden}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {authenticatedUser ? (
              <ProfileDropdown user={authenticatedUser} pictureUrl={profilePictureUrl} onLogout={handleLogout} />
            ) : (
              <button
                type="button"
                onClick={openAuthentication}
                className="ml-2 inline-flex h-[42px] items-center rounded-lg bg-blue-700 px-4 text-sm font-medium text-white hover:bg-blue-800"
              >
                Sign in
              </button>
            )}
          </div>

          <div
            className={`${hidden ? "hidden" : ""} w-full items-center justify-between lg:order-1 lg:flex lg:w-auto`}
            id="navbar-search"
          >
            <div className="relative mt-3 lg:hidden">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="search-navbar"
                  name="search"
                  className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </form>
            </div>
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 lg:mt-0 lg:flex-row lg:space-x-4 lg:border-0 lg:bg-white lg:p-0 lg:text-sm lg:font-medium lg:dark:bg-gray-900 xl:space-x-8">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies/popular"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies/top"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Top Rated
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movies/upcoming"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Upcoming
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <AuthModal
        mode={authModalMode}
        message={location.state?.authMessage || ""}
        onClose={closeAuthentication}
        onModeChange={changeAuthenticationMode}
        onLoginSuccess={completeAuthentication}
      />
    </header>
  );
};
